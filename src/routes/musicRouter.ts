import express from "express";
import { MusicController } from "../controller/MusicController";

export const musicRouter = express.Router();

const musicController = new MusicController();

musicRouter.post("/add", musicController.addMusic);
musicRouter.delete("/remove/:id", musicController.deleteMusic);
musicRouter.get("/all", musicController.getAllMusics);
musicRouter.get("/genres", musicController.getAllGenres);
musicRouter.get("/:id", musicController.getMusicById);
