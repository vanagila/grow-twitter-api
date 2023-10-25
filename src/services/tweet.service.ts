import { Tweet as TweetPrisma } from "@prisma/client";
import { repository } from "../database/prisma.connection";
import { ResponseDTO, TweetPostDTO } from "../dtos";
import { Tweet } from "../models";

export class TweetService {
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
        message: "Tweets nao encontrado",
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
