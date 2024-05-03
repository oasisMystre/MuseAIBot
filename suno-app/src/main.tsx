import "virtual:uno.css";
import "@unocss/reset/tailwind.css";

import React from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router";
import { createBrowserRouter } from "react-router-dom";

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
    <h1 className="text-4xl bg-red text-white p-4">Hello On Top Of router</h1>
    <RouterProvider router={router} />
  </React.StrictMode>
);
