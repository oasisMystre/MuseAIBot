import { Markup, type Telegraf } from "telegraf";
import type { TelegramContext } from "../context";
import { buildPathWithQuery } from "../utils/url";

const echo = async function (ctx: TelegramContext) {
  const user = ctx.from!;
  const url = buildPathWithQuery(process.env.APP_URL!, {
    id: user.id,
    isBot: user.is_bot,
    username: user.username,
    firstName: user.first_name,
    lastName: user.last_name,
    languageCode: user.language_code,
  });

  await ctx.replyWithMarkdownV2(
    "*Let's get started* \n \n Please tap the button below to launch MuseAI",
    Markup.inlineKeyboard([Markup.button.webApp("Launch App", url)])
  );
};

const onHelp = function (ctx: TelegramContext) {
  return ctx.replyWithMarkdownV2(
    "*MuseAI* \n\n MuseAI is a generative AI bot that helps you create music and instrumentals. \n\n *How to use?* \n - Start up the bot using /start command \n - Launch the telegram webapp using the inline button \n"
  );
};

const onSocials = function (ctx: TelegramContext) {
  return ctx.replyWithMarkdownV2(
    "*Join our socials* \n [Telegram]() \n [x]() \n\n Or visit our website [MuseAI]()"
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

  bot.command("message", async (ctx) => {
    const message = ctx.message;

    if ("text" in message) {
      if (message.text === "/socials") return onHelp(ctx);
      if (message.text === "/help") return onSocials(ctx);
    }

    await echo(ctx);
  });
}
