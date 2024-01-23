import { repository } from "../database/prisma.connection";
import {
  DeleteLikeDTO,
  LikeTweetDTO,
  LikeWithTweetRelation,
  ResponseDTO,
} from "../dtos";
import { Like, Tweet } from "../models";

export class LikeService {
  /**
   * Likes a tweet.
   *
   * @remarks
   * This method creates a new like on the specified tweet.
   *
   * @param bodyData - The data for liking a tweet.

   * @returns A promise in the REST pattern according to the applied logic.
   *
   * @author Vanagila Xavier Rodrigues <vanagilakedna@gmail.com>
   */
  public async likeTweet(bodyData: LikeTweetDTO): Promise<ResponseDTO> {
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

  /**
   * Unlike a tweet.
   *
   * @remarks
   * This method unlikes a specified tweet.
   *
   * @param bodyData - The data for unliking a tweet.

   * @returns A promise in the REST pattern according to the applied logic.
   *
   * @author Vanagila Xavier Rodrigues <vanagilakedna@gmail.com>
   */
  public async unlikeTweet(bodyData: DeleteLikeDTO): Promise<ResponseDTO> {
    await repository.like.deleteMany({
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
