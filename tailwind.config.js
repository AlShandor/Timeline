/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		"./pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./components/**/*.{js,ts,jsx,tsx,mdx}",
		"./app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		extend: {
			fontFamily: {
				satoshi: ["Satoshi", "sans-serif"],
				inter: ["Inter", "sans-serif"],
				noto: ["NotoSans", "sans-serif"],
			},
			colors: {
				"primary-blue": "#04AEEF",
				"primary-green": "#18C964",
				"selected-green": "#E1F6DD",
				"primary-orange": "#EF4504",
				"primary-purple": "#9455D3",
				"remove-red": "#CC0001",
			},
			backgroundImage: {
				"arrow-svg": "url('/icons/arrow.svg')",
			},
		},
	},
	plugins: [],
};
