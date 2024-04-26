import "virtual:uno.css";
import "@unocss/reset/tailwind.css";

import React from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router";
import { createBrowserRouter } from "react-router-dom";
import { TelegramWebAppProvider } from "@telegram-web-app/react";

import "./index.css";

import HomePage from "./app/page";
import Layout from "./components/Layout";
import CreatePage from "./app/create/page";

const container = document.getElementById("root");
const root = createRoot(container!);

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "/create",
        element: <CreatePage />,
      },
    ],
  },
]);

root.render(
  <React.StrictMode>
    <TelegramWebAppProvider>
      <RouterProvider router={router} />
    </TelegramWebAppProvider>
  </React.StrictMode>
);
