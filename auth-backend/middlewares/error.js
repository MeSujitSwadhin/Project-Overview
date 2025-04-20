import ErrorHandler from "../utils/ErrorHandler.js";
import Messages from "../utils/constants.js";

export default (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.message = err.message || Messages.INTERNAL_SERVER_ERROR;

    // Wrong Mongodb Id error
    if (err.name === "CastError") {
        const message = Messages.RESOURCE_NOT_FOUND(err.path);
        err = new ErrorHandler(message, 404);
    }

    // MongoDB Duplicate Error Key
    if (err.code === 11000) {
        const key = Object.keys(err.keyValue)[0];
        const message = Messages.DUPLICATE_KEY(key);
        err = new ErrorHandler(message, 400);
    }

    // Wrong JWT Error
    if (err.name === "JsonWebTokenError") {
        const message = Messages.INVALID_JWT;
        err = new ErrorHandler(message, 401);
    }

    // JWT Expire Error
    if (err.name === "TokenExpiredError") {
        const message = Messages.EXPIRED_JWT;
        err = new ErrorHandler(message, 401);
    }

    res.status(err.statusCode).json({
        success: false,
        message: err.message,
    });
};
