import { Markup, type Telegraf } from "telegraf";
import type { TelegramContext } from "../context";

export const echo = async function (ctx: TelegramContext) {
  await ctx.replyWithMarkdownV2(
    "*Let's get started* \n \n Please tap the button below to launch suno",
    Markup.inlineKeyboard([
      Markup.button.webApp("Launch App", process.env.APP_URL!),
    ])
  );
};

export default function registerBot(bot: Telegraf<TelegramContext>) {
  bot.start(echo);
  bot.command("message", echo);
}
