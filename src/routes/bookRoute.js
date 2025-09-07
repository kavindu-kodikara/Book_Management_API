import Router from "express";
import bookController from "../controllers/bookController.js";
import {idValidator} from "../middlewares/validators/idValidator.js";
import bookValidator from "../middlewares/validators/bookValidator.js";
import reviewController from "../controllers/reviewController.js";
import reviewValidator from "../middlewares/validators/reviewValidator.js";
import {uploadBookCover} from "../middlewares/uploadMiddleware.js";

const router = Router();

//static routes
router.get("/search",bookController.searchBooks);

//dynamic routes
router.get("/",bookController.getAllBooks);
router.get("/:id",idValidator,bookController.getBookById);
router.post("/",bookValidator.validateBook,bookController.createBook);
router.put("/:id",bookValidator.validateUpdateBook,bookController.updateBook);
router.delete("/:id",idValidator,bookController.deleteBook);

router.get("/:id/reviews",idValidator,reviewController.getReviewsForBook);
router.post("/:id/reviews",reviewValidator.validateReview,reviewController.createReview);

// Upload cover for a book
router.post("/:id/cover",uploadBookCover,bookController.uploadBookCover);


export default router;

/**
 * @swagger
 * tags:
 *   name: Books
 *   description: Book management
 */

/**
 * @swagger
 * /books:
 *   get:
 *     summary: Get all books with pagination
 *     tags: [Books]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema: { type: integer }
 *       - in: query
 *         name: limit
 *         schema: { type: integer }
 *     responses:
 *       200: { description: List of books }
 */

/**
 * @swagger
 * /books/{id}:
 *   get:
 *     summary: Get book by ID with authors, categories, and reviews
 *     tags: [Books]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200: { description: Book details }
 *       404: { description: Book not found }
 */

/**
 * @swagger
 * /books:
 *   post:
 *     summary: Create a new book
 *     tags: [Books]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [title, isbn, publicationDate, description, pageCount, AuthorsId, publishersId, categoryIds]
 *             properties:
 *               title: { type: string }
 *               isbn: { type: string }
 *               publicationDate: { type: string, format: date }
 *               description: { type: string }
 *               pageCount: { type: integer }
 *               AuthorsId: { type: integer }
 *               publishersId: { type: integer }
 *               categoryIds:
 *                 type: array
 *                 items: { type: integer }
 *     responses:
 *       201: { description: Book created }
 *       400: { description: Validation error }
 */

/**
 * @swagger
 * /books/{id}:
 *   put:
 *     summary: Update book
 *     tags: [Books]
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
 *               title: { type: string }
 *               isbn: { type: string }
 *               publicationDate: { type: string, format: date }
 *               description: { type: string }
 *               pageCount: { type: integer }
 *               AuthorsId: { type: integer }
 *               publishersId: { type: integer }
 *               categoryIds:
 *                 type: array
 *                 items: { type: integer }
 *     responses:
 *       200: { description: Book updated }
 *       404: { description: Book not found }
 */

/**
 * @swagger
 * /books/{id}:
 *   delete:
 *     summary: Delete book
 *     tags: [Books]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       204: { description: Book deleted }
 *       404: { description: Book not found }
 */

/**
 * @swagger
 * /books/search:
 *   get:
 *     summary: Search books
 *     tags: [Books]
 *     parameters:
 *       - in: query
 *         name: title
 *         schema: { type: string }
 *       - in: query
 *         name: author
 *         schema: { type: string }
 *       - in: query
 *         name: category
 *         schema: { type: integer }
 *       - in: query
 *         name: page
 *         schema: { type: integer }
 *       - in: query
 *         name: limit
 *         schema: { type: integer }
 *     responses:
 *       200: { description: Search results }
 */

/**
 * @swagger
 * /books/{id}/cover:
 *   post:
 *     summary: Upload or replace book cover
 *     tags: [Books]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               cover:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200: { description: Cover uploaded }
 */
