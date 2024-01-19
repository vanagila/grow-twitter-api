import { Router } from "express";
import { FollowerController } from "../controllers/follower.controller";
import { Auth } from "../middlewares";

export const followerRoutes = () => {
  const router = Router();
  const controller = new FollowerController();
  const auth = new Auth();

  router.post("/", auth.validate, controller.follow);
  router.delete("/:idUser", auth.validate, controller.unfollow);

  return router;
};
