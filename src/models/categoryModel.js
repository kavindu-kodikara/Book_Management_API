import db from '../config/db.js';

// find all categories
const findAll = async() => {
    const [rows] = await db.query('SELECT * FROM categorys');
    return rows;
}

// find category by id with associated books
const findById = async (id) => {

    const [rows] = await db.query(
        'SELECT c.id as categoryId, c.name as categoryName, c.description as categoryDescription, ' +
        'b.id as bookId, b.title as bookTitle, b.isbn as bookISBN, b.publication_date as bookPublicationDate, b.description as bookDescription, b.page_count as bookPageCount, ' +
        'a.id as authorId, a.first_name as authorFname, a.last_name as authorLname, ' +
        'p.id as publisherId, p.name as publisherName ' +
        'FROM categorys c ' +
        'LEFT JOIN books_has_categorys bhc ON bhc.categorys_id = c.id ' +
        'LEFT JOIN books b ON b.id = bhc.books_id ' +
        'LEFT JOIN authors a ON a.id = b.Authors_id ' +
        'LEFT JOIN publishers p ON p.id = b.publishers_id ' +
        'WHERE c.id = ?',
        [id]
    );

    if (rows.length === 0) return null;

    const category = {
        id: rows[0].categoryId,
        name: rows[0].categoryName,
        description: rows[0].categoryDescription,
        books: rows.filter(r => r.bookId).map(r => ({
            id: r.bookId,
            title: r.bookTitle,
            isbn: r.bookISBN,
            publication_date: r.bookPublicationDate,
            description: r.bookDescription,
            page_count: r.bookPageCount,
            auther_id: r.authorId,
            auther_name:r.authorFname+" "+r.authorLname,
            publisher_id: r.publisherId,
            publisher_name:r.publisherName
        }))
    };

    return category;
}

// add new category
const create = async (name,description) => {
    const [result] = await db.query(
        "INSERT INTO categorys (name, description) VALUES (?,?)",
        [name, description] // only pass the values
    );
    return result.insertId; // return primary key
}

// update category
const update = async (name,description,id) => {
    const [result] = await db.query(
        "UPDATE categorys SET name = COALESCE(?,name), description = COALESCE(?,description) WHERE id = ?",
        [name, description,id] // keep old value if values empty
    );
    return result.changedRows; // 0 if nothing updated
}

// check foreign key constraints
export const isCategoryInUse = async (id) => {
    const [rows] = await db.query(
        "SELECT COUNT(*) as count FROM books_has_categorys WHERE categorys_id = ?",
        [id]
    );
    return rows[0].count > 0;
};

// delete category
const deleteCategory = async (id) => {
    const [result] = await db.query("DELETE FROM categorys WHERE id = ?", [id]);
    return result.affectedRows;
}



// grouped exports
export default {
    findAll,
    findById,
    create,
    update,
    isCategoryInUse,
    deleteCategory,
}