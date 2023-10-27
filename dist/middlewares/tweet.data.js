"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TweetData = void 0;
class TweetData {
    validate(req, res, next) {
        const { content } = req.body;
        if (!content) {
            return res.status(400).json({
                code: 400,
                ok: false,
                message: "Tweet sem conteudo",
            });
        }
        return next();
    }
}
exports.TweetData = TweetData;
