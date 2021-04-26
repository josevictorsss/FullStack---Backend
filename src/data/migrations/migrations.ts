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
        password VARCHAR(255) NOT NULL,
        role VARCHAR(255) NOT NULL DEFAULT "NORMAL" 
      );
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
