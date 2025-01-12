import { BaseApi } from "./base.api";

import { sleep } from "../utils/sleep";

import type { Paginate } from "./models/paginate";
import type { CreateLibrary, Library } from "./models";

export default class LibraryApi extends BaseApi {
  path: string = "libraries";

  getLibraries() {
    return this.xior.get<Paginate<Library>>(this.buildPath("explore"));
  }

  getUserLibraries() {
    return this.xior.get<Paginate<Library>>(this.path);
  }

  getLibrary(id: Library["id"]) {
    return this.xior.get<Library>(this.buildPath(id));
  }

  createLibrary(data: CreateLibrary) {
    return this.xior.post<Library>(this.path, data);
  }

  updateLibrary(id: number, data: Partial<Omit<Library, "id">>) {
    return this.xior.patch<Library>(this.buildPath(id), data);
  }

  deleteLibrary(id: number) {
    return this.xior.delete<Library>(this.buildPath(id));
  }

  async createAndWaitForLibrary(data: CreateLibrary) {
    const {
      data: { id },
    } = await this.createLibrary(data);

    const wrapper = async (
      id: string,
      duration: number,
      attempt: number,
    ): Promise<Library> => {
      await sleep(duration);

      const { data } = await this.getLibrary(id);

      if (attempt > 15) return data;

      switch (data.status) {
        case "idle":
          return wrapper(id, duration + 5000, attempt + 1);
        case "complete":
        case "text":
        case "first":
          return data;
      }

      return data;
    };

    return wrapper(id, 0, 0);
  }
}
