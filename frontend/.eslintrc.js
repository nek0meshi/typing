module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
  },
  extends: ['eslint:recommended', 'prettier'],
  parserOptions: {
    ecmaVersion: 'latest',
    extraFileExtensions: ['.vue'],
    parser: '@typescript-eslint/parser',
    tsconfigRootDir: __dirname,
    project: ['./tsconfig.json'],
    sourceType: 'module',
  },
  plugins: ['vue', '@typescript-eslint'],
  rules: {},
  overrides: [
    {
      files: ['**/.eslintrc.js'],
      env: {
        node: true,
      },
    },
    {
      files: ['**/*.vue'],
      parser: 'vue-eslint-parser',
      extends: [
        'plugin:vue/vue3-recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:@typescript-eslint/recommended-requiring-type-checking',
      ],
    },
    {
      files: ['**/*.ts'],
      parser: '@typescript-eslint/parser',
      extends: [
        'plugin:@typescript-eslint/recommended',
        'plugin:@typescript-eslint/recommended-requiring-type-checking',
      ],
    },
  ],
}
