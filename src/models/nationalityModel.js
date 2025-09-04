// find nationality by id
import db from "../config/db.js";

export const isExistsById = async (id) => {
    const [rows] = await db.query(
        "SELECT COUNT(*) as count FROM nationality WHERE id = ?",
        [id]
    );
    return rows[0].count > 0;
};

export default { isExistsById };