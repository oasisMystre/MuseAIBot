import { XiorInstance } from "xior";

export class XiorInjection {
  constructor(protected xior: XiorInstance) {}
}

export abstract class BaseApi extends XiorInjection {
  abstract path: string;

  buildPath(...path: any[]) {
    return this.path+ "/" + path.join("/");
  }

  buildQueryString(query: Record<string, string>) {
    const q = new URLSearchParams(query);
    return q;
  }

  buildPathWithQueryString(path: string, q: string) {
    return path + "?" + q;
  }
}
