import { NextFunction, Request, Response } from "express";

export class Login {
  public validate(req: Request, res: Response, next: NextFunction) {
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
