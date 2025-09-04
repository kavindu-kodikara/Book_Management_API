
import db from "../config/db.js";
import AppError from "../utils/AppError.js";

// find all books with pagination
const findAll = async(page,limit) => {
    const offset = (page - 1) * limit;

    const [rows] = await db.query(
        `SELECT 
        b.id, b.title, b.isbn, b.publication_date, b.description, b.page_count, 
        b.created_at, b.updated_at,
        a.id as authorId, a.first_name as authorFirstName, a.last_name as authorLastName,
        p.id as publisherId, p.name as publisherName
     FROM books b
     LEFT JOIN authors a ON b.Authors_id = a.id
     LEFT JOIN publishers p ON b.publishers_id = p.id
     ORDER BY b.id
     LIMIT ? OFFSET ?`,
        [limit, offset]
    );

    // total count for pagination
    const [countResult] = await db.query("SELECT COUNT(*) as count FROM books");
    const totalItems = countResult[0].count;

    return { rows, totalItems };
}

// find book by id with authors, categories, and reviews
const findById = async (bookId) => {

    const [rows] = await db.query(
        `SELECT 
        b.id AS bookId, b.title, b.isbn, b.publication_date, b.description, b.page_count,
        b.created_at AS bookCreatedAt, b.updated_at AS bookUpdatedAt,

        -- author
        a.id AS authorId, a.first_name AS authorFirstName, a.last_name AS authorLastName, a.biography AS authorBio,

        -- publisher
        p.id AS publisherId, p.name AS publisherName, p.contact_email AS publisherEmail,

        -- categories (may repeat per row)
        c.id AS categoryId, c.name AS categoryName, c.description AS categoryDescription,

        -- reviews (may repeat per row)
        r.id AS reviewId, r.rating, r.comment, r.review_date, r.created_at AS reviewCreatedAt,
        u.id AS userId, u.username AS reviewUser

     FROM books b
     LEFT JOIN authors a ON b.Authors_id = a.id
     LEFT JOIN publishers p ON b.publishers_id = p.id
     LEFT JOIN books_has_categorys bhc ON b.id = bhc.books_id
     LEFT JOIN categorys c ON bhc.categorys_id = c.id
     LEFT JOIN reviews r ON b.id = r.books_id
     LEFT JOIN users u ON r.users_id = u.id
     WHERE b.id = ?`,
        [bookId]
    );

    return rows
}

// check book exists
export const isBookExists = async (title) => {
    const [rows] = await db.query(
        "SELECT COUNT(*) as count FROM books WHERE LOWER(title) = LOWER(?) ",
        [title]
    );
    return rows[0].count > 0;
};

// check book exists by id
export const isBookExistsById = async (id) => {
    const [rows] = await db.query(
        "SELECT COUNT(*) as count FROM books WHERE id = ? ",
        [id]
    );
    return rows[0].count > 0;
};

// add new book
const create = async (title,isbn,publicationDate,description,pageCount,AuthorsId,publishersId,categoryIds) => {

    const conn = await db.getConnection();
    try {
        await conn.beginTransaction();

        const [result] = await conn.query(
            "INSERT INTO books (title, isbn, publication_date, description, page_count, Authors_id, publishers_id) VALUES (?, ?, ?, ?, ?, ?, ?)",
            [title,isbn,publicationDate,description,pageCount,AuthorsId,publishersId]
        );
        const bookId = result.insertId; // primary key

        // Insert into books_has_categorys  table
        if (categoryIds && categoryIds.length > 0) {
            const values = categoryIds.map(catId => [bookId, catId]);
            await conn.query(
                `INSERT INTO books_has_categorys (books_id, categorys_id) VALUES ?`,
                [values]
            );
        }

        await conn.commit();

        return bookId; // return primary key

    } catch (err) {
        await conn.rollback(); // rollback if error
        throw err;
    } finally {
        conn.release();
    }
}

