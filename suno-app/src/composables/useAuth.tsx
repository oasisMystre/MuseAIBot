import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";
import { ApiUser } from "../lib/api/models";

export function useAuth() {
  return useContext(AuthContext) as unknown as ApiUser;
}
