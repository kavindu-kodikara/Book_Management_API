
// error handling middleware

export function errorHandler(err, req, res, next) {
    console.log(err);
    res.status(err.statusCode || 500).json({
        error : "Error",
        message: err.isOperational ? err.message : "Internal Server Error",
    });
}