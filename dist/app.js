"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// app.ts - Perbaikan Import
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const auth_route_1 = __importDefault(require("./routes/auth.route")); // Import dengan nama authRoutes
const error_middleware_1 = require("./middlewares/error.middleware");
const app = (0, express_1.default)();
// Middleware dasar
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cors_1.default)());
// Routes - Gunakan nama yang sama dengan import
app.use("/api/v1/auth", auth_route_1.default); // Sekarang authRoutes sudah didefinisikan
// Error handler harus di akhir
app.use(error_middleware_1.MErrorHandler);
app.listen(3000, () => {
    console.log("Server is running on http://localhost:3000");
});
exports.default = app;
