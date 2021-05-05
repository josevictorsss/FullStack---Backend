import dayjs from "dayjs";
import { PlaylistDatabase } from "../data/PlaylistDatabase";
import { BaseError } from "../error/BaseError";
import { Playlist, PlaylistInputDTO } from "../model/Playlist";
import { AuthenticationData, Authenticator } from "../services/Authenticator";
import { IdGenerator } from "../services/IdGenerator";

class PlaylistBusiness {
  constructor(
    private idGenerator: IdGenerator,
    private authenticator: Authenticator,
    private playlistDatabase: PlaylistDatabase
  ) {}

  public createPlaylist = async (
    token: string,
    input: PlaylistInputDTO
  ): Promise<Playlist> => {
    const authentication: AuthenticationData = this.authenticator.getData(
      token
    );
    const { title, subtitle } = input;
    if (!title || !subtitle) {
      throw new BaseError("Invalid parameters to create an playlist", 422);
    }
    const id = this.idGenerator.generate();
    const newPlaylist: Playlist = new Playlist(
      id,
      title,
      subtitle,
      dayjs().format("YYYY-MM-DD"),
      authentication.id
    );
    await this.playlistDatabase.insertPlaylist(newPlaylist);
    return newPlaylist;
  };
}

export { PlaylistBusiness };
