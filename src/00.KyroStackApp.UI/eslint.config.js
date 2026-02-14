import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { fixupPluginRules } from '@eslint/compat';
import { FlatCompat } from '@eslint/eslintrc';
import js from '@eslint/js';
import reactRefresh from 'eslint-plugin-react-refresh';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const compat = new FlatCompat({
	baseDirectory: __dirname,
	recommendedConfig: js.configs.recommended,
	allConfig: js.configs.all
});

export default [
	{
		ignores: ['dist', 'routeTree.gen.ts', '**/*.cjs']
	},
	...compat.extends(
		'eslint:recommended',
		'plugin:@typescript-eslint/recommended',
		'plugin:react-hooks/recommended',
		'plugin:@tanstack/eslint-plugin-query/recommended',
		'plugin:@tanstack/eslint-plugin-router/recommended',
		'eslint-config-prettier'
	),
	{
		files: ['**/*.{ts,tsx}'],
		plugins: {
			'react-refresh': fixupPluginRules(reactRefresh)
		},
		rules: {
			'react-hooks/exhaustive-deps': 'warn',
			'react-refresh/only-export-components': [
				'warn',
				{ allowConstantExport: true }
			],
			'no-restricted-imports': [
				'error',
				{
					paths: [
						{
							name: '@tanstack/react-router',
							importNames: ['Link'],
							message:
								'Use the `Link` component inside src/components/link instead'
						}
					]
				}
			],
			'@typescript-eslint/no-empty-object-type': 'off'
		}
	}
];
