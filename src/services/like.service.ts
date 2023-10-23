import { repository } from "../database/prisma.connection";
import { LikeTweetDTO, ResponseDTO } from "../dtos";

export class LikeService {
  public async likeTweet(bodyData: LikeTweetDTO): Promise<ResponseDTO> {
    const newLike = await repository.like.create({
      data: {
        userId: bodyData.userId,
        tweetId: bodyData.tweetId,
      },
    });

    return {
      code: 201,
      ok: true,
      message: "Tweet postado",
    };
  }
}
