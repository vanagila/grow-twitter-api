import { Request, Response } from "express";
import { TweetService } from "../services/tweet.service";

export class TweetController {
  public async postTweet(req: Request, res: Response) {
    try {
      const { content, type, userId } = req.body;

      const service = new TweetService();

      const response = await service.createTweet({
        content,
        type,
        userId,
      });

      return res.status(response.code).json(response);
    } catch (error: any) {
      return res.status(500).json({
        code: 500,
        ok: false,
        mensage: error.toString(),
      });
    }
  }
}
