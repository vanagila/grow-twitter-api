import { NextFunction, Request, Response } from "express";

export class TweetData {
  public validate(req: Request, res: Response, next: NextFunction) {
    const { content } = req.body;

    if (!content) {
      return res.status(400).json({
        code: 400,
        ok: false,
        mensage: "Tweet sem conteudo",
      });
    }
    return next();
  }
}
