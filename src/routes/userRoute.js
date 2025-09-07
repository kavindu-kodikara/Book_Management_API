import Router from "express";
import userValidator from "../middlewares/validators/userValidator.js";
import userController from "../controllers/userController.js";
import {protect} from "../middlewares/authMiddleware.js";

const router = Router();

router.post("/register",userValidator.validateRegister,userController.registerUser);
router.post("/login",userValidator.validateLogin,userController.loginUser);
router.get("/profile",protect,userController.getUserProfile);

export default router;

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User management and authentication
 */

/**
 * @swagger
 * /users/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [username, password, fullName]
 *             properties:
 *               username: { type: string }
 *               password: { type: string }
 *               fullName: { type: string }
 *     responses:
 *       201: { description: User registered successfully }
 *       400: { description: Validation error }
 */

/**
 * @swagger
 * /users/login:
 *   post:
 *     summary: Login and receive JWT
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [username, password]
 *             properties:
 *               username: { type: string }
 *               password: { type: string }
 *     responses:
 *       200: { description: JWT Token returned }
 *       401: { description: Unauthorized }
 */

/**
 * @swagger
 * /users/profile:
 *   get:
 *     summary: Get user profile
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200: { description: User profile }
 *       401: { description: Unauthorized }
 */

