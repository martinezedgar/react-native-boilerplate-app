module.exports = {
  root: true,
  env: {
    jest: true,
  },
  globals: {
    JSX: 'readonly',
  },
  extends: ['@react-native', 'eslint:recommended'],
  rules: {
    'jsx-quotes': 0,
  },
};
