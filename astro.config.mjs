// @ts-check
import { defineConfig } from "astro/config";

import tailwindcss from "@tailwindcss/vite";

import icon from "astro-icon";

import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
    site: "https://www.aaravjuneja.com",
    server: { allowedHosts: ["workhorse"] },
    vite: {
        plugins: [tailwindcss()],
        server: {
            allowedHosts: ["workhorse"],
            // watch: {
            //     usePolling: true,
            // },
        },
    },
    markdown: {
        // Both palettes ship as CSS variables; markdown.css picks one per theme.
        shikiConfig: {
            themes: { light: "github-light", dark: "github-dark" },
            defaultColor: false,
        },
    },
    integrations: [
        icon(),
        // Blog is hidden for now: keep it out of the sitemap.
        sitemap({ filter: (page) => !page.includes("/blog") }),
    ],
});
