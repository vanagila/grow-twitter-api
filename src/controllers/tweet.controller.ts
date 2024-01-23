import { Request, Response } from "express";
import { TweetService } from "../services/tweet.service";

export class TweetController {
  public async postTweets(req: Request, res: Response) {
    try {
      const { content, type } = req.body;

      const { id } = req.authorizedUser;

      const service = new TweetService();

      const response = await service.createTweet({
        content,
        type,
        userId: id,
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

  public async getTweets(req: Request, res: Response) {
    try {
      const { username } = req.authorizedUser;

      const service = new TweetService();

      const response = await service.listTweets(username as string | undefined);

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
