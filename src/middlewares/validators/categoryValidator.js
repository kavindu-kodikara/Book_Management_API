import {body, param, validationResult} from "express-validator";
import AppError from "../../utils/AppError.js";

const validateCategory = [

    // validation
    body("name").trim()
        .notEmpty().withMessage("Category name is required")
        .isString().withMessage("Category must be a string")
        .isLength({max: 45}).withMessage("Category name must be under 45 characters"),
    body("description").optional()
        .isString().withMessage("Description must be a string"),

    // error handler for validation
    (req,res,next) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            return next(new AppError(errors.array()[0].msg, 400));
        }
        next();
    }
];

const validateUpdateCategory = [

    // validation
    param("id").isInt({ gt: 0 }).withMessage("Category ID must be a positive integer"),
    body("name").optional()
        .isString().withMessage("Category must be a string")
        .isLength({max: 45}).withMessage("Category name must be under 45 characters"),
    body("description").optional()
        .isString().withMessage("Description must be a string"),

    // error handler for validation
    (req,res,next) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            return next(new AppError(errors.array()[0].msg, 400));
        }
        next();
    }
];

export default {
    validateCategory,
    validateUpdateCategory,
}