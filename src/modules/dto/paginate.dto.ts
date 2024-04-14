import { z } from "zod";

export const paginateSchema = z.object({
  offset: z.number().default(0),
  limit: z.number().default(24),
});
