"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoutes = void 0;
const express_1 = require("express");
const controllers_1 = require("../controllers");
const middlewares_1 = require("../middlewares");
const userRoutes = () => {
    const router = (0, express_1.Router)();
    const controller = new controllers_1.UserController();
    const register = new middlewares_1.Register();
    const login = new middlewares_1.Login();
    router.post("/", [register.validate], controller.register);
    router.post("/login", [login.validate], controller.login);
    return router;
};
exports.userRoutes = userRoutes;
