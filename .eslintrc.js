module.exports = {
	root: true,
	env: {
		node: true
	},
	extends: ['plugin:vue/essential', 'eslint:recommended', 'plugin:prettier/recommended'],
	parserOptions: {
		parser: '@babel/eslint-parser',
		requireConfigFile: false
	},
	rules: {
		'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
		'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
		'vue/multi-word-component-names': 'off',
		'prettier/prettier': [
			'error',
			{
				semi: false,
				singleQuote: true,
				trailingComma: 'none',
				endOfLine: 'auto',
				printWidth: 140
			}
		]
	}
}
