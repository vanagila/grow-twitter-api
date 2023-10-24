import { Router } from "express";
import { TweetController } from "../controllers";
import { Auth, TweetData, TweetType } from "../middlewares";

export const tweetRoutes = () => {
  const router = Router();
  const controller = new TweetController();
  const auth = new Auth();
  const type = new TweetType();
  const data = new TweetData();

  router.post(
    "/",
    [auth.validate, data.validate, type.validate],
    controller.postTweets
  );

  router.get("/", auth.validate, controller.getTweets);

  return router;
};
