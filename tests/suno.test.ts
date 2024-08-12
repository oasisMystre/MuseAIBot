import "dotenv/config";
import { sunoApi } from "../src/lib";

async function main() {
  const suno = await sunoApi;
  console.log(
    await suno.get("667f6dd3-0efd-44e5-8015-8839b6bcc16c","667f6dd3-0efd-44e5-8015-8839b6bcc16c")
  );
  // console.log(await suno.generateLyrics("Lyrics about a soldier going to battle"));
}

main().catch(console.log);
