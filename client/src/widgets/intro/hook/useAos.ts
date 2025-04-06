import AOS from 'aos';
import { useEffect } from 'react';

export const useAos = () => {
  useEffect(() => {
    AOS.init({
      // Global settings for AOS
      duration: 800, // 애니메이션 실행속도
      offset: 100, // 애니메이션 실행 트리거 위치
      easing: 'ease-in-out',
      once: false, // 스크롤 이벤트가 발생할 때마다 애니메이션을 실행할 지(false), 최초 한 번반 실행할 지(true) 설정
      mirror: true, // This enables exit animations
      anchorPlacement: 'top-center',
    });

    // Refresh AOS when window is resized
    window.addEventListener('resize', () => {
      AOS.refresh();
    });

    return () => {
      window.removeEventListener('resize', () => {
        AOS.refresh();
      });
    };
  }, []);
};
