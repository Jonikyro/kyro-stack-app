import tailwindcss from '@tailwindcss/vite';
import { tanstackRouter } from '@tanstack/router-plugin/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import UnpluginInjectPreload from 'unplugin-inject-preload/vite';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		tanstackRouter({ target: 'react', autoCodeSplitting: true }),
		react(),
		tailwindcss(),
		UnpluginInjectPreload({
			files: [
				{
					outputMatch: /[a-z-0-9]*\.woff2$/,
					attributes: {
						type: 'font/woff2',
						as: 'font',
						crossorigin: 'anonymous'
					}
				},
				{ outputMatch: /[a-z-0-9]*\.svg$/ }
			],
			injectTo: 'head-prepend'
		})
	],
	resolve: { alias: { '@': path.resolve(__dirname, './src') } }
});
