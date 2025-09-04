import jwt from "jsonwebtoken";
import { jwtConfig } from "../config/jwt.js";
import AppError from "../utils/AppError.js";

export const protect = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return next(new AppError("Unauthorized: No token provided", 401));
    }

    const token = authHeader.split(" ")[1];

    try {
        const decoded = jwt.verify(token, jwtConfig.secret);
        req.user = decoded; // attach decoded payload
        next();
    } catch (err) {
        return next(new AppError("Unauthorized: Invalid or expired token", 401));
    }
};
