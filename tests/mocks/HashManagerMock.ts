export const hashManager = {
  hash: jest.fn((password: string) => "hash"),
  compare: jest.fn((text: string, hash: string) =>
    text === "123123" ? true : false
  ),
};
