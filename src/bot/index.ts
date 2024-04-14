import { Markup, type Telegraf } from "telegraf";
import type { TelegramContext } from "../context";
import { buildPathWithQuery } from "../utils/url";

export const echo = async function (ctx: TelegramContext) {
  const user = ctx.from!;
  const url = buildPathWithQuery(process.env.APP_URL!, {
    id: user.id,
    isBot: user.is_bot,
    username: user.username,
    firstName: user.first_name,
    lastName: user.last_name,
    languageCode: user.language_code,
  });

  console.log(url);

  await ctx.replyWithMarkdownV2(
    "*Let's get started* \n \n Please tap the button below to launch MuseAI",
    Markup.inlineKeyboard([Markup.button.webApp("Launch App", url)])
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
      if (message.text === "/socials") return;
      if (message.text === "/help") return;
    }

    await echo(ctx);
  });
}
