/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testPathIgnorePatterns: ['<rootDir>/old_version_backup'],
  testTimeout: 15000,
  slowTestThreshold: 60000,
  moduleNameMapper: {
    '@/(.*)$': '<rootDir>/src/$1',
  },
};
