import { Genre } from "../model/Music";
import { BaseDatabase } from "./BaseDatabase";

export class GenreDatabase extends BaseDatabase {
  public insertMusicGenres = async (
    genres: Genre[],
    musicId: string
  ): Promise<void> => {
    try {
      for (let genre of genres) {
        await this.getConnection()
          .insert({
            id: genre.id,
            type: genre.type,
          })
          .into(this.tableNames.genre);

        await this.getConnection()
          .insert({
            music_id: musicId,
            genre_id: genre.id,
          })
          .into(this.tableNames.musicGenre);
      }
    } catch (error) {
      throw new Error(error.message || error.sqlMessage);
    }
  };

  public selectMusicByGenre = async (musicId: string): Promise<Genre[]> => {
    try {
      const result = await this.getConnection().raw(`
        SELECT * FROM Labefy_Genre
        JOIN Labefy_MusicGenre
        ON Labefy_Genre.id = Labefy_MusicGenre.genre_id
        WHERE Labefy_MusicGenre.music_id = "${musicId}"
       `);
      return result[0];
    } catch (error) {
      throw new Error(error.message || error.sqlMessage);
    }
  };

  public selectAllGenres = async (): Promise<string[]> => {
    try {
      const result = await this.getConnection()
        .select("*")
        .from(this.tableNames.genre)
        .distinct("type");

      const genres: string[] = [];
      for (let data of result) {
        result && genres.push(data.type);
      }
      return genres;
    } catch (error) {
      throw new Error(error.message || error.sqlMessage);
    }
  };
}
