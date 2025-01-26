import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  { ignores: ['dist'] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    env: {
      browser: true,
      node: true,
      es6: true,
      jest: true,
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
      'no-async-promise-executor': 'error', // 비동기 Promise 실행자 함수를 허용하지 않음. (See: https://eslint.org/docs/latest/rules/no-async-promise-executor)
      'no-await-in-loop': 'error', // loop 반복문 내에서 await 키워드 사용을 혀용하지 않음. (See: https://eslint.org/docs/latest/rules/no-await-in-loop)
      'no-const-assign': 'error', // const 변수에 값 재할당을 허용하지 않음.
      'no-duplicate-case': 'error', // 같은 스코프에 존재하는 switch-case 구문들 중에서 중복되는 case 구문을 허용하지 않음. (See: https://eslint.org/docs/latest/rules/no-duplicate-case)
      'no-duplicate-imports': 'warn', // 같은 모듈로부터 import 하는 구문이 2개 이상 중복 작성되는 것을 경고함. (See: https://eslint.org/docs/latest/rules/no-duplicate-import)
      'no-unsafe-optional-chaining': 'error', // 안전하지 않은 옵셔널 체이닝 구문을 허용하지 않음. (See: https://eslint.org/docs/latest/rules/no-unsafe-optional-chaining)
     camelcase: [
        'error',
        {
          properties: true,
          ignoreDestructuring: true,
          ignoreImports: true,
        },
      ], // 카멜 케이스
      'default-case': 'warn', // case 구문에서 default 항목이 있는지에 대한 여부
      'no-var': 'error', // var 키워드 사용 시, 에러
      'no-param-reassign': 'error', // 파라미터에 직접 데이터 재할당 시, 에러
    },
  }
);
