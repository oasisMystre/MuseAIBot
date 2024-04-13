import { Outlet } from "react-router";
import { Provider } from "react-redux";

import { store } from "../store";
import LayoutHeader from "./LayoutHeader";
import AuthProvider from "../providers/AuthProvider";

export default function Layout() {
  return (
    <main className="fixed inset-0 flex flex-col bg-black text-white overflow-y-scroll">
      <div className="flex-1 flex flex-col bg-gradient-to-b from-green/10 to-black overflow-y-scroll">
        <Provider store={store}>
          <AuthProvider>
            <LayoutHeader className="lt-md:order-last" />
            <div className="flex-1 flex  lt-md:order-first overflow-y-scroll">
              <Outlet />
            </div>
          </AuthProvider>
        </Provider>
      </div>
    </main>
  );
}
