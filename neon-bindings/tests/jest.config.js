module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  setupFiles: ['core-js', './src/setupTests.ts'],
  roots: ['<rootDir>/src'],
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  modulePathIgnorePatterns: [
    '<rootDir>/node_modules',
    '<rootDir>/src/__tests__/helpers',
  ],
};
