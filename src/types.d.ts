import type { selectUsersSchema } from "./schema";

declare module "fastify" {
  export interface FastifyRequest {
    user: Zod.infer<typeof selectUsersSchema>;
  }

  export interface FastifyInstance {
    authenticate: any;
  }
}

