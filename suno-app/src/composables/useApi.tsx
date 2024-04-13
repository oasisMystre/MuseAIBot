import { useContext } from "react";
import { ApiContext } from "../providers/ApiProvider";

export function useApi() {
  return useContext(ApiContext).instance!;
}
