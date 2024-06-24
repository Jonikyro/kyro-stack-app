/** @type {import("prettier").Config} */
const config = {
	trailingComma: 'none',
	useTabs: true,
	semi: true,
	singleQuote: true,
	jsxSingleQuote: true,
	printWidth: 80,
	plugins: ['prettier-plugin-tailwindcss']
};

export default config;
