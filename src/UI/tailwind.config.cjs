/** @type {import('tailwindcss').Config} */
export default {
	content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
	theme: {
		extend: {
			textColor: {
				'on-primary': 'var(--color-on-primary)',
				'on-primary-container': 'var(--color-on-primary-container)',
				'on-secondary': 'var(--color-on-secondary)',
				'on-secondary-container': 'var(--color-on-secondary-container)',
				'on-tertiary': 'var(--color-on-tertiary)',
				'on-tertiary-container': 'var(--color-on-tertiary-container)',
				'on-surface': 'var(--color-on-surface)',
				'on-surface-variant': 'var(--color-on-surface-variant)',
				muted: 'var(--color-text-muted)'
			},
			backgroundColor: {
				primary: 'var(--color-primary)',
				'primary-container': 'var(--color-primary-container)',
				secondary: 'var(--color-secondary)',
				'secondary-container': 'var(--color-secondary-container)',
				tertiary: 'var(--color-tertiary)',
				'tertiary-container': 'var(--color-tertiary-container)',
				surface: 'var(--color-surface)',
				'surface-dim': 'var(--color-surface-dim)',
				'surface-bright': 'var(--color-surface-bright)',
				'surface-container-lowest': 'var(--color-surface-container-lowest)',
				'surface-container-low': 'var(--color-surface-container-low)',
				'surface-container': 'var(--color-surface-container)',
				'surface-container-high': 'var(--color-surface-container-high)',
				'surface-container-highest': 'var(--color-surface-container-highest)'
			}
		}
	},
	corePlugins: {
		preflight: false
	},
	plugins: []
};
