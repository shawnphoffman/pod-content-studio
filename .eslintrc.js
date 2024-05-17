module.exports = {
	extends: ['@shawnphoffman/eslint-config', 'next/core-web-vitals'],
	plugins: ['react'],
	rules: {
		'react/no-unescaped-entities': 'warn',
	},
	// overrides: {
	// 	files: ['**/*.ts', '**/*.tsx'],
	// },
}
