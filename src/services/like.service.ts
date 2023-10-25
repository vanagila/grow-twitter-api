import { repository } from "../database/prisma.connection";
import {
  DeleteLikeDTO,
  LikeTweetDTO,
  LikeWithTweetRelation,
  ResponseDTO,
} from "../dtos";
import { Like, Tweet } from "../models";

export class LikeService {
  public async likeTweet(bodyData: LikeTweetDTO): Promise<ResponseDTO> {
    const tweetFound = await repository.like.findFirst({
      where: {
        userId: bodyData.userId,
        tweetId: bodyData.tweetId,
      },
    });

    if (tweetFound) {
      return {
        code: 400,
        ok: false,
        message: "Voce ja deu like nesse tweet",
      };
    }
    //nao precisa checar tweet curtido ou nao, apenas criar
    const newLike = await repository.like.create({
      data: {
        userId: bodyData.userId,
        tweetId: bodyData.tweetId,
      },
      include: { tweet: true },
    });

    return {
      code: 200,
      ok: true,
      message: "Tweet curtido com sucesso",
      data: this.mapToModel(newLike),
    };
  }

  public async deleteLike(bodyData: DeleteLikeDTO): Promise<ResponseDTO> {
    const likeDeleted = await repository.like.deleteMany({
      where: {
        tweetId: bodyData.tweetId,
        userId: bodyData.userId,
      },
    });

    return {
      code: 200,
      ok: true,
      message: "Tweet descurtido com sucesso",
    };
  }

  private mapToModel(like: LikeWithTweetRelation) {
    const mapTweet = new Tweet(
      like.tweet.id,
      like.tweet.content,
      like.tweet.type
    );
    const mapLike = new Like(like.id);
    return {
      ...mapLike,
      mapTweet,
    };
  }
}
