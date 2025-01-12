import { ApiImpl } from "./apiImpl";

import type { Task } from "./models/task.model";
import type { Audio } from "./models/audio.model";
import type { Response } from "./models/response.model";

export class GenerateApi extends ApiImpl {
  protected path: string = "/api/v1/generate";

  generate(args: {
    customMode?: boolean;
    instrumental: boolean;
    prompt: string;
    style?: string;
    title?: string | null;
    model?: string;
    callBackUrl?: string;
  }) {
    const data = {
      model: "V3_5",
      ...args,
    }
    return this.axios.post<Response<Task>>(this.buildPath(), data);
  }

  get(args: { taskId: string }) {
    return this.axios.get<Response<Audio>>(this.buildPath("record-info"), {
      params: args,
    });
  }
}
