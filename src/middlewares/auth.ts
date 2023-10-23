import { NextFunction, Request, Response } from "express";
import { UserService } from "../services";

export class Auth {
  public async validate(req: Request, res: Response, next: NextFunction) {
    const token = req.headers.authorization;

    if (!token) {
      return res.status(401).json({
        code: 401,
        ok: false,
        message: "Token obrigatorio",
      });
    }

    const service = new UserService();

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
