import { UserDatabase } from "../data/UserDatabase";
import { BaseError } from "../error/BaseError";
import {
  LoginInputDTO,
  User,
  UserInputDTO,
  UserOutputDTO,
} from "../model/User";
import { Authenticator } from "../services/Authenticator";
import { HashManager } from "../services/HashManager";
import { IdGenerator } from "../services/IdGenerator";
import transporter from "../services/sendMailService";
import fs from "fs";
import handlebars from "handlebars";
import { resolve } from "path";

class UserBusiness {
  constructor(
    private idGenerator: IdGenerator,
    private authenticator: Authenticator,
    private hashManager: HashManager,
    private userDatabase: UserDatabase
  ) {}

  public signup = async (input: UserInputDTO): Promise<UserOutputDTO> => {
    try {
      const { name, email, nickname, password } = input;
      if (!name || !email || !nickname || !password) {
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
      const newUser = new User(id, name, email, nickname, hashPassword);
      await this.userDatabase.signup(newUser);
      const acessToken = this.authenticator.generateToken({
        id,
      });
      const user = {
        id,
        email,
        nickname,
      };
      return { acessToken, user };
    } catch (error) {
      throw new BaseError(error.message || error.sqlMessage, error.statusCode);
    }
  };

  public login = async (input: LoginInputDTO): Promise<UserOutputDTO> => {
    try {
      const { email, password } = input;
      if (!email || !password) {
        throw new BaseError("Please, fill the fields email and password", 422);
      }
      if (email.indexOf("@") === -1) {
        throw new BaseError("Invalid email format", 422);
      }
      const userFromDB = await this.userDatabase.getUserByEmail(email);
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
      const user = {
        id: userFromDB.id,
        email: userFromDB.email,
        nickname: userFromDB.nickname,
      };

      const acessToken = this.authenticator.generateToken({
        id: userFromDB.id,
      });
      return { acessToken, user };
    } catch (error) {
      throw new BaseError(error.message || error.sqlMessage, error.statusCode);
    }
  };

  public updatePassword = async (email: string): Promise<void> => {
    try {
      if (!email) {
        throw new BaseError("Please provide an email", 422);
      }
      const user = await this.userDatabase.getUserByEmail(email);
      if (!user) {
        throw new BaseError("User doens't exist", 404);
      }
      const characters: string = "0123456789abcdefABCDEF@#-*";
      let newPassword: string = "";
      for (let i = 0; i < 12; i++) {
        const randomIndex: number = Math.floor(
          Math.random() * characters.length
        );
        newPassword += characters[randomIndex];
      }
      const hashPassword: string = await this.hashManager.hash(newPassword);
      const result = await this.userDatabase.resetPassword(email, hashPassword);
      const npsPath = resolve(
        __dirname,
        "..",
        "views",
        "emails",
        "sendMail.hbs"
      );

      const variables = {
        password: newPassword,
        name: user.name,
      };

      const templateFileContent = fs.readFileSync(npsPath).toString("utf8");

      const mailTemplateParse = handlebars.compile(templateFileContent);

      const mailHtml = mailTemplateParse(variables);

      const mailer = await transporter.sendMail({
        from: `Labefy <${process.env.NODEMAILER_USER}`,
        to: email,
        subject: "Sua senha do Labefy",
        html: mailHtml,
      });
      return result;
    } catch (error) {
      throw new BaseError(error.message || error.sqlMessage, error.statusCode);
    }
  };
}

export { UserBusiness };
