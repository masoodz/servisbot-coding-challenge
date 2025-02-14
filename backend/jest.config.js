module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    roots: ['<rootDir>/src'],
    testMatch: ['**/tests/**/*.ts'],
    transform: {
      '^.+\\.(ts|tsx)$': 'ts-jest',
    },
  };
  