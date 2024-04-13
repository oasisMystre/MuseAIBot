import { createContext, useMemo } from "react";
import { Api } from "../lib/api";
import { useAuth } from "../composables/useAuth";

type ApiContextParams = {
  instance: Api | null;
};

export const ApiContext = createContext<ApiContextParams>({
  instance: null,
});

export default function ApiProvider({ children }: React.PropsWithChildren) {
  const { token } = useAuth();
  const instance = useMemo(() => new Api(token.key), [token.key]);

  return (
    <ApiContext.Provider value={{ instance }}>{children}</ApiContext.Provider>
  );
}
