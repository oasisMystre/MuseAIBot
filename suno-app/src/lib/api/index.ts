import xior, { XiorInstance } from "xior";

import UserApi from "./user.api";
import LibraryApi from "./library.api";

export class Api {
  xior: XiorInstance;
  user: UserApi;
  library: LibraryApi;

  constructor(accessToken?: string) {
    this.xior = xior.create({
      baseURL: import.meta.env.API_BASE_URL,
      headers: {
        Authorization: accessToken ? "Bearer " + accessToken : undefined,
      },
    });

    this.user = new UserApi(this.xior);
    this.library = new LibraryApi(this.xior);
  }
}
