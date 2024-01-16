import { Reply as ReplyPrisma } from "@prisma/client";
import { repository } from "../database/prisma.connection";
import { ReplyPostDTO, ResponseDTO } from "../dtos";
import { Reply } from "../models";

export class ReplyService {
  public async createReply(bodyData: ReplyPostDTO): Promise<ResponseDTO> {
    //criar if para validar se o tweetId existe
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
