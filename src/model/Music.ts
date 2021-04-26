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
}

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
