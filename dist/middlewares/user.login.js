"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Login = void 0;
class Login {
    validate(req, res, next) {
        const { username, password } = req.body;
        if (!username || !password) {
            return res.status(400).json({
                ok: false,
                message: "Todos os campos devem ser preenchidos",
            });
        }
        return next();
    }
}
exports.Login = Login;
