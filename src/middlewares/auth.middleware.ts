import type { FastifyReply, FastifyRequest } from "fastify";

import { getTokenByKey } from "../modules/token/token.controller";

export const TOKEN_KEYWORD = "Bearer";

export const tokenAuthMiddleware = async function (
  req: FastifyRequest,
  res: FastifyReply
) {
  const { authorization } = req.headers;
  const values = authorization?.split(" ");

  if (values && values.length > 1) {
    const [_, key] = values;
    const token = await getTokenByKey({ key });

    if (token) {
      req.user = token.user!;
      return;
    }
  }

  return res.status(401).send({
    message: "Not authorized or invalid authtoken",
  });
};
