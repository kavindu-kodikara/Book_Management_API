import db from "../config/db.js";

// find review by book id
const findReviewsByBookId = async (bookId) => {
    const [rows] = await db.query(
        `SELECT r.id AS reviewId, r.rating, r.comment, r.review_date, 
            u.id AS userId, u.username, u.full_name
     FROM reviews r
     LEFT JOIN users u ON r.users_id = u.id
     WHERE r.books_id = ?
     ORDER BY r.review_date DESC`,
        [bookId]
    );

    return rows;
};

// create new review
const create = async ({ bookId, userId, rating, comment }) => {
    const [result] = await db.query(
        `INSERT INTO reviews (rating, comment, review_date, books_id, users_id)
     VALUES (?, ?, NOW(), ?, ?)`,
        [rating, comment || null, bookId, userId]
    );

    return result.insertId; // return primary key
};

// update review
const update = async (rating, comment,id) => {
    const [result] = await db.query(
        "UPDATE reviews SET " +
        "rating = COALESCE(?,rating), " +
        "comment = COALESCE(?,comment) WHERE id = ?",
        [rating, comment,id] // keep old value if values empty
    );
    return result.changedRows; // 0 if nothing updated
}

// delete review
const deleteReview = async (id) => {
    const [result] = await db.query("DELETE FROM reviews WHERE id = ?", [id]);
    return result.affectedRows;
}

export default {
    findReviewsByBookId,
    create,
    update,
    deleteReview,
}