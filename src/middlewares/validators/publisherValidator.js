import {body, param, validationResult} from "express-validator";
import AppError from "../../utils/AppError.js";

const validatePublisher = [

    // validation
    body("name").trim()
        .notEmpty().withMessage("Publisher name is required")
        .isLength({max: 45}).withMessage("Publisher name must be under 45 characters"),
    body("email")
        .notEmpty().withMessage("Publisher email is required")
        .isEmail().withMessage("Publisher email must be a valid email address")
        .isString().withMessage("Publisher email must be a string")
        .isLength({max: 100}).withMessage("Publisher email must be under 100 characters"),
    body("establishedYear")
        .notEmpty().withMessage("Established year is required")
        .isInt({  max: new Date().getFullYear() })
        .withMessage(`Established year must under or equal to ${new Date().getFullYear()}`),
    body("streetAddress").trim()
        .notEmpty().withMessage("Street address is required")
        .isLength({max: 255}).withMessage("Street address must be under 255 characters"),
    body("city").trim()
        .notEmpty().withMessage("City is required")
        .isLength({max: 100}).withMessage("City must be under 100 characters"),
    body("province").trim()
        .notEmpty().withMessage("Province is required")
        .isLength({max: 100}).withMessage("Province must be under 100 characters"),
    body("postalCode").trim()
        .notEmpty().withMessage("Postal Code is required")
        .isLength({max: 100}).withMessage("Postal Code must be under 100 characters"),

    // error handler for validation
    (req,res,next) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            return next(new AppError(errors.array()[0].msg, 400));
        }
        next();
    }
];

const validateUpdatePublisher = [

    // validation
    param("id").isInt({ gt: 0 }).withMessage("Publisher ID must be a positive integer"),
    body("name").optional()
        .isString().withMessage("Publisher name must be a string")
        .isLength({max: 45}).withMessage("Publisher name must be under 45 characters"),
    body("email").optional()
        .notEmpty().withMessage("Publisher email is required")
        .isEmail().withMessage("Publisher email must be a valid email address")
        .isString().withMessage("Publisher email must be a string")
        .isLength({max: 100}).withMessage("Publisher email must be under 100 characters"),
    body("establishedYear").optional()
        .isInt({  max: new Date().getFullYear() }).withMessage(`Established year must under or equal to ${new Date().getFullYear()}`),
    body("addressId").optional()
        .isInt().withMessage("Address ID must be a positive integer"),

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
    validatePublisher,
    validateUpdatePublisher,
}