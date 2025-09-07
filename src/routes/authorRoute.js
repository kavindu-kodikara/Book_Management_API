import Router from "express";
import authorController from "../controllers/authorController.js";
import {idValidator} from "../middlewares/validators/idValidator.js";
import authorValidator from "../middlewares/validators/authorValidator.js";

const router = Router();

router.get("/",authorController.getAllAuthors);
router.get("/:id",idValidator,authorController.getAuthorById);
router.post("/",authorValidator.validateAuthor,authorController.createAuthor);
router.put("/:id",authorValidator.validateUpdateAuthor,authorController.updateAuthor);
router.delete("/:id",idValidator,authorController.deleteAuthor);

export default router;

/**
 * @swagger
 * tags:
 *   name: Authors
 *   description: Book authors
 */

/**
 * @swagger
 * /authors:
 *   get:
 *     summary: Get all authors
 *     tags: [Authors]
 *     responses:
 *       200: { description: List of authors }
 */

/**
 * @swagger
 * /authors:
 *   post:
 *     summary: Create a new author
 *     tags: [Authors]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [firstName, lastName, biography, birthDate, nationalityId]
 *             properties:
 *               firstName: { type: string }
 *               lastName: { type: string }
 *               biography: { type: string }
 *               birthDate: { type: string, format: date }
 *               nationalityId: { type: integer }
 *     responses:
 *       201: { description: Author created }
 */

/**
 * @swagger
 * /authors/{id}:
 *   get:
 *     summary: Get author by ID with their books
 *     tags: [Authors]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200: { description: Author details }
 *       404: { description: Author not found }
 */

/**
 * @swagger
 * /authors/{id}:
 *   put:
 *     summary: Update author
 *     tags: [Authors]
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
 *               firstName: { type: string }
 *               lastName: { type: string }
 *               biography: { type: string }
 *               birthDate: { type: string }
 *               nationalityId: { type: integer }
 *     responses:
 *       200: { description: Author updated }
 *       404: { description: Author not found }
 */

/**
 * @swagger
 * /authors/{id}:
 *   delete:
 *     summary: Delete author
 *     tags: [Authors]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       204: { description: Author deleted }
 *       404: { description: Author not found }
 */
