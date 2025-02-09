import { viteTranslationPlugin } from '@resourge/react-translations/viteTranslationPlugin';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import path from 'path';
import checker from 'vite-plugin-checker';
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer';
import svgrPlugin from 'vite-plugin-svgr';
import tsconfigPaths from 'vite-tsconfig-paths';
import Unfonts from 'unplugin-fonts/vite';

export default defineConfig(() => {
	return ({
		plugins: [
			react({
				babel: {
				  parserOpts: {
					plugins: ['decorators', 'classProperties'],
				  },
				},
			  }), 
			tsconfigPaths(),
			svgrPlugin(),
			checker({
				typescript: true,
				enableBuild: true,
				eslint: {
					lintCommand: 'eslint "./src/**/*.{ts,tsx}"'
				},
				overlay: {
					initialIsOpen: false
				}
			}),
			viteTranslationPlugin(),
			ViteImageOptimizer({
				webp: {
					quality: 80
				}
			}),
			Unfonts({
				google: {
					preconnect: true,
					display: 'swap',
					families: [
						{
							name: 'Sora',
							styles: 'wght@100;200;300;400;500;600;700;800;900',
							defer: true
						}
					],
				},
			}),
		],
		resolve: {
			alias: {
				src: path.resolve(__dirname, './src/')
			}
		},
	});
});