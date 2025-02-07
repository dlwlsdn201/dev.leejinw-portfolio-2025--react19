import { useState, useEffect, useRef } from 'react';

interface Props {
  initialValue: number;
}

export const useFullPageScroll = <SectionId extends number>({
  initialValue,
}: Props) => {
  const [currentSectionId, setCurrentSectionId] = useState<SectionId>(
    initialValue as SectionId
  );

  const sectionRefs = [
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
  ];

  useEffect(() => {
    let isThrottled = false; // 연속 이벤트 방지

    const handleScroll = (event: WheelEvent) => {
      if (isThrottled) return; // 이벤트 연속 실행 방지

      isThrottled = true;
      setTimeout(() => (isThrottled = false), 500); // 0.5초 동안 이벤트 중복 실행 방지

      const isScrollingDown = event.deltaY > 0; // 마우스 휠 방향 확인

      setCurrentSectionId((prev: SectionId) => {
        let nextSection: SectionId = prev;
        if (isScrollingDown && prev < sectionRefs.length - 1)
          nextSection = (prev + 1) as SectionId;
        if (!isScrollingDown && prev > 0) nextSection = (prev - 1) as SectionId;

        const navHeaderHeight = 52; // 3.25rem (Reference: src/shared/ui/common/Header.tsx)
        const sectionTop = sectionRefs[nextSection].current?.offsetTop || 0;

        window.scrollTo({
          top: sectionTop - navHeaderHeight - 20, // for. header 와 section title 이 겹쳐지지 않도록 스크롤 위치 조정
          behavior: 'smooth',
        });
        return nextSection;
      });
    };

    window.addEventListener('wheel', handleScroll);
    return () => window.removeEventListener('wheel', handleScroll);
  }, []);

  return { sectionRefs, currentSectionId };
};
