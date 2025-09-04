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