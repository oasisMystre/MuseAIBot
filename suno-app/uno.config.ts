import {
  defineConfig,
  presetUno,
  presetWind,
  presetWebFonts,
  presetTypography,
  transformerDirectives,
} from "unocss";

export default defineConfig({
  content: {
    filesystem: ["**/*.{html,js,ts,jsx,tsx,vue,svelte,astro}"],
  },
  shortcuts: {
    "input-focus":
      "ring-3 ring-white ring-offset-1 border-white",
    "input-border":
      "border border-1 border-stone-700 p-2 bg-transparent rounded-md focus:outline-none focus:outline-none",
  },
  presets: [
    presetUno(),
    presetWind(),
    presetTypography(),
    presetWebFonts({
      provider: "google",
      fonts: {
        sans: "Poppins",
      },
    }),
  ],
  transformers: [transformerDirectives()],
});
