import { Request, Response } from "express";
import { LikeService } from "../services";

export class LikeController {
  /**
   * Handles the process of a user liking a tweet.
   *
   * @remarks
   * This method processes requests to like a tweet.
   *
   * @param req - The expresss request
   * @param res - The expresss response

   * @returns A promise in the REST pattern according to the applied logic.
   *
   * @author Vanagila Xavier Rodrigues <vanagilakedna@gmail.com>
   */
  public async like(req: Request, res: Response) {
    try {
      const { id } = req.authorizedUser;
      const { tweetId } = req.params;

      const service = new LikeService();
      const response = await service.likeTweet({ userId: id, tweetId });

      return res.status(response.code).json(response);
    } catch (error: any) {
      return res.status(500).json({
        code: 500,
        ok: false,
        message: error.toString(),
      });
    }
  }

  /**
   * Handles the process of a user unliking a tweet.
   *
   * @remarks
   * This method processes requests to unlike a tweet.
   *
   * @param req - The expresss request
   * @param res - The expresss response

   * @returns A promise in the REST pattern according to the applied logic.
   *
   * @author Vanagila Xavier Rodrigues <vanagilakedna@gmail.com>
   */
  public async unlike(req: Request, res: Response) {
    try {
      const { userId, tweetId } = req.params;

      const service = new LikeService();
      const response = await service.unlikeTweet({ userId, tweetId });

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
