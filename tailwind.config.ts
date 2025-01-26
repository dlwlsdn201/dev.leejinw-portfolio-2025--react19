import { tailwindThemeConfig } from 'src/app/config/colors';

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // 이전에 공유한 컬러 팔레트 추가 가능
      },
      backgroundImage: {
        // 그라데이션 등 추가 가능
      },
      ...tailwindThemeConfig,
    },
  },
  plugins: [],
};
