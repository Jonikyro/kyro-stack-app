import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';
import VitePluginInjectPreload from 'vite-plugin-inject-preload';

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		react(),
		VitePluginInjectPreload({
			files: [
				{
					match: /[a-z-0-9]*\.svg$/
				}
			]
		})
	],
	resolve: {
		alias: {
			'@': path.resolve(__dirname, './src')
		}
	},
	build: {
		outDir: path.join(__dirname, '../../ProdFiles')
	}
});
