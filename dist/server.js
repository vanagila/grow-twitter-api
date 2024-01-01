"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
require("dotenv/config");
const express_1 = __importDefault(require("express"));
const routes_1 = require("./routes");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use((0, cors_1.default)());
app.use("/users", (0, routes_1.userRoutes)());
app.use("/tweets", (0, routes_1.tweetRoutes)());
app.use("/likes", (0, routes_1.likeRoutes)());
app.listen(process.env.PORT, () => console.log(`Servidor rodando da porta ${process.env.PORT}`));
app.get("/", (_, res) => res.status(200).json({ ok: true }));
