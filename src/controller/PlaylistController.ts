import { Request, Response } from "express";
import { PlaylistBusiness } from "../business/PlaylistBusiness";
import { PlaylistDatabase } from "../data/PlaylistDatabase";
import { PlaylistInputDTO } from "../model/Playlist";
import { Authenticator } from "../services/Authenticator";
import { IdGenerator } from "../services/IdGenerator";

const playlistBusiness = new PlaylistBusiness(
  new IdGenerator(),
  new Authenticator(),
  new PlaylistDatabase()
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
}

export { PlaylistController };
