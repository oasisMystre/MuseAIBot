import { BaseApi } from "./base.api";

import { sleep } from "../utils/sleep";

import type { Paginate } from "./models/paginate";
import type { CreateLibrary, Library } from "./models";

export default class LibraryApi extends BaseApi {
  path: string = "libraries";

  getLibraries() {
    return this.xior.get<Paginate<Library>>(
      this.buildPath(this.path, "explore"),
    );
  }

  getUserLibraries() {
    return this.xior.get<Paginate<Library>>(this.path);
  }

  getLibrary(id: Library["id"]) {
    return this.xior.get<Library>(this.buildPath(this.buildPath, id));
  }

  createLibrary(data: CreateLibrary) {
    return this.xior.post<Library>(this.path, data);
  }

  updateLibrary(id: number, data: Partial<Omit<Library, "id">>) {
    return this.xior.patch<Library>(this.buildPath(this.buildPath, id), data);
  }

  deleteLibrary(id: number) {
    return this.xior.delete<Library>(this.buildPath(this.buildPath, id));
  }

  async createAndWaitForLibrary(
    data: CreateLibrary,
    callback?: (audios: Library) => void,
  ) {
    const {
      data: { id },
    } = await this.createLibrary(data);

    const wrapper = async (id: string, duration: number): Promise<Library> => {
      sleep(duration);

      const { data } = await this.getLibrary(id);
      switch (data.status) {
        case "text":
          return wrapper(id, duration + 5000);
        case "first":
          if (callback) callback(data);
          return wrapper(id, duration + 5000);
        case "complete":
          return data;
      }

      return data;
    };

    return wrapper(id, 0);
  }
}
