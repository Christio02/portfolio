/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		screens: {
			mobile: '0px',
			tablet: '640px',
			// => @media (min-width: 640px) { ... }
			laptop: '1200px',
			desktop: '1600px'
		},
		extend: {}
	},
	plugins: []
};
