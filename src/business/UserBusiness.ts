import { UserDatabase } from "../data/UserDatabase";
import { BaseError } from "../error/BaseError";
import { User, UserInputDTO } from "../model/User";
import { Authenticator } from "../services/Authenticator";
import { HashManager } from "../services/HashManager";
import { IdGenerator } from "../services/IdGenerator";

class UserBusiness {
  constructor(
    private idGenerator: IdGenerator,
    private authenticator: Authenticator,
    private hashManager: HashManager,
    private userDatabase: UserDatabase
  ) {}

  public signup = async (input: UserInputDTO) => {
    try {
      const { name, email, nickname, password, role } = input;
      const userRole = User.stringToUserRole(role);
      if (!name || !email || !nickname || !password || !role) {
        throw new BaseError("Invalid parameters to signup", 422);
      }
      if (email.indexOf("@") === -1) {
        throw new BaseError("Invalid email format", 422);
      }
      if (password.length < 6) {
        throw new BaseError(
          "'Password' must contain at leats 6 characters",
          422
        );
      }

      const id = this.idGenerator.generate();

      const hashPassword = await this.hashManager.hash(password);

      const newUser = new User(
        id,
        name,
        email,
        nickname,
        hashPassword,
        userRole
      );

      await this.userDatabase.signup(newUser);

      const acessToken = this.authenticator.generateToken({
        id,
        role: role,
      });

      return acessToken;
    } catch (error) {
      throw new BaseError(error.message || error.sqlMessage, error.statusCode);
    }
  };
}

export { UserBusiness };
