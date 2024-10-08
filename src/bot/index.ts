import { Markup, type Telegraf } from "telegraf";
import type { TelegramContext } from "../context";

import { readFileSync } from "../utils/text";
import { buildPathWithQuery } from "../utils/url";
import { APP_URL } from "../config";

const echo = async function (ctx: TelegramContext) {
  const user = ctx.from ?? ctx.myChatMember?.from;
  if (user) {
    const url = buildPathWithQuery(APP_URL, {
      id: user.id,
      isBot: user.is_bot,
      username: user.username,
      firstName: user.first_name,
      lastName: user.last_name,
      languageCode: user.language_code,
    });

    return await ctx.replyWithMarkdownV2(
      readFileSync("./src/bot/locales/en/start.md"),
      Markup.inlineKeyboard([Markup.button.webApp("Launch App", url)])
    );
  }

  await ctx.reply(
    "Invalid telegram user",
    Markup.inlineKeyboard([
      Markup.button.url("Contact Support", "https://t.me/MuseAICrypto"),
    ])
  );
};

const onHelp = function (ctx: TelegramContext) {
  return ctx.replyWithMarkdownV2(readFileSync("./src/bot/locales/en/help.md"));
};

const onSocials = function (ctx: TelegramContext) {
  return ctx.replyWithMarkdownV2(
    readFileSync("./src/bot/locales/en/socials.md", "utf-8")
  );
};

export default function registerBot(bot: Telegraf<TelegramContext>) {
  bot.start(echo);

  bot.telegram.setMyCommands([
    {
      command: "start",
      description: "Use /start to update the bot to the latest version",
    },
    {
      command: "help",
      description: "Show MuseAI help",
    },
    {
      command: "socials",
      description: "Show our social media handles and website",
    },
  ]);

  bot.command("socials", onSocials);
  bot.command("help", onHelp);
}
