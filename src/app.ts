import express, { Express } from "express";
import cors from "cors";
import { userRouter } from "./routes/userRouter";
import { musicRouter } from "./routes/musicRouter";

const app: Express = express();

app.use(express.json());
app.use(cors());

app.use("/user", userRouter);
app.use("/music", musicRouter);

export { app };
