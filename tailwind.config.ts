import { tailwindThemeConfig } from 'src/app/config/colors';

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    ...tailwindThemeConfig,
    extend: {
      backgroundImage: {
        // 그라데이션 등 추가 가능
      },
      keyframes: {
        blink: {
          '0%, 100%': { opacity: 0 },
          '50%': { opacity: 1 },
        },
        // X축 슬라이드 애니메이션
        slideLeft: {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(0%)' },
        },
        // X축 바운스 애니메이션
        bounceX: {
          '0%, 100%': { transform: 'translateX(0)' },
          '50%': { transform: 'translateX(20px)' },
        },
      },
      animation: {
        blink: 'blink 1s steps(2, start) infinite',
        // 애니메이션 정의
        'slide-left': 'slideLeft 0.5s linear',
        'bounce-x': 'bounceX 1s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
