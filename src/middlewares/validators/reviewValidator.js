import {body, param, validationResult} from "express-validator";
import AppError from "../../utils/AppError.js";

const validateReview = [
    param("id").isInt({ gt: 0 }).withMessage("Book ID must be a positive integer"),
    body("rating")
        .exists().withMessage("Rating is required")
        .isInt({ min: 1, max: 5 }).withMessage("Rating must be between 1 and 5"),
    body("comment")
        .exists().withMessage("Comment is required")
        .isString().withMessage("Comment must be a string"),
    body("userId")
        .exists().withMessage("userId is required")
        .isInt().withMessage("userId must be a Int"),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return next(new AppError(errors.array()[0].msg, 400));
        }
        next();
    }
];

const validateUpdateReview = [
    param("id").isInt({ gt: 0 }).withMessage("Book ID must be a positive integer"),
    body("rating").optional()
        .isInt({ min: 1, max: 5 }).withMessage("Rating must be between 1 and 5"),
    body("comment")
        .optional()
        .isString().withMessage("Comment must be a string"),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return next(new AppError(errors.array()[0].msg, 400));
        }
        next();
    }
];

export default {
    validateReview,
    validateUpdateReview,
}