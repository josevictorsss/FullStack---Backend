import { Playlist } from "./Playlist";

export class Music {
  constructor(
    public readonly id: string,
    public readonly title: string,
    public readonly author: string,
    public readonly createdAt: string,
    public readonly file: string,
    private genres: Genre[],
    public readonly album: string,
    public readonly userId: string
  ) {}

  public getGenres = () => this.genres;
  public setGenres = (genres: Genre[]) => {
    this.genres = genres;
  };

  static toMusicModel(music: any, genres: Genre[]): Music {
    return new Music(
      music.id,
      music.title,
      music.author,
      music.date,
      music.file,
      genres,
      music.album,
      music.userId
    );
  }
}

export type AllMusics = {
  id: string;
  title: string;
  author: string;
  createdAt: string;
  file?: string;
  genres?: string[];
  album?: string;
  userId?: string;
};
export interface MusicInputDTO {
  title: string;
  author: string;
  file: string;
  genres: string[];
  album: string;
}

export interface Genre {
  id: string;
  type: string;
}

export enum Genres {
  FUNK = "FUNK",
  TRAP = "TRAP",
  ROCK = "ROCK",
  PAGODE = "PAGODE",
  SERTANEJO = "SERTANEJO",
  POP = "POP",
  RAP = "RAP",
  ELETRONICA = "ELETRONICA",
}
