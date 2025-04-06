import type { Config } from 'jest';

const config: Config = {
  collectCoverage: true, // 취합 커버리지 가능
  coverageDirectory: 'coverage',
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  testMatch: [
    '**/__tests__/**/*.?([mc])[jt]s?(x)',
    '**/?(*.)+(spec|test).?([mc])[jt]s?(x)',
  ],
  collectCoverageFrom: [
    'src/**/*.{ts,tsx}',
    '!**/node_modules/**',
    '!**/vendor/**',
  ],
  coveragePathIgnorePatterns: ['/node_modules', '.*/config.*'],
  coverageThreshold: {
    global: {
      branches: 50, // 조건문 ( if, switch 등)의 각 분기가 테스트된 비율
      functions: 50, // 전체 함수 중 테스트된 함수들의 비율
      lines: 50, // 전체 코드 라인 중 테스트된 라인의 비율
      statements: 50, // 모든 종류의 문장 테스트 비율. (조건문, 일반 코드라인 포함)
    },
    'src/shared': {
      branches: 60,
      functions: 60,
      lines: 60,
      statements: -3, // 적용되지 않은 명령문이 3개 이상인 경우, jest 실패
    },
    'src/pages': {
      branches: 60,
      functions: 60,
      lines: 60,
      statements: -1, // 적용되지 않은 명령문이 3개 이상인 경우, jest 실패
    },
    'src/app': {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 90, // 적용되지 않은 명령문이 3개 이상인 경우, jest 실패
    },
    'src/features': {
      branches: 60,
      functions: 70,
      lines: 70,
      statements: -3, // 적용되지 않은 명령문이 3개 이상인 경우, jest 실패
    },
    'src/entities': {
      branches: 60,
      functions: 70,
      lines: 70,
      statements: -3, // 적용되지 않은 명령문이 3개 이상인 경우, jest 실패
    },
    'src/widgets': {
      branches: 50,
      functions: 80,
      lines: 68,
      statements: -3, // 적용되지 않은 명령문이 3개 이상인 경우, jest 실패
    },
  },
  transform: {
    // Use babel-jest to transpile tests with the next/babel preset
    '^.+.(js|jsx)$': 'babel-jest',
    '^.+.(ts|tsx)$': ['ts-jest', { tsconfig: '<rootDir>/tsconfig.app.json' }],
  },
  transformIgnorePatterns: ['^.+\\.module\\.(css|sass|scss)$', '/dist'],
  testPathIgnorePatterns: ['<rootDir>/node_modules/', '<rootDir>/dist/'],

  moduleNameMapper: {
    '\\.(jpg|png|gif)$': '<rootDir>/src', // 이미지 파일 경로
    '\\.svg$': '<rootDir>/svgMockup.ts',
    '\\.(css|less|scss)$': 'identity-obj-proxy',
    'lodash-es': 'lodash', // lodash es6 문법 오류 해결

    // jest 테스트 코드에서 ts alias paths 사용 하기 위한 설정
    '@src/(.*)$': '<rootDir>/src/$1',
    '@app/(.*)$': '<rootDir>/src/app/$1',
    '@entities/(.*)$': '<rootDir>/src/entities/$1',
    '@features/(.*)$': '<rootDir>/src/features/$1',
    '@mocks/(.*)$': '<rootDir>/src/mocks/$1',
    '@pages/(.*)$': '<rootDir>/src/pages/$1',
    '@shared/(.*)$': '<rootDir>/src/shared/$1',
    '@store/(.*)$': '<rootDir>/src/store/$1',
    '@styles/(.*)$': '<rootDir>/src/styles/$1',
    '@@types/(.*)$': '<rootDir>/src/types/$1',
    '@widgets/(.*)$': '<rootDir>/src/widgets/$1',
  },
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  moduleDirectories: ['node_modules', 'src'],
  verbose: true,
};

export default config;
