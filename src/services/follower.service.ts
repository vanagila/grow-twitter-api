import { repository } from "../database/prisma.connection";
import { FollowerDTO, ResponseDTO } from "../dtos";

export class FollowerService {
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

  public async unfollow(bodyData: FollowerDTO): Promise<ResponseDTO> {
    await repository.follower.deleteMany({
      where: {
        followingId: bodyData.followingId,
        userId: bodyData.userId,
      },
    });

    // await repository.follower.deleteMany({
    //   where: {
    //     AND: [
    //       {
    //         followingId: bodyData.followingId,
    //       },
    //       {
    //         userId: bodyData.userId,
    //       },
    //     ],
    //   },
    // });

    return {
      code: 200,
      ok: true,
      message: "Deixou de seguir o usuario com sucesso",
    };
  }
}
