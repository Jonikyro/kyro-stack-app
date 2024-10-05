/* eslint-disable @typescript-eslint/no-var-requires */
const plugin = require('tailwindcss/plugin');

/**
 * Add both `focus:` and `hover:` styles with `hocus:`.
 *
 * @example
 * ```tsx
 * <button className='hocus:bg-blue-900 hocus:text-white'>Increment</button>
 * ```
 *
 * @param {import('tailwindcss/types/config').PluginAPI}
 */
const hocusPlugin = ({ addVariant }) => {
	addVariant('hocus', ['&:hover', '&:focus']);
};

/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
	theme: {
		// prettier-ignore
		extend: {
			fontFamily: {
				'heading': ['Kameron', 'Kameron Fallback'],
				'sub-heading': ['Sub-Heading', 'Sub-Heading-Fallback'],
				'regular': ['Regular', 'Regular-Fallback']
			},
			colors: {
				'primary': 'rgb(var(--_clr-primary) / <alpha-value>)',
				'on-primary': 'rgb(var(--_clr-on-primary) / <alpha-value>)',
				'primary-container': 'rgb(var(--_clr-primary-container) / <alpha-value>)',
				'on-primary-container': 'rgb(var(--_clr-on-primary-container) / <alpha-value>)',

				'secondary': 'rgb(var(--_clr-secondary) / <alpha-value>)',
				'on-secondary': 'rgb(var(--_clr-on-secondary) / <alpha-value>)',
				'secondary-container': 'rgb(var(--_clr-secondary-container) / <alpha-value>)',
				'on-secondary-container': 'rgb(var(--_clr-on-secondary-container) / <alpha-value>)',

				'tertiary': 'rgb(var(--_clr-tertiary) / <alpha-value>)',
				'on-tertiary': 'rgb(var(--_clr-on-tertiary) / <alpha-value>)',
				'tertiary-container': 'rgb(var(--_clr-tertiary-container) / <alpha-value>)',
				'on-tertiary-container': 'rgb(var(--_clr-on-tertiary-container) / <alpha-value>)',

				'surface': 'rgb(var(--_clr-surface) / <alpha-value>)',
				'on-surface': 'rgb(var(--_clr-on-surface) / <alpha-value>)',
				'surface-dim': 'rgb(var(--_clr-surface-dim) / <alpha-value>)',
				'surface-bright': 'rgb(var(--_clr-surface-bright) / <alpha-value>)',

				'surface-container': 'rgb(var(--_clr-surface-container) / <alpha-value>)',
				'surface-container-low': 'rgb(var(--_clr-surface-container-low) / <alpha-value>)',
				'surface-container-lowest': 'rgb(var(--_clr-surface-container-lowest) / <alpha-value>)',
				'surface-container-high': 'rgb(var(--_clr-surface-container-high) / <alpha-value>)',
				'surface-container-highest': 'rgb(var(--_clr-surface-container-highest) / <alpha-value>)',

				'outline': 'rgb(var(--_clr-outline) / <alpha-value>)',
				'outline-variant': 'rgb(var(--_clr-outline-variant) / <alpha-value>)',
				
				'error': 'rgb(var(--_clr-error) / <alpha-value>)',
				'on-error': 'rgb(var(--_clr-on-error) / <alpha-value>)'
			},
			borderRadius: {
				'none': '0',
				'sm': 'var(--_border-radius-sm)',
				'DEFAULT': 'var(--_border-radius-base)',
				'md': 'var(--_border-radius-md)',
				'lg': 'var(--_border-radius-lg)',
				'xl': 'var(--_border-radius-xl)',
				'2xl': 'var(--_border-radius-2xl)',
				'3xl': 'var(--_border-radius-3xl)'
			},
			boxShadow: {
				'sm': 'var(--_elevation-1)',
				'DEFAULT': 'var(--_elevation-2)',
				'md': 'var(--_elevation-3)',
				'lg': 'var(--_elevation-4)',
				'xl': 'var(--_elevation-5)',
				'2xl': 'var(--_elevation-6)'
			},
			margin: {
				/* https://blog.kizu.dev/cap-height-align/ (Can-I-Use 85% at the time of coding) */
				'capex': 'calc(1ex - 1cap)'
			}
		}
	},
	corePlugins: {
		// Tailwinds own "reset.css" won't be injected.
		// If this is set to true, you might want to delete the 'src/styles/reset.css'.
		preflight: false
	},
	plugins: [plugin(hocusPlugin)]
};
