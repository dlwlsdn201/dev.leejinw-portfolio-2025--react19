export const colorPalette = {
  light: {
    background: '#F4F6F9', // 부드러운 회색빛 화이트
    primary: '#3B82F6', // 활기찬 블루
    secondary: '#10B981', // 생동감 있는 녹색
    text: {
      headline: '#1F2937', // 진한 차콜 그레이
      body: '#4B5563', // 중간 회색
      subtle: '#6B7280', // 연한 회색
    },
    accent: {
      success: '#22C55E', // 밝은 녹색
      warning: '#F59E0B', // 따뜻한 황색
      error: '#EF4444', // 선명한 레드
    },
  },
  dark: {
    background: '#121826', // 깊은 네이비 블랙
    primary: '#60A5FA', // 밝은 블루
    secondary: '#34D399', // 민트 그린
    text: {
      headline: '#E5E7EB', // 밝은 회색 화이트
      body: '#D1D5DB', // 중간 밝기 그레이
      subtle: '#9CA3AF', // 연한 회색
    },
    accent: {
      success: '#4ADE80', // 밝은 녹색
      warning: '#FBBF24', // 선명한 황색
      error: '#F87171', // 밝은 레드
    },
  },
  // 2025 Trend-specific Gradients
  gradients: {
    heroSection: 'linear-gradient(135deg, #3B82F6 0%, #10B981 100%)',
    projectCard:
      'linear-gradient(145deg, rgba(59,130,246,0.1) 0%, rgba(16,185,129,0.1) 100%)',
  },
};

export const tailwindThemeConfig = {
  extend: {
    colors: {
      ...colorPalette.light,
      ...colorPalette.dark,
    },
    backgroundImage: {
      'hero-gradient': colorPalette.gradients.heroSection,
      'card-gradient': colorPalette.gradients.projectCard,
    },
  },
};
