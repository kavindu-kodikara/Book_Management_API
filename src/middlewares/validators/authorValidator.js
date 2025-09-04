import {body, param, validationResult} from "express-validator";
import AppError from "../../utils/AppError.js";

const validateAuthor = [

    // validation
    body("firstName").trim()
        .notEmpty().withMessage("Author first name is required")
        .isString().withMessage("Author first name must be a string")
        .isLength({max: 50}).withMessage("Author first name must be under 50 characters"),
    body("lastName").trim()
        .notEmpty().withMessage("Author last name is required")
        .isString().withMessage("Author last name must be a string")
        .isLength({max: 50}).withMessage("Author last name must be under 50 characters"),
    body("biography").isString().withMessage("Biography must be a string"),
    body("birthDate")
        .notEmpty().withMessage("Birth date is required")
        .isISO8601().withMessage("Birth date must be a valid date")
        .toDate(),
    body("nationalityId").isInt({ gt: 0 }).withMessage("Nationality Id must be a positive integer"),

    // error handler for validation
    (req,res,next) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            return next(new AppError(errors.array()[0].msg, 400));
        }
        next();
    }
];

const validateUpdateAuthor = [

    // validation
    param("id").isInt({ gt: 0 }).withMessage("Author ID must be a positive integer"),
    body("firstName").optional()
        .isString().withMessage("Author first name must be a string")
        .isLength({max: 50}).withMessage("Author first name must be under 50 characters"),
    body("lastName").optional()
        .isString().withMessage("Author last name must be a string")
        .isLength({max: 50}).withMessage("Author last name must be under 50 characters"),
    body("biography").optional().isString().withMessage("Biography must be a string"),
    body("birthDate").optional()
        .isISO8601().withMessage("Birth date must be a valid date")
        .toDate(),
    body("nationalityId").optional()
        .isInt({ gt: 0 }).withMessage("Nationality Id must be a positive integer"),

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
    validateAuthor,
    validateUpdateAuthor,
}