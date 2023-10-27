"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Auth = void 0;
const services_1 = require("../services");
class Auth {
    async validate(req, res, next) {
        const token = req.headers.authorization;
        if (!token) {
            return res.status(401).json({
                code: 401,
                ok: false,
                message: "Token obrigatorio",
            });
        }
        const service = new services_1.UserService();
        const userAuthenticated = await service.validateToken(token);
        if (!userAuthenticated) {
            return res.status(401).json({
                code: 401,
                ok: false,
                message: "Token invalido",
            });
        }
        req.body.userId = userAuthenticated;
        return next();
    }
}
exports.Auth = Auth;
