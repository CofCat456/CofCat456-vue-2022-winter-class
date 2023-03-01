module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true
  },
  extends: [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    'airbnb-base',
    'plugin:prettier/recommended'
  ],
  overrides: [],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  settings: {
    'import/resolver': {
      alias: {
        map: [['@', './src']],
        extensions: ['.js', '.vue']
      }
    },
    'import/core-modules': ['vite', '@vitejs/plugin-vue']
  },
  plugins: ['vue'],
  rules: {
    semi: ['error', 'always'],
    'no-console': 'off',
    'vue/multi-word-component-names': 'off'
  }
};
