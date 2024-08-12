import "dotenv/config";
import { sunoApi } from "../src/lib";

async function main() {
  const suno = await sunoApi;
  console.log(
    await suno.generate("Any music lol")
  );
  // console.log(await suno.generateLyrics("Lyrics about a soldier going to battle"));
}

main().catch(console.log);
