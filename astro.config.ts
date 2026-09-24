import { defineConfig, fontProviders } from "astro/config";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";
import { site } from "./src/data/site";

// O domínio vem de src/data/site.ts (campo `url`).
export default defineConfig({
  site: site.url,
  // URLs sem barra no final (/cambio-dsg) e páginas geradas como arquivos .html.
  // Vercel (cleanUrls em vercel.json) e Netlify servem essas URLs sem o ".html".
  trailingSlash: "never",
  build: {
    format: "file",
    // CSS embutido no HTML: evita uma requisição que bloqueia a renderização.
    inlineStylesheets: "always",
  },
  integrations: [
    sitemap({
      filter: (page) => !page.includes("/404"),
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
  // Fontes hospedadas no próprio site (arquivos do pacote @fontsource).
  // O Astro gera fontes de fallback com métricas ajustadas, o que evita
  // o "pulo" do texto quando a fonte carrega.
  fonts: [
    {
      provider: fontProviders.local(),
      name: "Barlow Condensed",
      cssVariable: "--font-barlow-condensed",
      fallbacks: ["Arial Narrow", "sans-serif"],
      options: {
        variants: [
          {
            src: ["@fontsource/barlow-condensed/files/barlow-condensed-latin-600-normal.woff2"],
            weight: 600,
            style: "normal",
          },
          {
            src: ["@fontsource/barlow-condensed/files/barlow-condensed-latin-700-normal.woff2"],
            weight: 700,
            style: "normal",
          },
        ],
      },
    },
    {
      provider: fontProviders.local(),
      name: "Barlow",
      cssVariable: "--font-barlow",
      fallbacks: ["sans-serif"],
      options: {
        variants: [
          {
            src: ["@fontsource/barlow/files/barlow-latin-400-normal.woff2"],
            weight: 400,
            style: "normal",
          },
          {
            src: ["@fontsource/barlow/files/barlow-latin-500-normal.woff2"],
            weight: 500,
            style: "normal",
          },
        ],
      },
    },
    {
      provider: fontProviders.local(),
      name: "JetBrains Mono",
      cssVariable: "--font-jetbrains-mono",
      fallbacks: ["monospace"],
      options: {
        variants: [
          {
            src: ["@fontsource/jetbrains-mono/files/jetbrains-mono-latin-500-normal.woff2"],
            weight: 500,
            style: "normal",
          },
        ],
      },
    },
  ],
});
