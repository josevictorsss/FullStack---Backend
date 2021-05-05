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
}
