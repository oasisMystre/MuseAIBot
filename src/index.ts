import "dotenv/config";
import fastify from "fastify";
import { session, Telegraf } from "telegraf";

import { registerRoutes } from "./modules";
import type { TelegramContext } from "./context";
import registerBot from "./bot";
import { tokenAuthMiddleware } from "./middlewares/auth.middleware";

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

  app.decorate("authenticate", tokenAuthMiddleware);

  const bot = new Telegraf<TelegramContext>(accessToken);

  bot.use(session());

  // bot.use(async (ctx, next) => {
  //   const from = ctx.message!.from;

  //   // ctx.setUser(
  //   //   await getOrCreateUser(db, {
  //   //     id: from.id,
  //   //     username: from.username,
  //   //     firstName: from.first_name,
  //   //     lastName: from.last_name,
  //   //   })
  //   // );

  //   return next();
  // });

  // const webhook = await bot.createWebhook({
  //   domain: process.env.RENDER_EXTERNAL_HOSTNAME!,
  // });

  // app.post(`/telegraf/${bot.secretPathComponent()}`, webhook as any);

  registerBot(bot);
  registerRoutes(app);

  process.once("SIGINT", () => bot.stop("SIGINT"));
  process.once("SIGTERM", () => bot.stop("SIGTERM"));

  await Promise.all([
    // bot.launch().then(() => console.log("Bot running...")),
    app
      .listen({ port, host })
      .then(() => console.log(`app listening at port ${port}`)),
  ]);
}

main({
  host: process.env.HOST!,
  port: Number(process.env.PORT!),
  accessToken: process.env.TELEGRAM_ACCESS_TOKEN!,
}).catch(console.log);
