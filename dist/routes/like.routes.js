"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.likeRoutes = void 0;
const express_1 = require("express");
const controllers_1 = require("../controllers");
const middlewares_1 = require("../middlewares");
const likeRoutes = () => {
    const router = (0, express_1.Router)();
    const controller = new controllers_1.LikeController();
    const auth = new middlewares_1.Auth();
    router.post("/:tweetId", [auth.validate], controller.like);
    router.delete("/:id", [auth.validate], controller.delete);
    return router;
};
exports.likeRoutes = likeRoutes;
