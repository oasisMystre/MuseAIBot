import path from "path";
import { AxiosInstance } from "axios";

export abstract class ApiImpl {
  protected abstract path: string;

  constructor(protected readonly axios: AxiosInstance) {}

  protected buildPath(...values: string[]) {
    console.log(values.reduce((a, b) => path.join(a, b), this.path));
    return values.reduce((a, b) => path.join(a, b), this.path);
    
  }
  
  protected buildPathWithQueryString(path: string, query: Record<string, string>){
    const q = new URLSearchParams(query);
    return path + "?" + q.toString();
  }
}
