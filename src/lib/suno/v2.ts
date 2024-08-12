import axios, { AxiosInstance } from "axios";
import { AudioInfo } from "./model";

type GenerateArgs = {
  tags?: string | null;
  title?: string | null;
  prompt: string;
  wait_audio?: boolean | null;
  make_instrumental?: boolean;
};

export class SunoApi {
  axios: AxiosInstance;

  constructor(accessToken: string) {
    this.axios = axios.create({
      baseURL: "https://api.aimlapi.com",
      headers: {
        Authorization: "Bearer " + accessToken,
      },
    });
  }

  async generate({
    wait_audio = true,
    make_instrumental = false,
    ...data
  }: GenerateArgs) {
    return this.axios
      .post<AudioInfo[]>("/generate", {
        ...data,
        wait_audio,
        make_instrumental,
      })
      .then(({ data }) => data);
  }

  async get(...id: string[]) {
    return this.axios
      .get<AudioInfo[]>("?ids[0]=" + id.join(","))
      .then(({ data }) => data);
  }
}
