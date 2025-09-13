"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CDeleteAdmin = exports.CUpdateAdmin = exports.CCreateAdmin = exports.CLogin = void 0;
const auth_service_1 = require("../services/auth.service");
const CLogin = async (req, res, next) => {
    try {
        const { username, password } = req.body;
        const result = await (0, auth_service_1.SLogin)(username, password);
        res.status(200).json(result);
    }
    catch (error) {
        next(error);
    }
};
exports.CLogin = CLogin;
const CCreateAdmin = async (req, res, next) => {
    try {
        const result = await (0, auth_service_1.SCreateAdmin)(req.body);
        res.status(201).json(result);
    }
    catch (error) {
        next(error);
    }
};
exports.CCreateAdmin = CCreateAdmin;
const CUpdateAdmin = async (req, res, next) => {
    try {
        const id = parseInt(req.params.id);
        const result = await (0, auth_service_1.SUpdateAdmin)(id, req.body);
        res.status(200).json(result);
    }
    catch (error) {
        next(error);
    }
};
exports.CUpdateAdmin = CUpdateAdmin;
const CDeleteAdmin = async (req, res, next) => {
    try {
        const id = parseInt(req.params.id);
        const result = await (0, auth_service_1.SDeleteAdmin)(id);
        res.status(200).json(result);
    }
    catch (error) {
        next(error);
    }
};
exports.CDeleteAdmin = CDeleteAdmin;
