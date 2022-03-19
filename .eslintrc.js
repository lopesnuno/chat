module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    'sourceType': 'module',
    'ecmaVersion': 9,
    'project': './tsconfig.json'
  },
  plugins: [
    '@typescript-eslint',
    'jest',
    'import'
  ],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'plugin:import/recommended'
  ],
  rules: {
    quotes: [2, 'single', { avoidEscape: true }],
    semi: 1,
    'object-curly-spacing': [1, 'always'],
    'comma-dangle': [1, 'never'],
    'comma-spacing': [2],
    // 'no-console': [1, { allow: ['warn', 'error'] }],
    'newline-after-var': ['error', 'always'],
    // enforces consistent use of function declarations or expressions
    // 'func-style': ['error', 'declaration'],
    'eol-last': ['error'],
    'no-multiple-empty-lines': ['error', { max: 2, maxEOF: 0 }],
    'curly': ['error'],
    'no-undef': 'error',
    'prefer-const': 'error',

    '@typescript-eslint/adjacent-overload-signatures': 'error',
    '@typescript-eslint/ban-ts-ignore': 'error',
    '@typescript-eslint/ban-types': 'error',
    '@typescript-eslint/camelcase': 'error',
    '@typescript-eslint/class-name-casing': 'error',
    '@typescript-eslint/consistent-type-assertions': 'error',
    '@typescript-eslint/interface-name-prefix': 'error',
    '@typescript-eslint/no-array-constructor': 'error',
    '@typescript-eslint/no-empty-function': 'error',
    '@typescript-eslint/no-empty-interface': 'error',
    '@typescript-eslint/no-inferrable-types': 'error',
    '@typescript-eslint/no-misused-new': 'error',
    '@typescript-eslint/no-namespace': 'error',
    '@typescript-eslint/no-this-alias': 'error',
    '@typescript-eslint/no-unused-vars': ['error'],
    '@typescript-eslint/no-use-before-define': 'off',
    '@typescript-eslint/no-var-requires': 'error',
    '@typescript-eslint/prefer-namespace-keyword': 'error',
    '@typescript-eslint/prefer-includes': 'off',
    '@typescript-eslint/require-await': 'off',
    '@typescript-eslint/triple-slash-reference': 'error',
    '@typescript-eslint/type-annotation-spacing': 'error',

    'import/prefer-default-export': 'error',
    'import/first': 'error',
    'import/exports-last': 'error',
    'import/newline-after-import': 'error',
    'import/order': ['error', { groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'], 'newlines-between': 'always-and-inside-groups' }],
    'import/no-unresolved': 'error',
    'import/no-dynamic-require': 'error',
    'import/no-self-import': 'error',
    'import/no-cycle': 'error',
    'import/no-useless-path-segments': 'error',
    'import/no-mutable-exports': 'error',
    'import/no-named-as-default': [0]
  },
  env: {
    browser: true,
    es6: true,
    node: true,
    jest: true
  },

  'settings': {
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx']
    },
    'import/resolver': {
      'typescript': {
        'alwaysTryTypes': true, // always try to resolve types under `<root>@types` directory even it doesn't contain any source code, like `@types/unist`
        'project': '.',
      }
    }
  }
}
