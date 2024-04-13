export type Token = {
  key: string;
};

export type User = {
  id: number;
  username: string;
  firstName: string;
  lastName: string;
};

export type ApiUser = {
  user: User;
  token: Token;
};
