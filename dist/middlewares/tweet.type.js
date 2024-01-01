"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TweetType = void 0;
class TweetType {
    validate(req, res, next) {
        const { type } = req.body;
        if (type != "T" || type != "R") {
            return res.status(400).json({
                code: 400,
                ok: false,
                message: "Tweet deve ser do tipo 'T'(tweet) ou 'R'(retweet)",
            });
        }
    }
}
exports.TweetType = TweetType;
