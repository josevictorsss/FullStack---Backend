import { User } from "../../src/model/User";

export const userDatabase = {
  createUser: jest.fn(async (user: User) => {}),
};
