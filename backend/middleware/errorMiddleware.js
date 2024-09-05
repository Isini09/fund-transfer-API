//Middleware for handling routes that are not found (404 error)


//Custom error handling middleware
const errorHandler = (err, req, res, next) => {
    const statusCode = res.status === 200 ? 500 : res.statusCode;
    res.status(statusCode).json({
        message: err.message,
        stack: process.env.NODE_ENV === 'production' ? null : err.stack
    });
};

module.exports = {errorHandler};

