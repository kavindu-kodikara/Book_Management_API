import Router from "express";
import publisherController from "../controllers/publisherController.js";
import {idValidator} from "../middlewares/validators/idValidator.js";
import publisherValidator from "../middlewares/validators/publisherValidator.js";

const router = Router();

router.get("/",publisherController.getAllPublishers);
router.get("/:id",idValidator,publisherController.getPublisherById);
router.post("/",publisherValidator.validatePublisher,publisherController.createPublisher);
router.put("/:id",publisherValidator.validateUpdatePublisher,publisherController.updatePublisher);
router.delete("/:id",idValidator,publisherController.deletePublisher);

export default router;

/**
 * @swagger
 * tags:
 *   name: Publishers
 *   description: Book publishers
 */

/**
 * @swagger
 * /publishers:
 *   get:
 *     summary: Get all publishers
 *     tags: [Publishers]
 *     responses:
 *       200: { description: List of publishers }
 */

/**
 * @swagger
 * /publishers:
 *   post:
 *     summary: Create publisher
 *     tags: [Publishers]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [name, email, establishedYear, streetAddress, city, province, postalCode]
 *             properties:
 *               name: { type: string }
 *               email: { type: string }
 *               establishedYear: { type: integer }
 *               streetAddress: { type: string }
 *               city: { type: string }
 *               province: { type: string }
 *               postalCode: { type: string }
 *     responses:
 *       201: { description: Publisher created }
 */

/**
 * @swagger
 * /publishers/{id}:
 *   get:
 *     summary: Get publisher by ID with published books
 *     tags: [Publishers]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200: { description: Publisher details }
 *       404: { description: Publisher not found }
 */

/**
 * @swagger
 * /publishers/{id}:
 *   put:
 *     summary: Update publisher
 *     tags: [Publishers]
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
 *               email: { type: string }
 *               establishedYear: { type: integer }
 *               addressId: { type: integer }
 *     responses:
 *       200: { description: Publisher updated }
 *       404: { description: Publisher not found }
 */

/**
 * @swagger
 * /publishers/{id}:
 *   delete:
 *     summary: Delete publisher
 *     tags: [Publishers]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       204: { description: Publisher deleted }
 *       404: { description: Publisher not found }
 */
