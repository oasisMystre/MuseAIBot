import { BaseApi } from "./base.api";
import type { CreateLibrary, Library, LibraryAndAudioInfo } from "./models";

export default class LibraryApi extends BaseApi {
  path: string = "libraries";

  getLibraries() {
    return this.xior.get<LibraryAndAudioInfo[]>(this.path);
  }

  getLibrary(id: number) {
    return this.xior.get<LibraryAndAudioInfo>(this.buildPath(this.buildPath, id));
  }

  createLibrary(data: CreateLibrary) {
    return this.xior.post<LibraryAndAudioInfo[]>(this.path, data);
  }

  updateLibrary(id: number, data: Partial<Omit<Library, "id">>) {
    return this.xior.patch<Library>(this.buildPath(this.buildPath, id), data);
  }

  deleteLibrary(id: number) {
    return this.xior.delete<Library>(this.buildPath(this.buildPath, id));
  }
}
