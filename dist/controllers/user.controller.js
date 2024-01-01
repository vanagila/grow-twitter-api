"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const services_1 = require("../services");
class UserController {
    async register(req, res) {
        try {
            const { name, username, email, password } = req.body;
            const service = new services_1.UserService();
            const response = await service.register({
                name,
                username,
                email,
                password,
            });
            return res.status(response.code).json(response);
        }
        catch (error) {
            return res.status(500).json({
                code: 500,
                ok: false,
                message: error.toString(),
            });
        }
    }
    async login(req, res) {
        try {
            const { username, password } = req.body;
            const service = new services_1.UserService();
            const response = await service.login({ username, password });
            return res.status(response.code).json(response);
        }
        catch (error) {
            return res.status(500).json({
                code: 500,
                ok: false,
                message: error.toString(),
            });
        }
    }
}
exports.UserController = UserController;
