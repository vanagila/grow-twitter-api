import { Request, Response } from "express";
import { FollowerService } from "../services";

export class FollowerController {
  public async follow(req: Request, res: Response) {
    try {
      const { id } = req.authorizedUser;
      const { followingId } = req.body;

      const service = new FollowerService();
      const response = await service.followUser({
        userId: id,
        followingId,
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

  public async unfollow(req: Request, res: Response) {
    try {
      const { id } = req.authorizedUser;
      const { idUser } = req.params;

      const service = new FollowerService();
      const response = await service.unfollow({
        userId: id,
        followingId: idUser,
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
}
