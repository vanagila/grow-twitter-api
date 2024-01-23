import { Tweet as TweetPrisma } from "@prisma/client";
import { repository } from "../database/prisma.connection";
import { ResponseDTO, TweetPostDTO } from "../dtos";
import { Tweet } from "../models";

export class TweetService {
  /**
   * Creates a new tweet.
   *
   * @remarks
   * This method uses the data provided to create a new tweet.
   *
   * @param bodyData - The data for the new tweet.

   * @returns A promise in the REST pattern according to the applied logic.
   *
   * @author Vanagila Xavier Rodrigues <vanagilakedna@gmail.com>
   */
  public async createTweet(bodyData: TweetPostDTO): Promise<ResponseDTO> {
    const newTweet = await repository.tweet.create({
      data: {
        content: bodyData.content,
        type: bodyData.type,
        userId: bodyData.userId,
      },
    });

    return {
      code: 201,
      ok: true,
      message: "Tweet postado",
      data: this.mapToModel(newTweet),
    };
  }

  /**
   * Lists tweets of a user.
   *
   * @remarks
   * This method retrieves tweets associated with the provided user.If no tweets are found, it returns a 404 response. If tweets are found, it returns the tweets.
   *
   * @param user - The id of the user.

   * @returns A promise in the REST pattern according to the applied logic.
   *
   * @author Vanagila Xavier Rodrigues <vanagilakedna@gmail.com>
   */
  public async listTweets(user: string | undefined): Promise<ResponseDTO> {
    const tweets = await repository.tweet.findMany({
      where: {
        userId: user,
      },
    });

    if (!tweets.length) {
      return {
        code: 404,
        ok: false,
        message: "Tweets nao encontrados",
      };
    }

    return {
      code: 200,
      ok: true,
      message: "Tweets listados com sucesso",
      data: tweets.map((t) => this.mapToModel(t)),
    };
  }

  private mapToModel(tweet: TweetPrisma): Tweet {
    return new Tweet(tweet.id, tweet.content, tweet.type);
  }
}
