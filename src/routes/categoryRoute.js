import Router from "express";
import categoryController from "../controllers/categoryController.js";
import {idValidator} from "../middlewares/validators/idValidator.js";
import categoryValidator from "../middlewares/validators/categoryValidator.js";

const router = Router();

router.get("/",categoryController.getAllCategories);
router.get("/:id",idValidator,categoryController.getCategoryById);
router.post("/",categoryValidator.validateCategory,categoryController.createCategory);
router.put("/:id",categoryValidator.validateUpdateCategory,categoryController.updateCategory);
router.delete("/:id",idValidator,categoryController.deleteCategory);

export default router;

/**
 * @swagger
 * tags:
 *   name: Categories
 *   description: Book categories
 */

/**
 * @swagger
 * /categories:
 *   get:
 *     summary: Get all categories
 *     tags: [Categories]
 *     responses:
 *       200: { description: List of categories }
 */

/**
 * @swagger
 * /categories:
 *   post:
 *     summary: Create a new category
 *     tags: [Categories]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [name, description]
 *             properties:
 *               name: { type: string }
 *               description: { type: string }
 *     responses:
 *       201: { description: Category created }
 */

/**
 * @swagger
 * /categories/{id}:
 *   get:
 *     summary: Get category by ID with associated books
 *     tags: [Categories]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200: { description: Category details }
 *       404: { description: Category not found }
 */

/**
 * @swagger
 * /categories/{id}:
 *   put:
 *     summary: Update category
 *     tags: [Categories]
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
 *               name: { type: string }
 *               description: { type: string }
 *     responses:
 *       200: { description: Category updated }
 *       404: { description: Category not found }
 */

/**
 * @swagger
 * /categories/{id}:
 *   delete:
 *     summary: Delete category
 *     tags: [Categories]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       204: { description: Category deleted }
 *       404: { description: Category not found }
 */
