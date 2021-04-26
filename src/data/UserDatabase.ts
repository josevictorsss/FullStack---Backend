import { User } from "../model/User";
import { BaseDatabase } from "./BaseDatabase";

export class UserDatabase extends BaseDatabase {
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
        .into(this.tableNames.users);
    } catch (error) {
      throw new Error(error.message || error.sqlMessage);
    }
  };

  public getUserByEmail = async (email: string): Promise<User> => {
    try {
      const result = await this.getConnection()
        .select("*")
        .from(this.tableNames.users)
        .where({ email });
      return User.toUserModel(result[0]);
    } catch (error) {
      throw new Error(error.message || error.sqlMessage);
    }
  };
}

export default new UserDatabase();
