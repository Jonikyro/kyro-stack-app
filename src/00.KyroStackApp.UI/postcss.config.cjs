/* eslint-disable @typescript-eslint/no-var-requires */
const postcssGlobalData = require('@csstools/postcss-global-data');

const config = {
	plugins: [
		require('postcss-nested'),
		require('postcss-import'),
		postcssGlobalData({
			files: ['src/styles/media.css']
		}),
		require('postcss-custom-media')
	]
};

module.exports = config;
