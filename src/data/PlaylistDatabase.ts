import { AllMusics } from "../model/Music";
import { Playlist } from "../model/Playlist";
import { BaseDatabase } from "./BaseDatabase";

export class PlaylistDatabase extends BaseDatabase {
  public insertPlaylist = async (playlist: Playlist): Promise<void> => {
    try {
      await this.getConnection()
        .insert({
          id: playlist.id,
          title: playlist.title,
          subtitle: playlist.subtitle,
          date: playlist.createdAt,
          user_id: playlist.userId,
        })
        .into(this.tableNames.playlists);
    } catch (error) {
      throw new Error(error.message || error.sqlMessage);
    }
  };

  public selectUserPlaylists = async (userId: string): Promise<Playlist[]> => {
    try {
      const result = await this.getConnection()
        .select("*")
        .from(this.tableNames.playlists)
        .where({ user_id: userId });
      const playlists: Playlist[] = [];
      for (let data of result) {
        playlists.push(Playlist.toPlaylistModel(data));
      }
      return playlists;
    } catch (error) {
      throw new Error(error.message || error.sqlMessage);
    }
  };

  public selectPlaylistById = async (
    id: string,
    userId: string
  ): Promise<Playlist> => {
    try {
      const result = await this.getConnection()
        .select("*")
        .from(this.tableNames.playlists)
        .where({ id })
        .andWhere({ user_id: userId });
      return Playlist.toPlaylistModel(result[0]);
    } catch (error) {
      throw new Error(error.message || error.sqlMessage);
    }
  };

  public insertMusicPlaylist = async (
    musicId: string,
    playlistId: string
  ): Promise<void> => {
    try {
      await this.getConnection()
        .insert({
          playlist_id: playlistId,
          music_id: musicId,
        })
        .into(this.tableNames.playlistMusics);
    } catch (error) {
      throw new Error(error.message || error.sqlMessage);
    }
  };

  public selectPlaylistMusics = async (playlistId: string, userId: string) => {
    try {
      const result = await this.getConnection()
        .innerJoin(this.tableNames.playlistMusics, "music_id", "id")
        .select("id", "title", "author", "date")
        .from(this.tableNames.musics)
        .where({ playlist_id: playlistId })
        .andWhere({ user_id: userId });
      const musics: AllMusics[] = [];
      for (let data of result) {
        musics.push(Playlist.toAllMusics(data));
      }
      return musics;
    } catch (error) {
      throw new Error(error.message || error.sqlMessage);
    }
  };
}
