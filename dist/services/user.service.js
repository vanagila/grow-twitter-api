"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const crypto_1 = require("crypto");
const prisma_connection_1 = require("../database/prisma.connection");
const models_1 = require("../models");
class UserService {
    async register(bodyData) {
        const emailAlreadyinUse = await prisma_connection_1.repository.user.findUnique({
            where: { email: bodyData.email },
        });
        if (emailAlreadyinUse) {
            return {
                code: 400,
                ok: false,
                message: "E-mail ja cadastrado",
            };
        }
        const newUser = await prisma_connection_1.repository.user.create({
            data: {
                name: bodyData.name,
                username: bodyData.username,
                email: bodyData.email,
                password: bodyData.password,
            },
        });
        return {
            code: 201,
            ok: true,
            message: "Usuario cadastrado",
            data: this.mapToModel({ ...newUser }),
        };
    }
    async login(bodyData) {
        const userFound = await prisma_connection_1.repository.user.findUnique({
            where: {
                username: bodyData.username,
                password: bodyData.password,
            },
        });
        if (!userFound) {
            return {
                code: 401,
                ok: false,
                message: "Dados invalidos",
            };
        }
        const token = (0, crypto_1.randomUUID)();
        await prisma_connection_1.repository.user.update({
            where: { id: userFound.id },
            data: { authToken: token },
        });
        return {
            code: 200,
            ok: true,
            message: "Login feito com sucesso",
            data: { token },
        };
    }
    async validateToken(token) {
        const userFound = await prisma_connection_1.repository.user.findFirst({
            where: { authToken: token },
        });
        if (!userFound)
            return null;
        return userFound.id;
    }
    mapToModel(userDB) {
        return new models_1.User(userDB.id, userDB.name, userDB.username, userDB.email, userDB.password);
    }
}
exports.UserService = UserService;
