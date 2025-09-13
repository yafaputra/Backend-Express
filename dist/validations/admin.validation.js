"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateAdminSchema = exports.createAdminSchema = void 0;
// admin.validation.ts
const joi_1 = __importDefault(require("joi"));
exports.createAdminSchema = joi_1.default.object({
    username: joi_1.default.string().min(3).max(50).required(),
    password: joi_1.default.string().min(6).required(),
    email: joi_1.default.string().email().required(),
    name: joi_1.default.string().min(2).max(100).required(),
});
exports.updateAdminSchema = joi_1.default.object({
    username: joi_1.default.string().min(3).max(50).optional(),
    password: joi_1.default.string().min(6).optional(),
    email: joi_1.default.string().email().optional(),
    name: joi_1.default.string().min(2).max(100).optional(),
});
