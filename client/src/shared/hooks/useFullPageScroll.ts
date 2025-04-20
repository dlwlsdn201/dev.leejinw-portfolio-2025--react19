import { useState, useEffect, useCallback, useRef } from 'react';

interface UseFullPageScrollProps {
  sectionIds: string[];
  scrollDelay?: number;
  animateScroll?: boolean;
  animationDuration?: number;
}

/**
 * 풀 페이지 스크롤 기능을 위한 커스텀 훅
 *
 * @param {Object} options - 설정 옵션
 * @param {string[]} options.sectionIds - 섹션 요소의 ID 배열
 * @param {number} options.scrollDelay - 스크롤 감지 딜레이 (ms, 기본값: 1000)
 * @param {boolean} options.animateScroll - 스크롤 애니메이션 사용 여부 (기본값: true)
 * @param {number} options.animationDuration - 스크롤 애니메이션 지속 시간 (ms, 기본값: 500)
 * @returns {Object} - 현재 섹션 ID와 관련 메서드들
 */
export const useFullPageScroll = ({
  sectionIds = [],
  scrollDelay = 2000,
  animateScroll = true,
  animationDuration = 700,
}: UseFullPageScrollProps) => {
  // 현재 활성화된 섹션의 ID
  const [currentSectionId, setCurrentSectionId] = useState(sectionIds[0] || '');
  // 스크롤 이벤트 딜레이를 관리하기 위한 상태
  const [isScrolling, setIsScrolling] = useState(false);
  // 마지막 스크롤 위치를 저장하기 위한 ref
  const lastScrollTop = useRef(0);
  // 스크롤 락 관리를 위한 ref
  const scrollLock = useRef(false);
  // 현재 섹션 인덱스
  const currentIndex = sectionIds.indexOf(currentSectionId);

  // 특정 섹션으로 스크롤하는 함수
  const scrollToSection = useCallback(
    (sectionId: string) => {
      if (!sectionId || !sectionIds.includes(sectionId)) return;

      const element = document.getElementById(sectionId);
      if (!element) return;

      scrollLock.current = true;
      setCurrentSectionId(sectionId);

      if (animateScroll) {
        element.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });

        // 애니메이션 완료 후 스크롤 락 해제
        setTimeout(() => {
          scrollLock.current = false;
        }, animationDuration);
      } else {
        element.scrollIntoView({
          block: 'start',
        });

        // 즉시 스크롤 락 해제
        setTimeout(() => {
          scrollLock.current = false;
        }, 100);
      }
    },
    [sectionIds, animateScroll, animationDuration]
  );

  // 다음 섹션으로 이동
  const goToNextSection = useCallback(() => {
    if (currentIndex < sectionIds.length - 1) {
      scrollToSection(sectionIds[currentIndex + 1]);
    }
  }, [currentIndex, sectionIds, scrollToSection]);

  // 이전 섹션으로 이동
  const goToPrevSection = useCallback(() => {
    if (currentIndex > 0) {
      const prevSectionId = sectionIds[currentIndex - 1];
      scrollToSection(prevSectionId);
    }
  }, [currentIndex, sectionIds, scrollToSection]);

  // 스크롤 이벤트 처리 함수
  const handleScroll = useCallback(() => {
    if (scrollLock.current || isScrolling) return;

    setIsScrolling(true);

    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const scrollDirection = scrollTop > lastScrollTop.current ? 'down' : 'up';
    lastScrollTop.current = scrollTop;

    // 현재 화면에 가장 많이 보이는 섹션 찾기
    const viewportHeight = window.innerHeight;
    const viewportMiddle = scrollTop + viewportHeight / 2;

    let closestSection = null;
    let closestDistance = Infinity;

    sectionIds.forEach((id) => {
      const element = document.getElementById(id);
      if (!element) return;

      const rect = element.getBoundingClientRect();
      const sectionTop = rect.top + scrollTop;
      const sectionMiddle = sectionTop + rect.height / 2;
      const distance = Math.abs(viewportMiddle - sectionMiddle);

      if (distance < closestDistance) {
        closestDistance = distance;
        closestSection = id;
      }
    });

    if (closestSection && closestSection !== currentSectionId) {
      setCurrentSectionId(closestSection);
    }

    // 스크롤 방향에 따라 다음/이전 섹션으로 자동 이동
    if (Math.abs(scrollTop - lastScrollTop.current) > 50) {
      if (scrollDirection === 'down') {
        goToNextSection();
      } else if (scrollDirection === 'up') {
        goToPrevSection();
      }
    }

    // 스크롤 딜레이 후 스크롤 가능 상태로 변경
    setTimeout(() => {
      setIsScrolling(false);
    }, scrollDelay);
  }, [
    isScrolling,
    currentSectionId,
    sectionIds,
    scrollDelay,
    goToNextSection,
    goToPrevSection,
  ]);

  // 휠 이벤트 핸들러
  const handleWheel = useCallback(
    (e: WheelEvent) => {
      e.preventDefault();
      if (scrollLock.current || isScrolling) {
        return;
      }

      // 휠 이벤트의 deltaY를 콘솔에 출력하여 값 확인

      setIsScrolling(true);

      // deltaY 값을 명확하게 검사
      if (e.deltaY > 0) {
        goToNextSection();
      } else if (e.deltaY < 0) {
        goToPrevSection();
      }

      // 기본 스크롤 동작 방지
      e.preventDefault();

      // 스크롤 딜레이 후 스크롤 가능 상태로 변경
      setTimeout(() => {
        setIsScrolling(false);
      }, scrollDelay);
    },
    [isScrolling, scrollDelay, goToNextSection, goToPrevSection]
  );

  // 키보드 이벤트 핸들러 (화살표 키로 이동)
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (scrollLock.current || isScrolling) return;

      if (e.key === 'ArrowDown' || e.key === 'PageDown') {
        goToNextSection();
        e.preventDefault();
      } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
        goToPrevSection();
        e.preventDefault();
      }
    },
    [isScrolling, goToNextSection, goToPrevSection]
  );

  // 터치 이벤트를 위한 상태와 핸들러
  const touchStartY = useRef(0);

  const handleTouchStart = useCallback((e: TouchEvent) => {
    touchStartY.current = e.touches[0].clientY;
  }, []);

  const handleTouchEnd = useCallback(
    (e: TouchEvent) => {
      if (scrollLock.current || isScrolling) return;

      const touchEndY = e.changedTouches[0].clientY;
      const diff = touchEndY - touchStartY.current;

      // 터치 움직임이 충분히 크면 페이지 이동
      if (Math.abs(diff) > 50) {
        setIsScrolling(true);

        if (diff < 0) {
          // 위로 스와이프 (다음 섹션)
          goToNextSection();
        } else {
          // 아래로 스와이프 (이전 섹션)
          goToPrevSection();
        }

        // 스크롤 딜레이 후 스크롤 가능 상태로 변경
        setTimeout(() => {
          setIsScrolling(false);
        }, scrollDelay);
      }
    },
    [isScrolling, scrollDelay, goToNextSection, goToPrevSection]
  );

  // 컴포넌트 마운트/언마운트 시 이벤트 리스너 등록/해제
  useEffect(() => {
    // 초기 섹션 설정
    if (sectionIds.length > 0 && !currentSectionId) {
      setCurrentSectionId(sectionIds[0]);
    }

    // 현재 URL 해시에 따라 초기 위치 설정
    const hash = window.location.hash.replace('#', '');
    if (hash && sectionIds.includes(hash)) {
      scrollToSection(hash);
    }

    // 이벤트 리스너 등록
    window.addEventListener('scroll', handleScroll, { passive: false });
    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('touchstart', handleTouchStart);
    window.addEventListener('touchend', handleTouchEnd);

    // 컴포넌트 언마운트 시 이벤트 리스너 해제
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [
    sectionIds,
    currentSectionId,
    handleScroll,
    handleWheel,
    handleKeyDown,
    handleTouchStart,
    handleTouchEnd,
    scrollToSection,
  ]);

  // 사용할 값과 메서드 반환
  return {
    currentSectionId,
    goToNextSection,
    goToPrevSection,
    scrollToSection,
    isScrolling,
  };
};
