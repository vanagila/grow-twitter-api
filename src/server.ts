import cors from "cors";
import "dotenv/config";
import express from "express";
import { likeRoutes, tweetRoutes, userRoutes } from "./routes";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.use("/user", userRoutes());
app.use("/tweet", tweetRoutes());
app.use("/like", likeRoutes());

app.listen(process.env.PORT, () =>
  console.log(`Servidor rodando da porta ${process.env.PORT}`)
);

app.get("/", (_, res) => res.status(200).json({ ok: true }));
