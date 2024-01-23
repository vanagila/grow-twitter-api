import { Router } from "express";
import { LikeController } from "../controllers";
import { Auth } from "../middlewares";

export const likeRoutes = () => {
  const router = Router();
  const controller = new LikeController();
  const auth = new Auth();

  router.post("/:tweetId", [auth.validate], controller.like);
  router.delete("/:id", [auth.validate], controller.unlike);

  return router;
};
