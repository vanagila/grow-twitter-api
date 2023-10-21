import { Router } from "express";

export const tweetRoutes = () => {
  const router = Router();

  router.post("/");

  return router;
};
