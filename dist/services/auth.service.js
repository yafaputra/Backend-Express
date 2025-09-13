"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SDeleteAdmin = exports.SUpdateAdmin = exports.SCreateAdmin = exports.SLogin = void 0;
// auth.service.ts
const client_1 = require("@prisma/client");
const bcrypt_1 = __importDefault(require("bcrypt"));
const token_util_1 = require("../utils/token.util");
const prisma = new client_1.PrismaClient();
const SLogin = async (usernameOrEmail, password) => {
    const admin = await prisma.admin.findFirst({
        where: {
            OR: [{ username: usernameOrEmail }, { email: usernameOrEmail }],
            isActive: true,
            deletedAt: null,
        },
    });
    if (!admin) {
        throw new Error("Invalid credentials");
    }
    const isPasswordValid = await bcrypt_1.default.compare(password, admin.password);
    if (!isPasswordValid) {
        throw new Error("Invalid credentials");
    }
    const token = (0, token_util_1.UGenerateToken)({
        id: admin.id,
        username: admin.username,
        email: admin.email,
        name: admin.name,
    });
    return {
        status: true,
        message: "Login successful",
        data: {
            token,
            admin: {
                id: admin.id,
                username: admin.username,
                email: admin.email,
                name: admin.name,
            },
        },
    };
};
exports.SLogin = SLogin;
const SCreateAdmin = async (data) => {
    // Check if username or email already exists
    const existingAdmin = await prisma.admin.findFirst({
        where: {
            OR: [
                { username: data.username },
                { email: data.email }
            ],
            deletedAt: null,
        },
    });
    if (existingAdmin) {
        throw new Error("Username or email already exists");
    }
    // Hash password
    const hashedPassword = await bcrypt_1.default.hash(data.password, 10);
    const admin = await prisma.admin.create({
        data: {
            username: data.username,
            password: hashedPassword,
            email: data.email,
            name: data.name,
            isActive: true,
        },
    });
    return {
        status: true,
        message: "Admin created successfully",
        data: {
            id: admin.id,
            username: admin.username,
            email: admin.email,
            name: admin.name,
            isActive: admin.isActive,
            createdAt: admin.createdAt,
            updatedAt: admin.updatedAt,
        },
    };
};
exports.SCreateAdmin = SCreateAdmin;
const SUpdateAdmin = async (id, data) => {
    // Check if admin exists
    const existingAdmin = await prisma.admin.findFirst({
        where: {
            id: id,
            deletedAt: null,
        },
    });
    if (!existingAdmin) {
        throw new Error("Admin not found");
    }
    // Check if username or email already exists (exclude current admin)
    if (data.username || data.email) {
        const conflictAdmin = await prisma.admin.findFirst({
            where: {
                OR: [
                    ...(data.username ? [{ username: data.username }] : []),
                    ...(data.email ? [{ email: data.email }] : []),
                ],
                NOT: { id: id },
                deletedAt: null,
            },
        });
        if (conflictAdmin) {
            throw new Error("Username or email already exists");
        }
    }
    // Prepare update data
    const updateData = { ...data };
    if (data.password) {
        updateData.password = await bcrypt_1.default.hash(data.password, 10);
    }
    const admin = await prisma.admin.update({
        where: { id: id },
        data: updateData,
    });
    return {
        status: true,
        message: "Admin updated successfully",
        data: {
            id: admin.id,
            username: admin.username,
            email: admin.email,
            name: admin.name,
            isActive: admin.isActive,
            createdAt: admin.createdAt,
            updatedAt: admin.updatedAt,
        },
    };
};
exports.SUpdateAdmin = SUpdateAdmin;
const SDeleteAdmin = async (id) => {
    // Check if admin exists
    const existingAdmin = await prisma.admin.findFirst({
        where: {
            id: id,
            deletedAt: null,
        },
    });
    if (!existingAdmin) {
        throw new Error("Admin not found");
    }
    // Soft delete
    await prisma.admin.update({
        where: { id: id },
        data: {
            deletedAt: new Date(),
            isActive: false,
        },
    });
    return {
        status: true,
        message: "Admin deleted successfully",
        data: null,
    };
};
exports.SDeleteAdmin = SDeleteAdmin;
