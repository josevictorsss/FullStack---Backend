import { UserDatabase } from "../data/UserDatabase";
import { BaseError } from "../error/BaseError";
import { LoginInputDTO, User, UserInputDTO } from "../model/User";
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

  public login = async (input: LoginInputDTO) => {
    try {
      const { email, password } = input;
      if (!email || !password) {
        throw new BaseError("Please, fill the fields email and password", 422);
      }
      if (email.indexOf("@") === -1) {
        throw new BaseError("Invalid email format", 422);
      }
      const userFromDB = await this.userDatabase.login(email);
      if (!userFromDB) {
        throw new BaseError("Invalid credentials", 401);
      }
      const hashCompare = await this.hashManager.compare(
        password,
        userFromDB.password
      );
      if (!hashCompare) {
        throw new BaseError("Invalid credentails", 401);
      }
      const acessToken = this.authenticator.generateToken({
        id: userFromDB.id,
        role: userFromDB.role,
      });
      return acessToken;
    } catch (error) {
      throw new BaseError(error.message || error.sqlMessage, error.statusCode);
    }
  };
}

export { UserBusiness };
