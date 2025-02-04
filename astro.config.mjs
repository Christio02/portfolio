// @ts-check
import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'astro/config';
import tsconfigPaths from 'vite-tsconfig-paths';

import icon from 'astro-icon';

// https://astro.build/config
export default defineConfig({
	integrations: [icon(), react()],
	vite: {
		plugins: [tailwindcss(), tsconfigPaths()],
		optimizeDeps: {
			include: ['debug']
		},
		ssr: {
			noExternal: ['framer-motion', 'debug']
		}
	}
});
