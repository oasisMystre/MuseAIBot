import axios, { AxiosInstance } from "axios";
import * as AxiosLogger from "axios-logger";

import { GenerateApi } from "./generate.api";

export class Suno {
  private readonly axios: AxiosInstance;
  readonly generate: GenerateApi;

  constructor(apiKey: string = process.env.SUNO_API_KEY!) {
    this.axios = axios.create({
      baseURL: "https://apibox.erweima.ai",
      headers: {
        Authorization: "Bearer " + apiKey,
      },
    });

    this.axios.interceptors.response.use(
      AxiosLogger.responseLogger,
      AxiosLogger.errorLogger,
    );

    this.generate = new GenerateApi(this.axios);
  }

  private static suno: Suno;

  static readonly instance = (() => {
    if (this.suno) return this.suno;
    this.suno = new Suno();

    return this.suno;
  })();
}
