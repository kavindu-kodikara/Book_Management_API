import Router from "express";
import reviewValidator from "../middlewares/validators/reviewValidator.js";
import reviewController from "../controllers/reviewController.js";
import {idValidator} from "../middlewares/validators/idValidator.js";

const router = Router();

router.put("/:id",reviewValidator.validateUpdateReview,reviewController.updatereview);
router.delete("/:id",idValidator,reviewController.deleteReview);

export default router;

/**
 * @swagger
 * tags:
 *   name: Reviews
 *   description: Book reviews
 */

/**
 * @swagger
 * /books/{bookId}/reviews:
 *   get:
 *     summary: Get all reviews for a book
 *     tags: [Reviews]
 *     parameters:
 *       - in: path
 *         name: bookId
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200: { description: List of reviews }
 */

/**
 * @swagger
 * /books/{bookId}/reviews:
 *   post:
 *     summary: Add review for a book
 *     tags: [Reviews]
 *     parameters:
 *       - in: path
 *         name: bookId
 *         required: true
 *         schema: { type: integer }
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [rating, comment, userId]
 *             properties:
 *               rating: { type: integer }
 *               comment: { type: string }
 *               userId: { type: integer }
 *     responses:
 *       201: { description: Review added }
 */

/**
 * @swagger
 * /reviews/{id}:
 *   put:
 *     summary: Update review
 *     tags: [Reviews]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               rating: { type: integer }
 *               comment: { type: string }
 *     responses:
 *       200: { description: Review updated }
 *       404: { description: Review not found }
 */
