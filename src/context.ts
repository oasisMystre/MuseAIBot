import type { z } from "zod";
import { Context } from "telegraf";

import type { selectUsersSchema } from "./schema";

export class TelegramContext extends Context {
  user!: z.infer<typeof selectUsersSchema>;

  setUser(user: z.infer<typeof selectUsersSchema>) {
    this.user = user;
  }
}
