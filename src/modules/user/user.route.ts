import type { z } from "zod";
import type { FastifyInstance, FastifyRequest } from "fastify";

import { deleteUser, getOrCreateUser } from "./user.controller";
import {
  insertUsersSchema,
  selectUsersSchema,
  getUsersSchema,
} from "../../schema";
import { getTokenByUserId } from "../token/token.controller";
import { getUserLibrariesCountToday } from "../library/library.controller";

async function upsertUserRoute(
  req: FastifyRequest<{ Body: z.infer<typeof insertUsersSchema> }>
) {
  const body = req.body;
  body.id = body.id.toString();

  const values = await insertUsersSchema.parseAsync(body);
  const [user] = await getOrCreateUser(values);
  const [token] = await getTokenByUserId({
    userId: user.id,
  });
  const quota = await getUserLibrariesCountToday(user.id);

  return {
    user: {
      ...user,
      quota,
    },
    token,
  };
}

async function deleteUserRoute(
  req: FastifyRequest<{ Params: z.infer<typeof selectUsersSchema> }>
) {
  const params = req.params;
  const values = await getUsersSchema.parseAsync(params);
  return await deleteUser(values);
}

export function userRoutes(fastify: FastifyInstance) {
  fastify.route({
    method: "POST",
    url: "/users/upsert/",
    handler: (
      req: FastifyRequest<{ Body: z.infer<typeof insertUsersSchema> }>
    ) => upsertUserRoute(req),
  });

  fastify.route({
    method: "DELETE",
    url: "/users/:id/",
    preHandler: fastify.authenticate,
    handler: (
      req: FastifyRequest<{ Params: z.infer<typeof selectUsersSchema> }>
    ) => deleteUserRoute(req),
  });
}
