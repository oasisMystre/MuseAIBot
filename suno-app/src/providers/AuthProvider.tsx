import { createContext, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import { Api } from "../lib/api";
import type { ApiUser, User } from "../lib/api/models";

import ApiProvider from "./ApiProvider";
import Protected from "../components/Protected";
import { LoadingState } from "../store/types";
import { arrayToRecord } from "../lib/utils/object";

export type AuthContext = ApiUser & {
  setUser: React.Dispatch<React.SetStateAction<ApiUser["user"]>>;
};

export const AuthContext = createContext<Partial<AuthContext>>({
  user: undefined,
  token: undefined,
});

export default function AuthProvider({ children }: React.PropsWithChildren) {
  const api = new Api();
  const [searchParams] = useSearchParams();

  const [apiUser, setApiUser] = useState<ApiUser | null>(null);
  const [loadingState, setLoadingState] =
    useState<LoadingState["loadingState"]>("idle");
  const user = arrayToRecord<User>(Array.from(searchParams.entries()));
  user.id = Number(user.id);

  useEffect(() => {
    setLoadingState("pending");

    api.user
      .getUser(user)
      .then(({ data }) => {
        setLoadingState("success");
        setApiUser(data);
      })
      .catch(() => setLoadingState("failed"));
  }, []);

  return loadingState === "success" ? (
    apiUser && (
      <AuthContext.Provider
        value={{
          ...apiUser,
          setUser: (value) =>
            setApiUser((apiUser) => {
              if (apiUser)
                apiUser.user =
                  typeof value === "function" ? value(apiUser.user) : value;
              return apiUser;
            }),
        }}
      >
        <ApiProvider>{children}</ApiProvider>
      </AuthContext.Provider>
    )
  ) : ["idle", "pending"].includes(loadingState) ? (
    <div className="m-auto w-8 h-8 border-3 border-white rounded-full border-t-transparent animate-spin"></div>
  ) : (
    <Protected />
  );
}
