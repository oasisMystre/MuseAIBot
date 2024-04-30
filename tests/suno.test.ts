import "dotenv/config";
import { sunoApi } from "../src/lib";

async function main() {
  const suno = await sunoApi;
  // console.log(
  //   await suno.get(["9b4ac230-c3b7-48da-b888-ee357048b49b"])
  // );
  console.log(await suno.generateLyrics("Lyrics about a soldier going to battle"));
}

main().catch(console.log);
