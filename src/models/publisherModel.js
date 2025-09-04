import db from '../config/db.js';
import addressModule from "./addressModel.js";

// find all publishers
const findAll = async() => {
    const [rows] = await db.query('SELECT * FROM publishers');
    return rows;
}

// find publisher by id with associated books
const findById = async (id) => {

    const [rows] = await db.query(
        'SELECT p.id as publisherId, p.name as publisherName, p.established_year as establishedYear, ' +
        'b.id as bookId, b.title as bookTitle, b.isbn as bookISBN, b.publication_date as bookPublicationDate, b.description as bookDescription, b.page_count as bookPageCount, ' +
        'a.id as addressId, a.street_address as streetAddress, a.city as city, a.province as province, a.postal_code as postalCode ' +
        'FROM publishers p ' +
        'LEFT JOIN books b ON b.publishers_id = p.id ' +
        'LEFT JOIN address a ON a.id = p.address_id ' +
        'WHERE p.id = ?',
        [id]
    );

    if (rows.length === 0) return null;

    const publisher = {
        id: rows[0].publisherId,
        name: rows[0].publisherName,
        established_year: rows[0].establishedYear,
        street_address:rows[0].streetAddress,
        city:rows[0].city,
        province:rows[0].province,
        postal_code:rows[0].postalCode,
        books: rows.filter(r => r.bookId).map(r => ({
            id: r.bookId,
            title: r.bookTitle,
            isbn: r.bookISBN,
            publication_date: r.bookPublicationDate,
            description: r.bookDescription,
            page_count: r.bookPageCount
        }))
    };

    return publisher;
}

// check publisher exists
export const isPublisherExists = async (name) => {
    const [rows] = await db.query(
        "SELECT COUNT(*) as count FROM publishers WHERE LOWER(name) = LOWER(?)",
        [name]
    );
    return rows[0].count > 0;
};

// add new publisher
const create = async (name,email,establishedYear,streetAddress, city, province,postalCode) => {

    const addressId = await addressModule.create(streetAddress, city, province,postalCode);
    const [result] = await db.query(
        "INSERT INTO publishers (name, contact_email, established_year, address_id) VALUES (?,?,?,?)",
        [name,email,establishedYear,addressId]
    );
    return result.insertId; // return primary key
}

// update publisher
const update = async (name,email,establishedYear,addressId,id) => {
    const [result] = await db.query(
        "UPDATE publishers SET " +
        "name = COALESCE(?, name), " +
        "contact_email = COALESCE(?, contact_email), " +
        "established_year = COALESCE(?, established_year), " +
        "address_id = COALESCE(?, address_id) " +
        "WHERE id = ?",
        [name, email, establishedYear, addressId, id]
    );
    return result.changedRows; // 0 if nothing updated
}

// check foreign key constraints
export const isPublisherInUse = async (id) => {
    const [rows] = await db.query(
        "SELECT COUNT(*) as count FROM books WHERE publishers_id = ?",
        [id]
    );
    return rows[0].count > 0;
};

// delete publisher
const deletePublisher = async (id) => {
    const [result] = await db.query("DELETE FROM publishers WHERE id = ?", [id]);
    return result.affectedRows;
}

export default {
    findAll,
    findById,
    isPublisherExists,
    create,
    update,
    isPublisherInUse,
    deletePublisher,
}