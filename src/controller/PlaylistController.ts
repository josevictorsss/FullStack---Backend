import { Request, Response } from "express";
import { PlaylistBusiness } from "../business/PlaylistBusiness";
import { MusicDatabase } from "../data/MusicDatabase";
import { PlaylistDatabase } from "../data/PlaylistDatabase";
import { InsertMusicDTO, PlaylistInputDTO } from "../model/Playlist";
import { Authenticator } from "../services/Authenticator";
import { IdGenerator } from "../services/IdGenerator";

const playlistBusiness = new PlaylistBusiness(
  new IdGenerator(),
  new Authenticator(),
  new PlaylistDatabase(),
  new MusicDatabase()
);

class PlaylistController {
  public createPlaylist = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    try {
      const token: string = req.headers.authorization as string;
      const { title, subtitle } = req.body;
      const input: PlaylistInputDTO = {
        title,
        subtitle,
      };
      const newPlaylist = await playlistBusiness.createPlaylist(token, input);
      res.status(201).send({ Playlist: newPlaylist });
    } catch (error) {
      res.status(error.statusCode || 400).send({ message: error.message });
    }
  };

  public getUserPlaylists = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    try {
      const token: string = req.headers.authorization as string;
      const playlists = await playlistBusiness.getUsersPlaylists(token);
      res.status(200).send(playlists);
    } catch (error) {
      res.status(error.statusCode || 400).send({ message: error.message });
    }
  };

  public addMusicToPlaylist = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    try {
      const token: string = req.headers.authorization as string;
      const { musicId, playlistId } = req.body;
      const input: InsertMusicDTO = {
        musicId,
        playlistId,
      };
      await playlistBusiness.addTrackPlaylist(token, input);
      res.status(200).send({ message: "Music added to playlist." });
    } catch (error) {
      res.status(error.statusCode || 400).send({ message: error.message });
    }
  };

  public getPlaylistMusics = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    try {
      const token: string = req.headers.authorization as string;
      const id = req.params.playlistId as string;
      const result = await playlistBusiness.getPlaylistMusics(token, id);
      res.status(200).send(result);
    } catch (error) {
      res.status(error.statusCode || 400).send({ message: error.message });
    }
  };
}

export { PlaylistController };
