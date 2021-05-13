import dayjs from "dayjs";
import { MusicDatabase } from "../data/MusicDatabase";
import { PlaylistDatabase } from "../data/PlaylistDatabase";
import { BaseError } from "../error/BaseError";
import { InsertMusicDTO, Playlist, PlaylistInputDTO } from "../model/Playlist";
import { AuthenticationData, Authenticator } from "../services/Authenticator";
import { IdGenerator } from "../services/IdGenerator";

class PlaylistBusiness {
  constructor(
    private idGenerator: IdGenerator,
    private authenticator: Authenticator,
    private playlistDatabase: PlaylistDatabase,
    private musicDatabase: MusicDatabase
  ) {}

  public createPlaylist = async (
    token: string,
    input: PlaylistInputDTO
  ): Promise<Playlist> => {
    const authentication: AuthenticationData =
      this.authenticator.getData(token);
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

  public getUsersPlaylists = async (token: string): Promise<Playlist[]> => {
    try {
      const authentication: AuthenticationData =
        this.authenticator.getData(token);
      const result = await this.playlistDatabase.selectUserPlaylists(
        authentication.id
      );
      if (!result) {
        throw new BaseError("You don't have any playlists", 404);
      }
      return result;
    } catch (error) {
      throw new BaseError(error.message || error.sqlMessage, error.statusCode);
    }
  };

  public addTrackPlaylist = async (
    token: string,
    input: InsertMusicDTO
  ): Promise<void> => {
    try {
      const authentication: AuthenticationData =
        this.authenticator.getData(token);
      const { musicId, playlistId } = input;
      if (!musicId || !playlistId) {
        throw new BaseError("Missing parameters", 422);
      }
      const music = await this.musicDatabase.selectMusicById(
        musicId,
        authentication.id
      );
      if (!music) {
        throw new BaseError("Music doens't exist", 404);
      }
      const playlist = await this.playlistDatabase.selectPlaylistById(
        playlistId,
        authentication.id
      );
      if (!playlist) {
        throw new BaseError("Playlist doens't exist", 404);
      }
      await this.playlistDatabase.insertMusicPlaylist(musicId, playlistId);
    } catch (error) {
      throw new BaseError(error.message || error.sqlMessage, error.statusCode);
    }
  };

  public getPlaylistMusics = async (
    token: string,
    playlistId: string
  ): Promise<any> => {
    try {
      const authentication: AuthenticationData =
        this.authenticator.getData(token);
      const musics = await this.playlistDatabase.selectPlaylistMusics(
        playlistId,
        authentication.id
      );
      if (!musics) {
        throw new BaseError("Don't have musics in this playlist", 404);
      }
      const playlistInfo = await this.playlistDatabase.selectPlaylistById(
        playlistId,
        authentication.id
      );
      const result = {
        musics,
        playlistInfo,
      };
      return result;
    } catch (error) {
      throw new BaseError(error.message || error.sqlMessage, error.statusCode);
    }
  };
}

export { PlaylistBusiness };
