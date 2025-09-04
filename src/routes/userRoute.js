import Router from "express";
import userValidator from "../middlewares/validators/userValidator.js";
import userController from "../controllers/userController.js";
import {protect} from "../middlewares/authMiddleware.js";

const router = Router();

router.post("/register",userValidator.validateRegister,userController.registerUser);
router.post("/login",userValidator.validateLogin,userController.loginUser);
router.get("/profile",protect,userController.getUserProfile);

export default router;