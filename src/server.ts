import cors from "cors";
import express from "express";
import { envs } from "./envs";
import { authRoutes, likeRoutes, replyRoutes, tweetRoutes } from "./routes";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.use("/users", authRoutes());
app.use("/tweets", tweetRoutes());
app.use("/likes", likeRoutes());
app.use("/replies", replyRoutes());

app.listen(envs.PORT, () =>
  console.log(`Servidor rodando da porta ${envs.PORT}`)
);

app.get("/", (_, res) => res.status(200).json({ ok: true }));
