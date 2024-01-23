import { repository } from "../database/prisma.connection";
import { FollowerDTO, ResponseDTO } from "../dtos";

export class FollowerService {
  /**
   * Follow a user.
   *
   * @remarks
   * This method checks if the user is already following the specified user (followingId). If the user is already following it returns a 400 error indicating that. If the user try to follow themselves, it returns a 400 response indicating that. If the validations passes, it creates a new follower relation.
   *
   * @param bodyData - The data for followring a user, the followig id and the user id.

   * @returns A promise in the REST pattern according to the applied logic.
   *
   * @author Vanagila Xavier Rodrigues <vanagilakedna@gmail.com>
   */
  public async followUser(bodyData: FollowerDTO): Promise<ResponseDTO> {
    const alreadyFollowing = await repository.follower.findFirst({
      where: { followingId: bodyData.followingId, userId: bodyData.userId },
    });

    if (alreadyFollowing) {
      return {
        code: 400,
        ok: false,
        message: "Voce ja segue esse usuario",
      };
    }

    if (bodyData.followingId === bodyData.userId) {
      return {
        code: 400,
        ok: false,
        message: "Voce nao pode seguir a si mesmo",
      };
    }

    await repository.follower.create({
      data: {
        followingId: bodyData.followingId,
        userId: bodyData.userId,
      },
    });

    return {
      code: 200,
      ok: true,
      message: "Usuario seguido com sucesso",
    };
  }

  /**
   * Unfollow a user.
   *
   * @remarks
   * This method removes the follower relationship between the user and the specified user (followingId).
   *
   * @param bodyData - The data for unfollowing a user, the followig id and the user id.

   * @returns A promise in the REST pattern according to the applied logic.
   *
   * @author Vanagila Xavier Rodrigues <vanagilakedna@gmail.com>
   */
  public async unfollowUser(bodyData: FollowerDTO): Promise<ResponseDTO> {
    await repository.follower.deleteMany({
      where: {
        followingId: bodyData.followingId,
        userId: bodyData.userId,
      },
    });

    return {
      code: 200,
      ok: true,
      message: "Deixou de seguir o usuario com sucesso",
    };
  }
}
