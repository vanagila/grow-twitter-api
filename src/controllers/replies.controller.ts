import { Request, Response } from "express";
import { ReplyService } from "../services/reply.service";

export class ReplyController {
  /**
   * Handles the process of a user posting a reply to a tweet.
   *
   * @remarks
   * This method processes requests to post a reply to a tweet.
   *
   * @param req - The expresss request
   * @param res - The expresss response

   * @returns A promise in the REST pattern according to the applied logic.
   *
   * @author Vanagila Xavier Rodrigues <vanagilakedna@gmail.com>
   */
  public async postReplies(req: Request, res: Response) {
    try {
      const { content, tweetId } = req.body;

      const { id } = req.authorizedUser;

      const service = new ReplyService();

      const response = await service.createReply({
        content,
        tweetId,
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

  /**
   * Handles the process of a user posting a reply to a tweet.
   *
   * @remarks
   * This method processes requests to post a reply to a tweet.
   *
   * @param req - The expresss request
   * @param res - The expresss response

   * @returns A promise in the REST pattern according to the applied logic.
   *
   * @author Vanagila Xavier Rodrigues <vanagilakedna@gmail.com>
   */
  public async getReplies(req: Request, res: Response) {
    try {
      const { tweetId } = req.params;

      const service = new ReplyService();

      const response = await service.listReplies(tweetId);

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
