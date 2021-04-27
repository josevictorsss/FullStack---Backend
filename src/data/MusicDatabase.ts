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

  public selectMusicById = async (
    id: string,
    userId: string
  ): Promise<Music> => {
    try {
      const result = await this.getConnection()
        .select("*")
        .from(this.tableNames.musics)
        .where({ id })
        .andWhere({ user_id: userId });
      const genreResult = await this.genreDatabase.selectMusicByGenre(id);
      return Music.toMusicModel(result[0], genreResult);
    } catch (error) {
      throw new Error(error.mesage || error.sqlMessage);
    }
  };
}
