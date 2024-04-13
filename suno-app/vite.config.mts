import { defineConfig } from "vite";
import React from "@vitejs/plugin-react";

export default defineConfig(async () => {
  const { default: UnoCSS } = await import("unocss/vite");
  return {
    plugins: [UnoCSS(), React()],
  };
});
