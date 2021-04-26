import { Music } from "../model/Music";
import { BaseDatabase } from "./BaseDatabase";
import { GenreDatabase } from "./GenreDatabase";

export class MusicDatabase extends BaseDatabase {
  private genreDatabase = new GenreDatabase();
  public insertMusic = async (music: Music): Promise<void> => {
    try {
      await this.getConnection()
        .insert({
          id: music.id,
          title: music.title,
          author: music.author,
          date: music.createdAt,
          file: music.file,
          album: music.album,
          user_id: music.userId,
        })
        .into(this.tableNames.musics);
      await this.genreDatabase.insertMusicGenres(music.getGenres(), music.id);
    } catch (error) {
      throw new Error(error.message || error.sqlMessage);
    }
  };
}
