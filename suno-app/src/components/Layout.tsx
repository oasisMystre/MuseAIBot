import "react-toastify/dist/ReactToastify.css";

import { useEffect } from "react";
import { Outlet } from "react-router";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import { useTelegramWebApp } from "@telegram-web-app/react";

import { store } from "../store";
import AuthProvider from "../providers/AuthProvider";
import PlayerProvider from "../providers/PlayerProvider";

import Player from "./Player";
import LayoutHeader from "./LayoutHeader";

export default function Layout() {
  const Telegram = useTelegramWebApp();

  useEffect(() => {
    Telegram.WebApp.expand();
  }, []);

  return (
    <main className="fixed inset-0 flex flex-col bg-black text-white overflow-y-scroll font-sans">
      <div className="flex-1 flex flex-col bg-gradient-to-b from-black/10 to-black overflow-y-scroll">
        <Provider store={store}>
          <AuthProvider>
            <PlayerProvider>
              <LayoutHeader />
              <div className="flex-1 flex  overflow-y-scroll">
                <Outlet />
                <ToastContainer />
              </div>
              <Player />
            </PlayerProvider>
          </AuthProvider>
        </Provider>
      </div>
    </main>
  );
}
