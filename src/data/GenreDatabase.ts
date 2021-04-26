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
}
