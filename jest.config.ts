import type { Config } from 'jest';

const config: Config = {
  collectCoverage: false,
  preset: 'ts-jest',
  collectCoverageFrom: ['src/**/*.ts'],
  coverageDirectory: 'coverage',
  coverageProvider: 'v8',
  roots: ['<rootDir>/src'],
  testMatch: ['**/*.spec.ts', '**/*.test.ts'],
  transform: { '.+\\.ts$': 'ts-jest' },
  moduleNameMapper: {
    '@/tests/(.*)': '<rootDir>/tests/$1',
    '@/(.*)': '<rootDir>/src/$1',
  },
};

export default config;
