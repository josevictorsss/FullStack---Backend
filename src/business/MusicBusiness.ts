import { MusicDatabase } from "../data/MusicDatabase";
import { Genre, Music, MusicInputDTO } from "../model/Music";
import { Authenticator } from "../services/Authenticator";
import { IdGenerator } from "../services/IdGenerator";
import { AuthenticationData } from "../services/Authenticator";
import { BaseError } from "../error/BaseError";
import dayjs from "dayjs";

class MusicBusiness {
  constructor(
    private idGenerator: IdGenerator,
    private authenticator: Authenticator,
    private musicDatabase: MusicDatabase
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
}

export { MusicBusiness };
