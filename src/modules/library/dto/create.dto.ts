import { z } from "zod";

export const createDto = z.object({
  prompt: z.string(),
  instrumental: z.boolean(),
  title: z.string().nullish().nullable(),
  isCustom: z.boolean().nullish().nullable(),
  tags: z.array(z.string()).nullish().nullable(),
});
