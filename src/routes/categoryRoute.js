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