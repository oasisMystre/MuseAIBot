import type { OpenAI } from "openai";

export default class {
  constructor(private readonly openai: OpenAI) {}

  async generateLyrics(content: string) {
    const chat = await this.openai.chat.completions.create({
      messages: [
        {
          role: "system",
          content:
            "Please write song lyrics using the following format for sections: [verse], [chorus], [bridge], and [outro]. Do not use numbering (e.g., no (Verse 1), (Chorus 2), etc.). Provide a title and the lyrics as separate outputs.",
        },
        {
          role: "user",
          content: content,
        },
      ],
      model: "gpt-4",
    });

    return chat.choices.map((choice) => {
      const content = choice.message.content;

      if (content) {
        const titleMatch = content.match(/^Title:\s*"(.*?)"/);
        const title = titleMatch
          ?.at(0)
          ?.replace(/^Title:\s*\\?"(.*?)\\?"$/, "$1");
        const text = content.slice(titleMatch?.at(0)?.length);

        return { title, text, status: choice.finish_reason };
      }
      return null;
    });
  }
}
