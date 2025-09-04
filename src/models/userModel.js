import db from "../config/db.js";

const createUser = async ({ username, passwordHash, fullName, userRoleId }) => {
    const [result] = await db.query(
        `INSERT INTO users (username, password_hash, full_name, registration_date, user_role_id) 
     VALUES (?, ?, ?, NOW(), ?)`,
        [username, passwordHash, fullName, userRoleId]
    );
    return result.insertId;
};

const findUserByUsername = async (username) => {
    const [rows] = await db.query(
        `SELECT * FROM users WHERE username = ? LIMIT 1`,
        [username]
    );
    return rows[0];
};

const findById = async (id) => {
    const [rows] = await db.query(
        "SELECT id, username, full_name, registration_date, user_role_id FROM users WHERE id = ?",
        [id]
    );
    return rows[0]; // single user or undefined
};

export default {
    createUser,
    findUserByUsername,
    findById,
}