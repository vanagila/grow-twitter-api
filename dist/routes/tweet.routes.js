"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tweetRoutes = void 0;
const express_1 = require("express");
const controllers_1 = require("../controllers");
const middlewares_1 = require("../middlewares");
const tweetRoutes = () => {
    const router = (0, express_1.Router)();
    const controller = new controllers_1.TweetController();
    const auth = new middlewares_1.Auth();
    const type = new middlewares_1.TweetType();
    const data = new middlewares_1.TweetData();
    router.post("/", [auth.validate, data.validate, type.validate], controller.postTweets);
    router.get("/", auth.validate, controller.getTweets);
    return router;
};
exports.tweetRoutes = tweetRoutes;
