import express from "express";
import { PlaylistController } from "../controller/PlaylistController";

export const playlistRouter = express.Router();

const playlistController = new PlaylistController();

playlistRouter.post("/create", playlistController.createPlaylist);
