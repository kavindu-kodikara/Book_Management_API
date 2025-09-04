import { body, validationResult } from "express-validator";
import AppError from "../../utils/AppError.js";

const validateRegister = [
    body("username")
        .notEmpty().withMessage("Username is required")
        .isLength({ min: 3, max: 30 }).withMessage("Username must be 3–30 chars long"),
    body("password")
        .isLength({ min: 6 }).withMessage("Password must be at least 6 chars")
        .matches(/\d/).withMessage("Password must contain a number")
        .matches(/[A-Z]/).withMessage("Password must contain an uppercase letter"),
    body("fullName")
        .notEmpty().withMessage("Full name is required"),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return next(new AppError(errors.array()[0].msg, 400));
        }
        next();
    }
];

const validateLogin = [
    body("username")
        .notEmpty().withMessage("Username is required")
        .isLength({ min: 3, max: 30 }).withMessage("Username must be 3–30 chars long"),
    body("password")
        .isLength({ min: 6 }).withMessage("Password must be at least 6 chars")
        .matches(/\d/).withMessage("Password must contain a number")
        .matches(/[A-Z]/).withMessage("Password must contain an uppercase letter"),

    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return next(new AppError(errors.array()[0].msg, 400));
        }
        next();
    }
];

export default {
    validateRegister,
    validateLogin,
}