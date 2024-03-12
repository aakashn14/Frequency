module.exports = {
  preset: 'jest-expo',
  testEnvironment: 'node',
  moduleFileExtensions: ['js', 'json', 'jsx', 'ts', 'tsx', 'node'],
  transformIgnorePatterns: [
    '/node_modules/(?!((jest-)?react-native|@react-native|react-navigation|@react-navigation|@react-navigation/.*|@react-native(-community)?/.*|@expo(nent)?/.*|expo(nent)?-.*|@unimodules/.*|sentry-expo|native-base|@react-native-async-storage/async-storage|react-native|react-navigation-tabs|react-navigation-stack|@expo-google-fonts/.*|unimodules|react-native-svg)/)',
  ],
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$': '<rootDir>/__mocks__/fileMock.js',
    '\\.(css|less)$': 'identity-obj-proxy',
  },
};