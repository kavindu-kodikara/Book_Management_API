
import db from "../config/db.js";

// add new address
const create = async (streetAddress, city, province, postalCode) => {
    const [result] = await db.query(
        "INSERT INTO address (street_address, city, province, postal_code) VALUES (?,?,?,?)",
        [streetAddress, city, province, postalCode]
    );
    return result.insertId; // return primary key
}

export const isExistsById = async (id) => {
    const [rows] = await db.query(
        "SELECT COUNT(*) as count FROM address WHERE id = ?",
        [id]
    );
    return rows[0].count > 0;
};

export default {create, isExistsById};