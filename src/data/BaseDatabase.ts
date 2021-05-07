import knex from "knex";
import Knex from "knex";
import dotenv from "dotenv";

dotenv.config();

export abstract class BaseDatabase {
  private static connection: Knex | null = null;

  protected tableNames = {
    users: "Labefy_Users",
    musics: "Labefy_Music",
    genre: "Labefy_Genre",
    musicGenre: "Labefy_MusicGenre",
    playlists: "Labefy_Playlist",
    playlistMusics: "Labefy_PlaylistMusic",
  };

  public getConnection(): Knex {
    if (!BaseDatabase.connection) {
      BaseDatabase.connection = knex({
        client: "mysql",
        connection: {
          host: process.env.DB_HOST,
          port: 3306,
          user: process.env.DB_USER,
          password: process.env.DB_PASSWORD,
          database: process.env.DB_SCHEMA,
        },
      });
    }

    return BaseDatabase.connection;
  }

  public static async destroyConnection(): Promise<void> {
    if (BaseDatabase.connection) {
      await BaseDatabase.connection.destroy();
      BaseDatabase.connection = null;
    }
  }
}
