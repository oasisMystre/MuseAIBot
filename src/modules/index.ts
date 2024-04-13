import type { FastifyInstance } from "fastify";

import { userRoutes } from "./user/user.route";
import { libraryRoutes } from "./library/library.route";

export function registerRoutes(fastify: FastifyInstance) {
  userRoutes(fastify);
  libraryRoutes(fastify);
}
