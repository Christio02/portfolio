// @ts-check
import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';
import icon from 'astro-icon';
import { defineConfig } from 'astro/config';
import path from 'path';
import tsconfigPaths from 'vite-tsconfig-paths';

// https://astro.build/config
export default defineConfig({
	integrations: [icon(), react()],
	vite: {
		plugins: [tailwindcss(), tsconfigPaths()],
		resolve: {
			alias: {
				'@': path.resolve('./src')
			}
		},
		ssr: {
			noExternal: ['framer-motion', 'debug']
		}
	}
});
