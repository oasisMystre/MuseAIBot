import { z } from "zod";

export const LyricBody = z.object({
    prompt: z.string().trim()
})