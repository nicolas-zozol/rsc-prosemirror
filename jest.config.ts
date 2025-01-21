import type { Config } from 'jest'

const config: Config = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  testMatch: ['**/*.spec.ts'],
  moduleFileExtensions: ['ts', 'js'],
}

export default config
