"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MErrorHandler = void 0;
const MErrorHandler = (err, req, res, next) => {
    console.error("Error:", err);
    const isDevelopment = process.env.NODE_ENV === "development";
    try {
        // Handle validation errors (array from Joi)
        if (Array.isArray(err)) {
            const response = {
                status: false,
                message: "Validation error",
                error: err,
            };
            res.status(400).json(response);
            return;
        }
        const response = {
            status: false,
            message: err.message || "An unexpected error occurred",
        };
        const errorObj = {
            message: err.message || "Internal server error"
        };
        if (err.name) {
            errorObj.name = err.name;
        }
        if (isDevelopment && err.stack) {
            errorObj.detail = err.stack;
        }
        response.error = errorObj;
        res.status(500).json(response);
    }
    catch {
        const response = {
            status: false,
            message: "An unexpected error occurred",
            error: {
                message: "Internal server error",
                ...(isDevelopment && { detail: err.stack }),
            },
        };
        res.status(500).json(response);
    }
};
exports.MErrorHandler = MErrorHandler;
