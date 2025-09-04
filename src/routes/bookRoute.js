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