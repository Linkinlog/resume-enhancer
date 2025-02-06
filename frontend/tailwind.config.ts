import type { Config } from "tailwindcss";
import tailwindcssAnimate from 'tailwindcss-animate';

export default {
	content: [
		"./pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./components/**/*.{js,ts,jsx,tsx,mdx}",
		"./app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		extend: {
			colors: {
				background: 'var(--background)',
				foreground: 'var(--foreground)',
				primary: 'var(--primary)',
				secondary: 'var(--secondary)'
			},
		}
	},
	plugins: [tailwindcssAnimate],
} satisfies Config;
