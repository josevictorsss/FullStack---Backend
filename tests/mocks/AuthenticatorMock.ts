import { UserRole } from "../../src/model/User";

export const authenticator = {
  generateToken: jest.fn(
    (payload: { id: string; role: UserRole }) => "token"
  ),
  getData: jest.fn((token: string) => {
    switch (token) {
      case "userToken":
        return { id: "id", role: "NORMAL" };
      case "adminToken":
        return { id: "id", role: "ADMIN" };
      case "subscriberToken":
        return { id: "id", role: "SUBSCRIBER" };
      default:
        return undefined;
    }
  }),
};
