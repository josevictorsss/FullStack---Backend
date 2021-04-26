import express, { Express } from "express";
import cors from "cors";
import { userRouter } from "./routes/userRouter";

const app: Express = express();

app.use(express.json());
app.use(cors());

app.use("/user", userRouter);

export { app };
