import type { Config } from 'tailwindcss'

const config: Config = {
	content: [
		//
		'./app/**/*.{js,ts,jsx,tsx,mdx}',
		'./components/**/*.{js,ts,jsx,tsx,mdx}',
		'./lib/**/*.{js,ts,jsx,tsx,mdx}',
		// Flowbite
		'./node_modules/flowbite/**/*.js',
	],
	theme: {},
	darkMode: 'media',
	plugins: [
		//
		require('@tailwindcss/typography'),
		require('@tailwindcss/forms'),
		require('flowbite/plugin'),
	],
}
export default config
