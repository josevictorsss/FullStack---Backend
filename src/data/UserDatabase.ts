import { User } from "../model/User";
import { BaseDatabase } from "./BaseDatabase";

export class UserDatabase extends BaseDatabase {
  private static tableName = "Labefy_Users";

  public signup = async (user: User): Promise<void> => {
    try {
      await this.getConnection()
        .insert({
          id: user.id,
          name: user.name,
          email: user.email,
          nickname: user.nickname,
          password: user.password,
          role: user.role,
        })
        .into(UserDatabase.tableName);
    } catch (error) {
      throw new Error(error.message || error.sqlMessage);
    }
  };
}
