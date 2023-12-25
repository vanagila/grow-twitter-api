import { Request, Response } from "express";
import { UserService } from "../services";
import { AuthService } from "../services/auth.service";

export class UserController {
  public async register(req: Request, res: Response) {
    try {
      const { name, username, email, password } = req.body;
      const service = new UserService();

      const response = await service.register({
        name,
        username,
        email,
        password,
      });

      return res.status(response.code).json(response);
    } catch (error: any) {
      return res.status(500).json({
        code: 500,
        ok: false,
        message: error.toString(),
      });
    }
  }

  public async login(req: Request, res: Response) {
    try {
      const { username, password } = req.body;

      const auth = new AuthService();

      const response = await auth.login({ username, password });

      return res.status(response.code).json(response);
    } catch (error: any) {
      return res.status(500).json({
        code: 500,
        ok: false,
        message: error.toString(),
      });
    }
  }
}
