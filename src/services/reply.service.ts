import { Reply as ReplyPrisma } from "@prisma/client";
import { repository } from "../database/prisma.connection";
import { ReplyPostDTO, ResponseDTO } from "../dtos";
import { Reply } from "../models";

export class ReplyService {
  /**
   * Creates a new reply to a tweet.
   *
   * @remarks
   * This method includes a check to validate if the especified tweet id exists. If the id not provided or not found, it returns a 404 response. If the validations passes, it creates a new reply.
   *
   * @param bodyData - The data for the new reply.

   * @returns A promise in the REST pattern according to the applied logic.
   *
   * @author Vanagila Xavier Rodrigues <vanagilakedna@gmail.com>
   */
  public async createReply(bodyData: ReplyPostDTO): Promise<ResponseDTO> {
    //criar if para validar se o tweetId existe
    if (bodyData.tweetId === undefined) {
      return {
        code: 404,
        ok: false,
        message: "Tweet nao existe",
      };
    }

    const newReply = await repository.reply.create({
      data: {
        content: bodyData.content,
        tweetId: bodyData.tweetId,
        userId: bodyData.userId,
      },
    });

    return {
      code: 201,
      ok: true,
      message: "Resposta postada",
      data: this.mapToModel(newReply),
    };
  }

  /**
   * Lists the replies of a tweet.
   *
   * @remarks
   * This method retrieves replies associated with the provided tweet.If no replies are found, it returns a 404 response. If replies are found, it returns the replies.
   *
   * @param user - The id of the tweet.

   * @returns A promise in the REST pattern according to the applied logic.
   *
   * @author Vanagila Xavier Rodrigues <vanagilakedna@gmail.com>
   */
  public async listReplies(tweet: string | undefined): Promise<ResponseDTO> {
    const replies = await repository.reply.findMany({
      where: {
        tweetId: tweet,
      },
    });

    if (!replies.length) {
      return {
        code: 404,
        ok: false,
        message: "Respostas nao encontradas",
      };
    }

    return {
      code: 200,
      ok: true,
      message: "Respostas listadas com sucesso",
      data: replies.map((r) => this.mapToModel(r)),
    };
  }

  private mapToModel(reply: ReplyPrisma): Reply {
    return new Reply(reply.id, reply.content);
  }
}
