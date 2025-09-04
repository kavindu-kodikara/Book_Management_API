
// custom error class for consistent error responses

export default class AppError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
        this.isOperational = true; // mark as handled
        Error.captureStackTrace(this, this.constructor);
    }
}