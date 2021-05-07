import { Music } from "./Music";

export class Playlist {
  constructor(
    public readonly id: string,
    public readonly title: string,
    public readonly subtitle: string,
    public readonly createdAt: string,
    public readonly userId: string,
    private musics?: Music[]
  ) {}

  public getMusics = () => this.musics;
  public setMusics = (musics: Music[]) => {
    this.musics = musics;
  };

  static toPlaylistModel = (playlist: any) => {
    return new Playlist(
      playlist.id,
      playlist.title,
      playlist.subtitle,
      playlist.date,
      playlist.user_id
    );
  };
}

export interface PlaylistInputDTO {
  title: string;
  subtitle: string;
}
