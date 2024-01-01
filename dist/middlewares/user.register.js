"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Register = void 0;
class Register {
    validate(req, res, next) {
        const { name, username, email, password } = req.body;
        if (!name || !username || !email || !password) {
            return res.status(400).json({
                ok: false,
                message: "Todos os campos devem ser preenchidos",
            });
        }
        if (!email.includes("@") || !email.includes(".com")) {
            return res.status(400).json({
                ok: false,
                message: "E-mail inválido",
            });
        }
        if (password.length < 8) {
            return res.status(400).json({
                ok: false,
                message: "Senha deve ver pelo menos 8 caracteres",
            });
        }
        next();
    }
}
exports.Register = Register;
