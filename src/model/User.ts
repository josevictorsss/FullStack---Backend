export class User {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly email: string,
    public readonly nickname: string,
    public readonly password: string
  ) {}

  static toUserModel(user: any): User {
    return new User(
      user.id,
      user.name,
      user.email,
      user.nickname,
      user.password
    );
  }
}

export interface UserInputDTO {
  name: string;
  email: string;
  nickname: string;
  password: string;
}

export interface LoginInputDTO {
  email: string;
  password: string;
}
