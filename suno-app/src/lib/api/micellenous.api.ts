import { BaseApi } from "./base.api";
import { Lyrics } from "./models/micellenous.model";

export class MicellenousApi extends BaseApi {
  path = "micellenous";

  generateLyrics(prompt: string) {
    return this.xior.post<Lyrics[]>(this.buildPath(this.path, "lyrics"), { prompt });
  }
}
