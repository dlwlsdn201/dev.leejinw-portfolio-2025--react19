import { useThemeStore } from '@store/index';
import '@/App.css';
import { IntroWidget, TimelineWidget } from '@/widgets/intro';
import { ProjectAlbumWidget } from '@widgets/intro/ProjectAlbumWidget';
import { useAos } from '@widgets/intro/hook/useAos';
import { PADDING_CONFIG, TEXT_SIZE_CONFIG } from '@app/config/style';
import { useEffect, useRef, useState } from 'react';

type IntroSectionId = 0 | 1 | 2;

export const Section: React.FC<{
  title?: string;
  sectionRef: React.RefObject<HTMLDivElement | null>;
  children: React.ReactNode;
}> = ({ title, sectionRef, children }) => (
  <section
    ref={sectionRef}
    className={`w-full h-[100vh] overflow-visible flex flex-col items-center gap-20 text-white ${PADDING_CONFIG.py_sm}`}
  >
    {title && (
      <div data-aos="flip-down" className={`${TEXT_SIZE_CONFIG.SEMI_LARGE}`}>
        {title}
      </div>
    )}
    {children}
  </section>
);

function Intro() {
  const { isDarkMode } = useThemeStore();

  /* NOTE - [Full page 작업 중 영역] */
  const [currentSectionId, setCurrentSectionId] = useState<IntroSectionId>(0);
  useAos();

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

      setCurrentSectionId((prev: IntroSectionId) => {
        let nextSection: IntroSectionId = prev;
        if (isScrollingDown && prev < sectionRefs.length - 1)
          nextSection = (prev + 1) as IntroSectionId;
        if (!isScrollingDown && prev > 0)
          nextSection = (prev - 1) as IntroSectionId;

        const navHeaderHeight = 48; // 3rem (Reference: src/shared/ui/common/Header.tsx)
        const sectionTop = sectionRefs[nextSection].current?.offsetTop || 0;

        window.scrollTo({
          top: sectionTop - navHeaderHeight, // for. header 와 section title 이 겹쳐지지 않도록 스크롤 위치 조정
          behavior: 'smooth',
        });
        return nextSection;
      });
    };

    window.addEventListener('wheel', handleScroll);
    return () => window.removeEventListener('wheel', handleScroll);
  }, []);
  /* !NOTE - [Full page 작업 중 영역] */
  return (
    <div
      className={`${isDarkMode ? 'dark' : ''} h-full w-[100%] transition-colors`}
    >
      <div className="mx-auto w-full h-full px-4 space-y-24 flex flex-col gap-[20rem]">
        <Section sectionRef={sectionRefs[0]}>
          <IntroWidget />
        </Section>
        <Section sectionRef={sectionRefs[1]} title="타임라인">
          <TimelineWidget />
        </Section>
        <Section sectionRef={sectionRefs[2]} title="커리어">
          <ProjectAlbumWidget />
        </Section>
      </div>
    </div>
  );
}

export default Intro;
