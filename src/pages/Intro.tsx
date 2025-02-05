import { useThemeStore } from '@store/index';
import '@/App.css';
import { IntroWidget, TimelineWidget } from '@/widgets/intro';
import { ProjectAlbumWidget } from '@widgets/intro/ProjectAlbumWidget';
import { useAos } from '@widgets/intro/hook/useAos';
import { PADDING_CONFIG, TEXT_SIZE_CONFIG } from '@app/config/style';
import { useEffect, useRef, useState } from 'react';

export const Section: React.FC<{
  title?: string;
  sectionRef: React.RefObject<HTMLDivElement | null>;
  children: React.ReactNode;
}> = ({ title, sectionRef, children }) => (
  <section
    ref={sectionRef}
    className={`w-full h-[100vh] overflow-visible flex flex-col items-center gap-20 text-white ${PADDING_CONFIG.py_sm}`}
  >
    <div data-aos="flip-down" className={`${TEXT_SIZE_CONFIG.SEMI_LARGE}`}>
      {title ?? ''}
    </div>
    {children}
  </section>
);

function Intro() {
  const { isDarkMode } = useThemeStore();

  /* NOTE - [Full page 작업 중 영역] */
  const [currentSectionId, setCurrentSectionId] = useState(0);
  const [lastScrollY, setLastScrollY] = useState(0);

  useAos();

  const sectionRefs = [
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
  ];

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const isScrollingDown = currentScrollY > lastScrollY; // 현재 스크롤 방향 체크

      const scrollPosition = window.scrollY + window.innerHeight / 2;
      let closestSection = sectionRefs[0];

      // setLastScrollY(currentScrollY);

      // if (isScrollingDown) setCurrentSectionId((state) => state + 1);
      // else setCurrentSectionId((state) => state - 1);
      closestSection = sectionRefs[currentSectionId];
      console.log({
        scrollPosition,
        isScrollingDown,
        sectionRefs,
        currentSectionId,
        closestSection,
      });

      closestSection.current?.scrollIntoView({ behavior: 'smooth' });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
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
