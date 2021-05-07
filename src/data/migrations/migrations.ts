import { BaseDatabase } from "../BaseDatabase";

class Migrations extends BaseDatabase {
  public migrations = async (): Promise<void> => {
    try {
      await this.getConnection().raw(`
      CREATE TABLE IF NOT EXISTS Labefy_Users (
        id VARCHAR(255) PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        nickname VARCHAR(255)  NOT NULL,
        password VARCHAR(255) NOT NULL
      );

      CREATE TABLE IF NOT EXISTS Labefy_Music (
        id VARCHAR(255) PRIMARY KEY,
        title VARCHAR (255) NOT NULL,
        author VARCHAR(255) NOT NULL,
        date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        file VARCHAR(255) NOT NULL,
        album VARCHAR(255) NOT NULL,
        user_id VARCHAR(255) NOT NULL,
        FOREIGN KEY (user_id) REFERENCES Labefy_Users(id)
      );

      CREATE TABLE IF NOT EXISTS Labefy_Genre (
        id VARCHAR(255) PRIMARY KEY,
        type VARCHAR(255) NOT NULL
      );

      CREATE TABLE IF NOT EXISTS Labefy_MusicGenre (
        music_id VARCHAR(255) NOT NULL,
        genre_id VARCHAR(255) NOT NULL,
        FOREIGN KEY(music_id) REFERENCES Labefy_Music(id),
        FOREIGN KEY(genre_id) REFERENCES Labefy_Genre(id)
      );
      
      CREATE TABLE IF NOT EXISTS Labefy_Playlist(
        id VARCHAR(255) PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        subtitle VARCHAR(255) NOT NULL,
        date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        user_id VARCHAR(255) NOT NULL,
        FOREIGN KEY (user_id) REFERENCES Labefy_Users(id)
      );

      CREATE TABLE IF NOT EXITS Labefy_PlaylistMusic (
        playlist_id VARCHAR(255) NOT NULL,
        music_id VARCHAR(255) NOT NULL,
        FOREIGN KEY(playlist_id) REFERENCES Labefy_Playlist,
        FOREIGN KEY(music_id) REFERENCES Labefy_Music(id)
      )
      `);

      console.log("Tables created.");

      this.getConnection().destroy();
    } catch (error) {
      console.log(error.sqlMessage || error.message);
      this.getConnection().destroy();
    }
  };
}

new Migrations().migrations();
