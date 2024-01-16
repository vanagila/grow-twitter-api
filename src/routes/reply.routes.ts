import { Router } from "express";
import { ReplyController } from "../controllers";
import { Auth, ReplyData } from "../middlewares";

export const replyRoutes = () => {
  const router = Router();
  const controller = new ReplyController();
  const auth = new Auth();
  const data = new ReplyData();

  router.post("/", [auth.validate, data.validate], controller.postReplies);

  router.get("/", auth.validate, controller.getReplies);

  return router;
};
