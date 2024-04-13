import "virtual:uno.css";
import "@unocss/reset/tailwind.css";

import React from "react";
import { createRoot } from "react-dom/client";

import "./index.css";
import App from "./App";
import { RouterProvider } from "react-router";
import { createBrowserRouter } from "react-router-dom";
import CreatePage from "./app/create/page";
import LibraryPage from "./app/library/page";
import HomePage from "./app/page";
import Layout from "./components/Layout";

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
      {
        path: "/library",
        element: <LibraryPage />,
      },
    ],
  },
]);

root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
