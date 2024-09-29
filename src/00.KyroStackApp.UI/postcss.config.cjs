/** @type {import('postcss-load-config').Config} */
const config = {
	plugins: [
		require('tailwindcss'),
		require('tailwindcss/nesting'),
		require('autoprefixer'),
		require('postcss-nested'),
		require('postcss-import')
	]
};

module.exports = config;
