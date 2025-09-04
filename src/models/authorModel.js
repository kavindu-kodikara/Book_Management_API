// find all categories
import db from "../config/db.js";

// find all authors
const findAll = async() => {
    const [rows] = await db.query('SELECT * FROM authors');
    return rows;
}

// find author by id with their books
const findById = async (id) => {

    const [rows] = await db.query(
        'SELECT a.id as authorId, a.first_name as fName , a.last_name as lName, a.biography as authorBiography, a.birth_date as birthDate,' +
        'n.nationality_name as nationalityName, ' +
        'b.id as bookId, b.title as bookTitle, b.isbn as bookISBN, b.publication_date as bookPublicationDate, b.description as bookDescription, b.page_count as bookPageCount, ' +
        'p.id as publisherId, p.name as publisherName ' +
        'FROM authors a ' +
        'LEFT JOIN books b ON b.Authors_id = a.id ' +
        'LEFT JOIN publishers p ON p.id = b.publishers_id ' +
        'LEFT JOIN nationality n ON n.id = a.nationality_id ' +
        'WHERE a.id = ?',
        [id]
    );

    if (rows.length === 0) return null;

    const author = {
        id: rows[0].authorId,
        first_name: rows[0].fName,
        last_name: rows[0].lName,
        biography: rows[0].authorBiography,
        birth_date: rows[0].birthDate,
        nationality: rows[0].nationalityName,
        books: rows.filter(r => r.bookId).map(r => ({
            id: r.bookId,
            title: r.bookTitle,
            isbn: r.bookISBN,
            publication_date: r.bookPublicationDate,
            description: r.bookDescription,
            page_count: r.bookPageCount,
            publisher_id: r.publisherId,
            publisher_name:r.publisherName
        }))
    };

    return author;
}

// check author exists
export const isAuthorExists = async (firstName,lastName) => {
    const [rows] = await db.query(
        "SELECT COUNT(*) as count FROM authors WHERE LOWER(first_name) = LOWER(?) AND LOWER(last_name) = LOWER(?)",
        [firstName, lastName]
    );
    return rows[0].count > 0;
};

// add new author
const create = async (firstName,lastName,biography,birthDate,nationalityId) => {
    const [result] = await db.query(
        "INSERT INTO authors (first_name, last_name, biography, birth_date, nationality_id) VALUES (?,?,?,?,?)",
        [firstName, lastName,biography,birthDate,nationalityId]
    );
    return result.insertId; // return primary key
}

// update author
const update = async (firstName,lastName,biography,birthDate,nationalityId,id) => {
    const [result] = await db.query(
        "UPDATE authors SET " +
        "first_name = COALESCE(?,first_name), " +
        "last_name = COALESCE(?,last_name), " +
        "biography = COALESCE(?,biography), " +
        "birth_date = COALESCE(?,birth_date), " +
        "nationality_id = COALESCE(?,nationality_id) WHERE id = ?",
        [firstName,lastName,biography,birthDate,nationalityId,id] // keep old value if values empty
    );
    return result.changedRows; // 0 if nothing updated
}

// check foreign key constraints
export const isAuthorInUse = async (id) => {
    const [rows] = await db.query(
        "SELECT COUNT(*) as count FROM books WHERE Authors_id = ?",
        [id]
    );
    return rows[0].count > 0;
};

// delete publisher
const deleteAuthor = async (id) => {
    const [result] = await db.query("DELETE FROM authors WHERE id = ?", [id]);
    return result.affectedRows;
}

export default {
    findAll,
    findById,
    isAuthorExists,
    create,
    update,
    isAuthorInUse,
    deleteAuthor,
}