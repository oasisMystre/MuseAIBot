import { TokenBase, TokenGenerator } from "ts-token-generator";

export const tokenGenerator = new TokenGenerator({
  bitSize: 256,
  baseEncoding: TokenBase.BASE36,
});
