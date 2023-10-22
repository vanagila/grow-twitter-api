import { NextFunction, Request, Response } from "express";

export class Register {
  public validate(req: Request, res: Response, next: NextFunction) {
    const { name, username, email, password } = req.body;

    if (!name || !username || !email || !password) {
      return res.status(400).json({
        ok: false,
        mensage: "Todos os campos devem ser preenchidos",
      });
    }

    if (!email.includes("@") || !email.includes(".com")) {
      return res.status(400).json({
        ok: false,
        mensage: "E-mail inválido",
      });
    }

    if (password.length < 8) {
      return res.status(400).json({
        ok: false,
        mensage: "Senha deve ver pelo menos 8 caracteres",
      });
    }

    next();
  }
}
