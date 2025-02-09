module.exports = {
	extends: ['resourge/react'],
	"rules": {
	  "@typescript-eslint/no-non-null-assertion": "off",
	  "@typescript-eslint/no-unsafe-argument": "off"
	},
	parserOptions: {
		parser: '@typescript-eslint/parser',
		project: './tsconfig.json',
		tsconfigRootDir: __dirname,
	  },
};
