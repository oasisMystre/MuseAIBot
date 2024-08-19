export type Token = {
  key: string;
};

export type User = {
  id: number;
  username: string;
  firstName: string;
  lastName: string;
  quota: number;
};

export type ApiUser = {
  user: User;
  token: Token;
};
