import { z } from "zod";

export const createDto = z.object({
  prompt: z.string(),
  customMode: z.boolean(),
  instrumental: z.boolean(),
  title: z.string().nullish().nullable(),
  tags: z.array(z.string()).nullish().nullable(),
});
