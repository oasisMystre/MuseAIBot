import {
  defineConfig,
  presetUno,
  presetWind,
  transformerDirectives,
} from "unocss";

export default defineConfig({
  content: {
    filesystem: ["**/*.{html,js,ts,jsx,tsx,vue,svelte,astro}"],
  },
  shortcuts: {
    "input-focus":
      "focus:ring-3 focus:ring-green-300 focus:ring-offset-1 focus:border-green-500",
    "input-border":
      "border border-1 border-stone-700 p-2 bg-transparent rounded-md focus:outline-none focus:outline-none",
  },
  presets: [presetUno(), presetWind()],
  transformers: [transformerDirectives()],
});
