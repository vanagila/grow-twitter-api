import { NextFunction, Request, Response } from "express";

export class TweetType {
  public validate(req: Request, res: Response, next: NextFunction) {
    const { type } = req.body;

    if (type != "T" && type != "R") {
      return res.status(400).json({
        code: 400,
        ok: false,
        message: "Tweet deve ser do tipo 'T'(tweet) ou 'R'(retweet)",
      });
    }

    return next();
  }
}
