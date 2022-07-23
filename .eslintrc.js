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
    'no-console': [1, { allow: ['warn', 'error'] }],
    'padding-line-between-statements': [
      'error',
      { blankLine: 'always', prev: ['const', 'let', 'var'], next: '*' },
      { blankLine: 'any', prev: ['const', 'let', 'var'], next: ['const', 'let', 'var'] }
    ],    // enforces consistent use of function declarations or expressions
    // 'func-style': ['error', 'declaration'],
    'eol-last': ['error'],
    'no-multiple-empty-lines': ['error', { max: 2, maxEOF: 0 }],
    'curly': ['error'],
    'no-undef': 'error',
    'prefer-const': 'error',
    'jsx-quotes': ['error', 'prefer-double'],

    '@typescript-eslint/adjacent-overload-signatures': 'error',
    '@typescript-eslint/naming-convention': [
      'error',
      {
        'selector': 'variableLike',
        format: ['camelCase', 'StrictPascalCase', 'UPPER_CASE'],
        leadingUnderscore: 'allow'
      }
    ],
    '@typescript-eslint/consistent-type-assertions': 'error',
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

    'import/prefer-default-export': 'off',
    'import/exports-last': 'off',

    'import/first': 'error',
    'import/newline-after-import': 'error',
    'import/order': ['error', {
      groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
      'newlines-between': 'always-and-inside-groups'
    }],
    'import/no-unresolved': 'error',
    'import/no-dynamic-require': 'error',
    'import/no-self-import': 'error',
    'import/no-cycle': 'error',
    'import/no-useless-path-segments': 'error',
    'import/no-mutable-exports': 'error',
    'import/no-named-as-default': [0],
    'import/no-named-as-default-member': [0],

    '@typescript-eslint/ban-ts-comment': 'warn',


    '@typescript-eslint/ban-types': 'warn',
    '@typescript-eslint/no-misused-promises': 0,
    '@typescript-eslint/no-unsafe-call': 0,
    '@typescript-eslint/no-unsafe-argument': 'warn',
    '@typescript-eslint/no-unsafe-assignment': 0,
    '@typescript-eslint/no-unsafe-member-access': 0,
    '@typescript-eslint/no-unsafe-return': 0,
    '@typescript-eslint/restrict-template-expressions': 0
  },
  env: {
    browser: true,
    es6: true,
    node: true,
    jest: true
  },

  'settings': {
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx', '.js']
    },
    'import/resolver': {
      'typescript': {
        'alwaysTryTypes': true, // always try to resolve types under `<root>@types` directory even it doesn't contain any source code, like `@types/unist`
        'project': './src',
      }
    }
  }
}
