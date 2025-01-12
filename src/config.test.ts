import "dotenv/config";
import OpenAI from "openai";
import { openai } from "./config";
import { Suno } from "./lib";

(async () => {
  // const openai = new OpenAI({
  //   apiKey: process.env.OPENAI_API_KEY,
  // });
  // console.log("generating");
  // const chat = await openai.chat.completions.create({
  //   messages: [
  //     {
  //       role: "system",
  //       content:
  //         "Please write song lyrics using the following format for sections: [verse], [chorus], [bridge], and [outro]. Do not use numbering (e.g., no (Verse 1), (Chorus 2), etc.). Provide a title and the lyrics as separate outputs.",
  //     },
  //     {
  //       role: "user",
  //       content:
  //         "Create Lyrics about love, using upbeat language and a catchy chorus",
  //     },
  //   ],
  //   model: "gpt-4",
  // });

  // console.dir(
  //   chat.choices.map((choice) => {
  //     const content = choice.message.content;

  //     if (content) {
  //       const titleMatch = content.match(/^Title:\s*"(.*?)"/);
  //       const title = titleMatch
  //         ?.at(0)
  //         ?.replace(/^Title:\s*\\?"(.*?)\\?"$/, "$1");
  //       const text = content.slice(titleMatch?.at(0)?.length);

  //       return { title, text, status: choice.finish_reason };
  //     }
  //     return null;
  //   }),
  // );
  //
  // const generate = await Suno.instance.generate
  //   .generate({
  //     customMode: true,
  //     instrumental: true,
  //     prompt: "A calm and relaxing piano track.",
  //     style: "Jazz",
  //     title: "Relaxing Piano",
  //     model: "V3_5",
  //     callBackUrl: "https://museai.free.beeceptor.com",
  //   })
  //   .then(({ data }) => data);
  // console.dir(generate.data.taskId);
  // const audio = await Suno.instance.generate.get({
  //   taskId: "d32cf49c731f53ac35cd1358c3d6a48d",
  // }).then(({ data }) => data);

  // console.dir(audio.data.response.sunoData);
})();
