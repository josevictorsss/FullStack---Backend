export class User {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly email: string,
    public readonly nickname: string,
    public readonly password: string,
    public readonly role: UserRole
  ) {}

  static stringToUserRole(input: string): UserRole {
    switch (input) {
      case "NORMAL":
        return UserRole.NORMAL;
      case "ADMIN":
        return UserRole.ADMIN;
      case "SUBSCRIBER":
        return UserRole.SUBSCRIBER;
      default:
        throw new Error("Invalid user role");
    }
  }

  static toUserModel(user: any): User {
    return new User(
      user.id,
      user.name,
      user.email,
      user.nickname,
      user.password,
      User.stringToUserRole(user.role)
    );
  }
}

export interface UserInputDTO {
  name: string;
  email: string;
  nickname: string;
  password: string;
  role: string;
}

export interface LoginInputDTO {
  email: string;
  password: string;
}

export enum UserRole {
  NORMAL = "NORMAL",
  SUBSCRIBER = "SUBSCRIBER",
  ADMIN = "ADMIN",
}
