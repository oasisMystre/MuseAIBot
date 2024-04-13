import { BaseApi } from "./base.api";
import type { Library } from "./models";

export default class LibraryApi extends BaseApi {
  path: string = "libraries";

  getLibraries() {
    return this.xior.get<Library[]>(this.path);
  }

  getLibrary(id: number) {
    return this.xior.get<Library>(this.buildPath(this.buildPath, id));
  }

  createLibrary(data: Omit<Library, "id">) {
    return this.xior.post<Library>(this.path, data);
  }

  updateLibrary(id: number, data: Partial<Omit<Library, "id">>) {
    return this.xior.patch<Library>(this.buildPath(this.buildPath, id), data);
  }

  deleteLibrary(id: number) {
    return this.xior.delete<Library>(this.buildPath(this.buildPath, id));
  }
}
