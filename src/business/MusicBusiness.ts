import { MusicDatabase } from "../data/MusicDatabase";
import { AllMusics, Genre, Music, MusicInputDTO } from "../model/Music";
import { Authenticator } from "../services/Authenticator";
import { IdGenerator } from "../services/IdGenerator";
import { AuthenticationData } from "../services/Authenticator";
import { BaseError } from "../error/BaseError";
import dayjs from "dayjs";
import { GenreDatabase } from "../data/GenreDatabase";

class MusicBusiness {
  constructor(
    private idGenerator: IdGenerator,
    private authenticator: Authenticator,
    private musicDatabase: MusicDatabase,
    private genreDatabase: GenreDatabase
  ) {}

  public addMusic = async (token: string, input: MusicInputDTO) => {
    try {
      const authentication: AuthenticationData = this.authenticator.getData(
        token
      );
      const { title, author, file, genres, album } = input;
      if (!title || !author || !file || !genres || !album) {
        throw new BaseError("Invalid parameters to add a music", 422);
      }
      const id = this.idGenerator.generate();
      const genresModel: Genre[] = genres.map((genre) => {
        return {
          id: this.idGenerator.generate(),
          type: genre,
        };
      });
      const newMusic: Music = new Music(
        id,
        title,
        author,
        dayjs().format("YYYY-MM-DD"),
        file,
        genresModel,
        album,
        authentication.id
      );
      await this.musicDatabase.insertMusic(newMusic);
      return newMusic;
    } catch (error) {
      throw new BaseError(error.message || error.sqlMessage, error.statusCode);
    }
  };

  public getMusicById = async (token: string, id: string): Promise<Music> => {
    try {
      const authentication: AuthenticationData = this.authenticator.getData(
        token
      );
      const music = await this.musicDatabase.selectMusicById(
        id,
        authentication.id
      );
      if (!music) {
        throw new BaseError("Music not found", 404);
      }
      return music;
    } catch (error) {
      throw new BaseError(error.message || error.sqlMessage, error.statusCode);
    }
  };

  public getAllMusics = async (token: string): Promise<AllMusics[]> => {
    try {
      const authentication: AuthenticationData = this.authenticator.getData(
        token
      );
      const result = await this.musicDatabase.selectAllMusics(
        authentication.id
      );
      if (!result) {
        throw new BaseError("You don't have any music", 404);
      }
      const musics = result.map((item) => {
        const genres = item.getGenres().map((genre) => genre.type);
        return {
          id: item.id,
          title: item.title,
          author: item.author,
          createdAt: dayjs(item.createdAt).format("DD/MM/YYYY"),
          file: item.file,
          genres: genres,
          album: item.album,
          userId: item.userId,
        };
      });
      return musics;
    } catch (error) {
      throw new BaseError(error.message || error.sqlMessage, error.statusCode);
    }
  };

  public getAllGenres = async (): Promise<string[]> => {
    try {
      const result = await this.genreDatabase.selectAllGenres();
      if (!result) {
        throw new BaseError("Don't have any genre", 404);
      }
      return result;
    } catch (error) {
      throw new BaseError(error.message || error.sqlMessage, error.statusCode);
    }
  };
}

export { MusicBusiness };
