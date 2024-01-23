import { Request, Response } from "express";
import { FollowerService } from "../services";

export class FollowerController {
  /**
   * Handles the process of a user following another user.
   *
   * @remarks
   * This method processes requests to follow another user.
   *
   * @param req - The expresss request
   * @param res - The expresss response

   * @returns A promise in the REST pattern according to the applied logic.
   *
   * @author Vanagila Xavier Rodrigues <vanagilakedna@gmail.com>
   */
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

  /**
   * Handles the process of a user unfollowing another user.
   *
   * @remarks
   * This method processes requests to unfollow another user.
   *
   * @param req - The expresss request
   * @param res - The expresss response

   * @returns A promise in the REST pattern according to the applied logic.
   *
   * @author Vanagila Xavier Rodrigues <vanagilakedna@gmail.com>
   */
  public async unfollow(req: Request, res: Response) {
    try {
      const { id } = req.authorizedUser;
      const { idUser } = req.params;

      const service = new FollowerService();
      const response = await service.unfollowUser({
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
