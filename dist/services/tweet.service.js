"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TweetService = void 0;
const prisma_connection_1 = require("../database/prisma.connection");
const models_1 = require("../models");
class TweetService {
    async createTweet(bodyData) {
        const newTweet = await prisma_connection_1.repository.tweet.create({
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
    async listTweets(user) {
        const tweets = await prisma_connection_1.repository.tweet.findMany({
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
    mapToModel(tweet) {
        return new models_1.Tweet(tweet.id, tweet.content, tweet.type);
    }
}
exports.TweetService = TweetService;
