"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LikeService = void 0;
const prisma_connection_1 = require("../database/prisma.connection");
const models_1 = require("../models");
class LikeService {
    async likeTweet(bodyData) {
        const tweetFound = await prisma_connection_1.repository.like.findFirst({
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
        const newLike = await prisma_connection_1.repository.like.create({
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
    async deleteLike(bodyData) {
        const likeDeleted = await prisma_connection_1.repository.like.deleteMany({
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
    mapToModel(like) {
        const mapTweet = new models_1.Tweet(like.tweet.id, like.tweet.content, like.tweet.type);
        const mapLike = new models_1.Like(like.id);
        return {
            ...mapLike,
            mapTweet,
        };
    }
}
exports.LikeService = LikeService;
