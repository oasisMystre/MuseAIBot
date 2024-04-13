import type { z } from "zod";
import type { selectUsersSchema } from "./schema";

declare module "fastify" {
  export interface FastifyRequest {
    user: z.infer<typeof selectUsersSchema>;
  }

  export interface FastifyInstance {
    authenticate: any;
  }
}
