import { UserBusiness } from "../src/business/UserBusiness";
import { authenticator } from "./mocks/AuthenticatorMock";
import { idGenerator } from "./mocks/IdGeneratorMock";
import { userDatabase } from "./mocks/UserDatabaseMock";
import { hashManager } from "./mocks/HashManagerMock";

const userBusiness = new UserBusiness(
  idGenerator as any,
  authenticator as any,
  hashManager as any,
  userDatabase as any
);

describe("Signup", () => {
  test("Error when name is blank", async () => {
    expect.assertions(2);
    const newUser = {
      name: "",
      email: "jose@gmail.com",
      nickname: "José",
      password: "123456789",
    };
    try {
      await userBusiness.signup(newUser);
    } catch (error) {
      expect(error.statusCode).toBe(422);
      expect(error.message).toBe("Invalid parameters to signup");
    }
  });
  test("Error when email is invalid", async () => {
    expect.assertions(2);
    try {
      const newUser = {
        name: "José",
        email: "josegmail.com",
        nickname: "José",
        password: "123456789",
      };
      await userBusiness.signup(newUser);
    } catch (error) {
      expect(error.statusCode).toBe(422);
      expect(error.message).toBe("Invalid email format");
    }
  });
  test("Error when password is invalid", async () => {
    expect.assertions(2);
    try {
      const newUser = {
        name: "José",
        email: "josevictortf@gmail.com",
        nickname: "José",
        password: "1",
      };
      await userBusiness.signup(newUser);
    } catch (error) {
      expect(error.statusCode).toBe(422);
      expect(error.message).toBe(
        "'Password' must contain at leats 6 characters"
      );
    }
  });
});

describe("Login", () => {
  test("Error when some field is blank", async () => {
    expect.assertions(2);
    const newUser = {
      email: "",
      password: "123456789",
    };
    try {
      await userBusiness.login(newUser);
    } catch (error) {
      expect(error.statusCode).toBe(422);
      expect(error.message).toBe("Please, fill the fields email and password");
    }
  });
});
