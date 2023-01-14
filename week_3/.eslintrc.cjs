/* eslint-env node */

module.exports = {
  root: true,
  extends: ['plugin:vue/vue3-essential', 'eslint:recommended', 'standard', '@vue/prettier'],
  rules: {
    semi: ['error', 'always'],
    'no-console': 'off'
  },
  parserOptions: {
    ecmaVersion: 'latest'
  }
};
