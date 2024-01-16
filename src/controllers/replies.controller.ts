import { Request, Response } from "express";
import { ReplyService } from "../services/reply.service";

export class ReplyController {
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
