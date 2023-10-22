import { Router } from "express";
import { UserController } from "../controllers";
export const userRoutes = () => {
  const router = Router();
  const controller = new UserController();

  router.post("/", controller.register);
  router.post("/login");

  return router;
};
