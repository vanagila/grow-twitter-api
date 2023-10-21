import { Router } from "express";

export const userRoutes = () => {
  const router = Router();

  router.post("/");
  router.post("/login");

  return router;
};
