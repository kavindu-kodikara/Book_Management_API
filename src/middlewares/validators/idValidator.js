import {param, validationResult} from "express-validator";
import AppError from "../../utils/AppError.js";

export const idValidator = [
    // validation
    param("id").isInt({ gt: 0 }).withMessage("ID must be a positive integer"),

    // error handler for validation
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return next(new AppError(errors.array()[0].msg, 400));
        }
        next();
    },
];