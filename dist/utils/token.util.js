"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UGenerateToken = void 0;
// token.util.ts
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const UGenerateToken = (payload) => {
    const secret = process.env.JWT_SECRET || 'your-secret-key';
    const token = jsonwebtoken_1.default.sign(payload, secret, {
        expiresIn: '24h'
    });
    return token;
};
exports.UGenerateToken = UGenerateToken;
