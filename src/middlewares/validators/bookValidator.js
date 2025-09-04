import {body, param, validationResult} from "express-validator";
import AppError from "../../utils/AppError.js";

const validateBook = [
    // validation
    body("title")
        .isString().withMessage("Title must be string")
        .trim()
        .notEmpty().withMessage("Title is required"),
    body("isbn")
        .notEmpty().withMessage("ISBN is required")
        .isString().withMessage("ISBN must be string")
        .isLength({ max: 17 })
        .withMessage("ISBN must be max 17 characters"),
    body("publicationDate")
        .notEmpty().withMessage("Publication date is required")
        .isDate()
        .withMessage("Invalid publication date"),
    body("description")
        .notEmpty().withMessage("Description is required")
        .isString(),
    body("pageCount")
        .optional()
        .isInt({ min: 1 })
        .withMessage("Page count must be a positive integer"),
    body("AuthorsId")
        .isInt({ gt: 0 })
        .withMessage("Author ID must be a positive integer"),
    body("publishersId")
        .isInt({ gt: 0 })
        .withMessage("Publisher ID must be a positive integer"),
    body("categoryIds")
        .isArray({ min: 1 })
        .withMessage("At least one category ID is required"),
    body("categoryIds.*")
        .isInt({ gt: 0 })
        .withMessage("Category IDs must be positive integers"),

    // error handler for validation
    (req,res,next) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            return next(new AppError(errors.array()[0].msg, 400));
        }
        next();
    }
];

export const validateUpdateBook = [
    param("id").isInt({ gt: 0 }).withMessage("Book ID must be a positive integer"),
    body("title").optional().isString().trim().notEmpty().withMessage("Title must be a string"),
    body("isbn").optional().isString().isLength({ max: 17 }).withMessage("ISBN max 17 characters"),
    body("publication_date").optional().isDate().withMessage("Invalid publication date"),
    body("description").optional().isString(),
    body("page_count").optional().isInt({ min: 1 }).withMessage("Page count must be positive"),
    body("Authors_id").optional().isInt({ gt: 0 }).withMessage("Author ID must be positive integer"),
    body("publishers_id").optional().isInt({ gt: 0 }).withMessage("Publisher ID must be positive integer"),
    body("category_ids").optional().isArray({ min: 1 }).withMessage("category_ids must be an array"),
    body("category_ids.*").optional().isInt({ gt: 0 }).withMessage("Each category ID must be positive integer"),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return next(new AppError(errors.array()[0].msg, 400));
        }
        next();
    }
];

export default {
    validateBook,
    validateUpdateBook,
}