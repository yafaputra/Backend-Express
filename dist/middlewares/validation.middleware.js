"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MValidate = void 0;
const MValidate = (schema) => {
    return (req, res, next) => {
        const { error } = schema.validate(req.body, { abortEarly: false });
        if (error) {
            const validationError = error.details.map((detail) => ({
                message: detail.message,
            }));
            return next(validationError);
        }
        next();
    };
};
exports.MValidate = MValidate;
