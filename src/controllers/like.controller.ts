import { Request, Response } from "express";
import { LikeService } from "../services";

export class LikeController {
  public async like(req: Request, res: Response) {
    try {
      const { userId } = req.body;
      const { tweetId } = req.params;

      const service = new LikeService();
      const response = await service.likeTweet({ userId, tweetId });

      return res.status(response.code).json(response);
    } catch (error: any) {
      return res.status(500).json({
        code: 500,
        ok: false,
        message: error.toString(),
      });
    }
  }

  public async delete(req: Request, res: Response) {
    try {
      const { userId, tweetId } = req.params;

      const service = new LikeService();
      const response = await service.deleteLike({ userId, tweetId });

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
