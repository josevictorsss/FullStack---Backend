export class Playlist {
  constructor(
    public readonly id: string,
    public readonly title: string,
    public readonly subtitle: string,
    public readonly createdAt: string,
    public readonly userId: string
  ) {}

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
