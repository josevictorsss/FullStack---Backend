import { Genre } from "../../model/Music";
import { BaseDatabase } from "../BaseDatabase";

const genres: Genre[] = [
  { id: "1", type: "TRAP" },
  { id: "2", type: "ELETRONICA" },
  { id: "3", type: "RAP" },
  { id: "4", type: "SERTANEJO" },
  { id: "5", type: "POP" },
  { id: "6", type: "PAGODE" },
  { id: "7", type: "FUNK" },
  { id: "8", type: "ROCK" },
];

class Populate extends BaseDatabase {
  public populate = async (): Promise<void> => {
    try {
      await this.getConnection().insert(genres).into(this.tableNames.genre);
      console.log("Table populated.");
    } catch (error) {
      console.log(error.message);
    } finally {
      this.getConnection().destroy();
    }
  };
}

new Populate().populate();
