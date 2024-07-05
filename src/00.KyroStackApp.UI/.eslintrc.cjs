module.exports = {
	root: true,
	env: { browser: true, es2020: true, node: true },
	extends: [
		'eslint:recommended',
		'plugin:@typescript-eslint/recommended',
		'plugin:react-hooks/recommended',
		'eslint-config-prettier'
	],
	ignorePatterns: ['dist', '.eslintrc.cjs'],
	parser: '@typescript-eslint/parser',
	plugins: ['react-refresh', '@tanstack/query'],
	rules: {
		'react-refresh/only-export-components': [
			'warn',
			{ allowConstantExport: true }
		],
		'no-restricted-imports': [
			'error',
			{
				paths: [
					{
						name: 'react-router-dom',
						importNames: ['Link', 'NavLink'],
						message:
							'Use the `Link` component inside src/components/link instead'
					}
				]
			}
		],
		'@typescript-eslint/ban-types': [
			'error',
			{
				types: {
					'{}': false
				},
				extendDefaults: true
			}
		]
	}
};
