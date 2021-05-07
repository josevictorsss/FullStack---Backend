import express from "express";
import { PlaylistController } from "../controller/PlaylistController";

export const playlistRouter = express.Router();

const playlistController = new PlaylistController();

playlistRouter.post("/create", playlistController.createPlaylist);
playlistRouter.put("/music", playlistController.addMusicToPlaylist);
playlistRouter.get("/", playlistController.getUserPlaylists);
playlistRouter.get("/all/:playlistId", playlistController.getPlaylistMusics);
