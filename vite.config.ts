import tailwindcss from "@tailwindcss/vite";
import { devtools } from "@tanstack/devtools-vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import { defineConfig } from "vite";

import { cloudflare } from "@cloudflare/vite-plugin";

const config = defineConfig({
	resolve: {
		tsconfigPaths: true,
	},
	plugins: [devtools(), tailwindcss(), tanstackStart({
        prerender: {
            enabled: true,
            crawlLinks: true,
            autoStaticPathsDiscovery: true,
            concurrency: 2,
            retryCount: 2,
            retryDelay: 1000,
            maxRedirects: 5,
            failOnError: true,
        },
        sitemap: {
            enabled: true,
            host: "example.com", // fix later
        },
    }), viteReact({
        babel: {
            plugins: ["babel-plugin-react-compiler"],
        },
    }), cloudflare({
        viteEnvironment: {
            name: "ssr"
        }
    })],
});

export default config;