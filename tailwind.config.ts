import { tailwindThemeConfig } from 'src/app/config/colors';
import { PADDING_CONFIG } from '@app/config/style';

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      ...tailwindThemeConfig,
      colors: {
        // 이전에 공유한 컬러 팔레트 추가 가능
      },
      backgroundImage: {
        // 그라데이션 등 추가 가능
      },
      animation: {
        blink: 'blink 1s steps(2, start) infinite',
      },
      keyframes: {
        blink: {
          '0%, 100%': { opacity: 0 },
          '50%': { opacity: 1 },
        },
      },
    },
  },
  plugins: [],
};
