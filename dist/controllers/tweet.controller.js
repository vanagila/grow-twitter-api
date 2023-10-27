"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TweetController = void 0;
const tweet_service_1 = require("../services/tweet.service");
class TweetController {
    async postTweets(req, res) {
        try {
            const { content, type, userId } = req.body;
            const service = new tweet_service_1.TweetService();
            const response = await service.createTweet({
                content,
                type,
                userId,
            });
            return res.status(response.code).json(response);
        }
        catch (error) {
            return res.status(500).json({
                code: 500,
                ok: false,
                message: error.toString(),
            });
        }
    }
    async getTweets(req, res) {
        try {
            const { user } = req.query;
            const service = new tweet_service_1.TweetService();
            const response = await service.listTweets(user);
            return res.status(response.code).json(response);
        }
        catch (error) {
            return res.status(500).json({
                code: 500,
                ok: false,
                message: error.toString(),
            });
        }
    }
}
exports.TweetController = TweetController;
