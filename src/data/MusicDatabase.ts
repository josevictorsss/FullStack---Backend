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

  public selectAllMusics = async (userId: string): Promise<Music[]> => {
    try {
      const result = await this.getConnection()
        .select("*")
        .from(this.tableNames.musics)
        .where({ user_id: userId });
      const musics: Music[] = [];
      for (let data of result) {
        const genreResult = await this.genreDatabase.selectMusicByGenre(
          data.id
        );
        musics.push(Music.toMusicModel(data, genreResult));
      }
      return musics;
    } catch (error) {
      throw new Error(error.message || error.sqlMessage);
    }
  };

  public removeMusic = async (id: string, userId: string): Promise<any> => {
    try {
      await this.genreDatabase.removeMusicGenre(id);
      await this.getConnection()
        .delete()
        .from("Labefy_Music")
        .where({ id: id })
        .andWhere({ user_id: userId });
    } catch (error) {
      throw new Error(error.message || error.sqlMessage);
    }
  };
}
