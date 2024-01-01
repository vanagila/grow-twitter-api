"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LikeController = void 0;
const services_1 = require("../services");
class LikeController {
    async like(req, res) {
        try {
            const { userId } = req.body;
            const { tweetId } = req.params;
            const service = new services_1.LikeService();
            const response = await service.likeTweet({ userId, tweetId });
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
    async delete(req, res) {
        try {
            const { userId, tweetId } = req.params;
            const service = new services_1.LikeService();
            const response = await service.deleteLike({ userId, tweetId });
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
exports.LikeController = LikeController;
