import Router from "express";
import reviewValidator from "../middlewares/validators/reviewValidator.js";
import reviewController from "../controllers/reviewController.js";
import {idValidator} from "../middlewares/validators/idValidator.js";

const router = Router();

router.put("/:id",reviewValidator.validateUpdateReview,reviewController.updatereview);
router.delete("/:id",idValidator,reviewController.deleteReview);

export default router;