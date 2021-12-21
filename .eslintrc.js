module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2021: true
  },
  extends: ["plugin:vue/essential", "plugin:@typescript-eslint/recommended", "standard", "plugin:storybook/recommended"],
  parserOptions: {
    ecmaVersion: 12,
    parser: '@typescript-eslint/parser'
  },
  plugins: ['vue', '@typescript-eslint', 'eslint-plugin-tsdoc'],
  rules: {
    'tsdoc/syntax': 'warn'
  }
};