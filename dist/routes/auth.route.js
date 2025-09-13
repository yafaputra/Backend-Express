"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// auth.route.ts
const express_1 = require("express");
const auth_controller_1 = require("../dist/controllers/auth.controller");
const validation_middleware_1 = require("../dist/middlewares/validation.middleware");
const admin_validation_1 = require("../dist/validations/admin.validation");
const router = (0, express_1.Router)();
// Login route
router.post("/login", auth_controller_1.CLogin);
// CRUD Admin routes
router.post("/create", (0, validation_middleware_1.MValidate)(admin_validation_1.createAdminSchema), auth_controller_1.CCreateAdmin);
router.put("/:id", (0, validation_middleware_1.MValidate)(admin_validation_1.updateAdminSchema), auth_controller_1.CUpdateAdmin);
router.delete("/:id", auth_controller_1.CDeleteAdmin);
exports.default = router;
