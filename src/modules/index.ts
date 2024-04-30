import type { FastifyInstance } from "fastify";

import { userRoutes } from "./user/user.route";
import { libraryRoutes } from "./library/library.route";
import { micellenousRoutes } from "./micellenous/micellenous.controller";

export function registerRoutes(fastify: FastifyInstance) {
  userRoutes(fastify);
  libraryRoutes(fastify);
  micellenousRoutes(fastify);
}
