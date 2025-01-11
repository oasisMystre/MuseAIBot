
import { Context } from "telegraf";

import type { selectUsersSchema } from "./schema";

export class TelegramContext extends Context {
  user!: Zod.infer<typeof selectUsersSchema>;
}
