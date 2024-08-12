import "dotenv/config";
import fastify from "fastify";
import cors from "@fastify/cors";
import { session, Telegraf } from "telegraf";

import registerBot from "./bot";
import { registerRoutes } from "./modules";
import type { TelegramContext } from "./context";

import { getOrCreateUser } from "./modules/user/user.controller";
import { tokenAuthMiddleware } from "./middlewares/auth.middleware";
import { HOST, PORT, TELEGRAM_ACCESS_TOKEN } from "./config";

type MainParams = {
  accessToken: string;
  port: number;
  host: string;
};

export async function main({ host, port, accessToken }: MainParams) {
  const app = fastify({
    logger: true,
    ignoreTrailingSlash: true,
    ignoreDuplicateSlashes: true,
  });

  app.register(cors, {
    origin: "*",
  });

  app.decorate("authenticate", tokenAuthMiddleware);

  const bot = new Telegraf<TelegramContext>(accessToken);

  bot.use(session());

  bot.use(async (ctx, next) => {
    const from = ctx.message!.from;
    
    const [user] = await getOrCreateUser({
      id: from.id.toString(),
      username: from.username,
      firstName: from.first_name,
      lastName: from.last_name,
    });
    ctx.user = user;

    return next();
  });

  const longRunProcess: Promise<any>[] = [];

  if ("RENDER_EXTERNAL_HOSTNAME" in process.env) {
    const webhook = await bot.createWebhook({
      domain: process.env.RENDER_EXTERNAL_HOSTNAME!,
    });

    app.post(`/telegraf/${bot.secretPathComponent()}`, webhook as any);
  } else {
    longRunProcess.push(bot.launch().then(() => console.log("Bot running...")));
  }

  registerBot(bot);
  registerRoutes(app);

  process.once("SIGINT", () => bot.stop("SIGINT"));
  process.once("SIGTERM", () => bot.stop("SIGTERM"));

  longRunProcess.push(
    app
      .listen({ port, host })
      .then(() => console.log(`app listening at port ${port}`))
  );

  await Promise.all(longRunProcess);
}

main({
  host: HOST,
  port: PORT,
  accessToken: TELEGRAM_ACCESS_TOKEN,
}).catch(console.log);
