import xior, { XiorInstance } from "xior";

import UserApi from "./user.api";
import LibraryApi from "./library.api";
import { MicellenousApi } from "./micellenous.api";

export class Api {
  xior: XiorInstance;
  user: UserApi;
  library: LibraryApi;
  micellenousApi: MicellenousApi;

  constructor(accessToken?: string) {
    this.xior = xior.create({
      baseURL: import.meta.env.VITE_APP_API_BASE_URL!,
      headers: {
        Authorization: accessToken ? "Bearer " + accessToken : undefined,
      },
    });

    this.user = new UserApi(this.xior);
    this.library = new LibraryApi(this.xior);
    this.micellenousApi = new MicellenousApi(this.xior);
  }
}
