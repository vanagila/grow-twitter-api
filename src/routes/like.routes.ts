import { Router } from "express";

export const likeRoutes = () => {
  const router = Router();

  router.post("/");
  router.delete("/");

  return router;
};
