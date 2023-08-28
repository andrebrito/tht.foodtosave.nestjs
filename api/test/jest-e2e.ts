import type { Config } from 'jest';

const config: Config = {
  moduleFileExtensions: ['js', 'ts'],
  rootDir: process.cwd(),
  testEnvironment: '<rootDir>/src/prisma/test-migration.js',
  testRegex: '.*\\.e2e-spec\\.ts$',
  coverageReporters: ['text-summary'],
  transform: {
    '^.+.ts$': [
      'ts-jest',
      {
        isolatedModules: true,
        diagnostics: false,
      },
    ],
  },
};

export default config;
