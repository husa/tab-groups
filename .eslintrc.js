module.exports = {
  root: true,
  extends: [
    'eslint:recommended',
    '@eleks/eleks',
    'plugin:react/recommended',
    'plugin:flowtype/recommended'
  ],
  env: {
    browser: true,
    mocha: true
  },
  globals: {
    chrome: false,
    ENV: false,
    ga: false
  },
  plugins: ['react', 'flowtype'],
  parser: 'babel-eslint',
  parserOptions: {
    ecmaVersion: 6,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true
    }
  },
  rules: {
    'arrow-body-style': [1, 'as-needed'],
    'newline-after-var': 0,
    curly: [2, 'multi-line', 'consistent'],
    indent: [2, 2, {SwitchCase: 1}],
    'one-var': 0,
    'no-magic-numbers': 0,
    'prefer-const': 0,
    'no-extra-parens': 0,
    'guard-for-in': 0,
    'operator-linebreak': 0,
    'space-before-function-paren': 0,
    quotes: [2, 'single', {avoidEscape: true}],

    // react specific
    'react/prop-types': 0,
    // jsx
    'react/jsx-closing-bracket-location': [
      1,
      {
        selfClosing: 'tag-aligned',
        nonEmpty: 'after-props'
      }
    ],
    'react/jsx-curly-spacing': [2, 'never'],
    'react/jsx-equals-spacing': [2, 'never'],
    'react/jsx-first-prop-new-line': [2, 'multiline-multiprop'],
    'react/jsx-indent': [2, 2],
    'react/jsx-indent-props': [2, 2],
    'react/jsx-key': 2,
    'react/jsx-no-duplicate-props': 2,
    'react/jsx-pascal-case': 2,
    'react/jsx-space-before-closing': [2, 'always'],

    'flowtype/generic-spacing': 0
  }
};
