import { BaseApi } from "./base.api";
import type { ApiUser, User } from "./models";

export default class UserApi extends BaseApi {
  path: string = "users";

  getUser(data: User) {
    return this.xior.post<ApiUser>(this.buildPath("upsert"), data);
  }

  deleteUser(id: number) {
    return this.xior.delete(this.buildPath(id));
  }
}
