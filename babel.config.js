module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    'nativewind/babel',
    [
      'module-resolver',
      {
        root: ['.'],
        extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
        alias: {
          '@store': './src/store',
          '@services': './src/services',
          '@screens': './src/screens',
          '@navigation': './src/navigation',
          '@utils': './utils',
        },
      },
    ],
  ],
};