// update book
const update = async (title,isbn,publicationDate,description,pageCount,AuthorsId,publishersId,categoryIds,bookId) => {
    const conn = await db.getConnection();
    try {
        await conn.beginTransaction();

        // 1️Update book
        const [result] = await conn.query(
            `UPDATE books
       SET 
         title = COALESCE(?, title),
         isbn = COALESCE(?, isbn),
         publication_date = COALESCE(?, publication_date),
         description = COALESCE(?, description),
         page_count = COALESCE(?, page_count),
         Authors_id = COALESCE(?, Authors_id),
         publishers_id = COALESCE(?, publishers_id)
       WHERE id = ?`,
            [title,isbn,publicationDate,description,pageCount,AuthorsId,publishersId, bookId]
        );

        // 2️Update categories if provided
        if (categoryIds) {
            // remove old categories
            await conn.query("DELETE FROM books_has_categorys WHERE books_id = ?", [bookId]);
            // insert new categories
            const values = categoryIds.map(catId => [bookId, catId]);
            if (values.length > 0) {
                await conn.query(
                    "INSERT INTO books_has_categorys (books_id, categorys_id) VALUES ?",
                    [values]
                );
            }
        }

        await conn.commit();
        return result.changedRows
    } catch (err) {
        await conn.rollback();
        throw err;
    } finally {
        conn.release();
    }
}

// delete book
const deleteBook = async (bookId) => {
    const conn = await db.getConnection();
    try {
        await conn.beginTransaction();

        // delete categories
        await conn.query("DELETE FROM books_has_categorys WHERE books_id = ?", [bookId]);

        // delete reviews
        await conn.query("DELETE FROM reviews WHERE books_id = ?", [bookId]);

        // Delete the book itself
        const [result] = await conn.query("DELETE FROM books WHERE id = ?", [bookId]);

        await conn.commit();

        return result.affectedRows;
    } catch (err) {
        await conn.rollback();
        throw err;
    } finally {
        conn.release();
    }
}

// search book
const searchBooks = async ({ title, author, category, page = 1, limit = 10 }) => {
    const offset = (page - 1) * limit;

    // dynamic WHERE conditions
    let conditions = [];
    let params = [];

    if (title) {
        conditions.push("b.title LIKE ?");
        params.push(`%${title}%`);
    }
    if (author) {
        conditions.push("(a.first_name LIKE ? OR a.last_name LIKE ?)");
        params.push(`%${author}%`, `%${author}%`);
    }
    if (category) {
        conditions.push("c.name LIKE ?");
        params.push(`%${category}%`);
    }

    const whereClause = conditions.length ? `WHERE ${conditions.join(" AND ")}` : "";

    const [rows] = await db.query(
        `SELECT 
       b.id AS bookId, b.title, b.isbn, b.publication_date, b.description, b.page_count,
       a.id AS authorId, a.first_name AS authorFirstName, a.last_name AS authorLastName,
       p.id AS publisherId, p.name AS publisherName,
       c.id AS categoryId, c.name AS categoryName
     FROM books b
     LEFT JOIN authors a ON b.Authors_id = a.id
     LEFT JOIN publishers p ON b.publishers_id = p.id
     LEFT JOIN books_has_categorys bhc ON b.id = bhc.books_id
     LEFT JOIN categorys c ON bhc.categorys_id = c.id
     ${whereClause}
     ORDER BY b.title ASC
     LIMIT ? OFFSET ?`,
        [...params, limit, offset]
    );

    // Transform rows into nested JSON
    const booksMap = new Map();
    rows.forEach(row => {
        if (!booksMap.has(row.bookId)) {
            booksMap.set(row.bookId, {
                id: row.bookId,
                title: row.title,
                isbn: row.isbn,
                publication_date: row.publication_date,
                description: row.description,
                page_count: row.page_count,
                author: {
                    id: row.authorId,
                    first_name: row.authorFirstName,
                    last_name: row.authorLastName
                },
                publisher: {
                    id: row.publisherId,
                    name: row.publisherName
                },
                categories: []
            });
        }
        if (row.categoryId) {
            booksMap.get(row.bookId).categories.push({
                id: row.categoryId,
                name: row.categoryName
            });
        }
    });

    return Array.from(booksMap.values());
};

// update cover path
const updateBookCover = async (bookId, coverPath) => {
    const [result] = await db.query(
        "UPDATE books SET cover_path = ? WHERE id = ?",
        [coverPath, bookId]
    );
    return result.affectedRows; // 0 if not updated
};

export default {
    findAll,
    findById,
    isBookExists,
    create,
    update,
    deleteBook,
    searchBooks,
    isBookExistsById,
    updateBookCover,
}