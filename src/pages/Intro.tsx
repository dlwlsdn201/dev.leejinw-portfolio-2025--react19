import { useThemeStore } from '@store/index';
import '@/App.css';
import { IntroWidget, TimelineWidget } from '@widgets/intro';
import { ProjectAlbumWidget } from '@widgets/intro/ProjectAlbumWidget';
import { useAos } from '@widgets/intro/hook/useAos';
import { TEXT_SIZE_CONFIG } from '@app/config/style';
import { useFullPageScroll } from '@shared/hooks/useFullPageScroll';

type IntroSectionId = 0 | 1 | 2;

export const Section: React.FC<{
  title?: string;
  sectionRef: React.RefObject<HTMLDivElement | null>;
  children: React.ReactNode;
}> = ({ title, sectionRef, children }) => (
  <section
    ref={sectionRef}
    className={`w-full h-[90vh] overflow-hidden flex flex-col items-center justify-between gap-y-4 text-white`}
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

  useAos();

  /* SECTION - [FullPage scroll 효과 로직 custom hook] &*/
  const { sectionRefs } = useFullPageScroll<IntroSectionId>({
    initialValue: 0,
  });

  return (
    <div
      className={`${isDarkMode ? 'dark' : ''} h-full w-[100%] transition-colors`}
    >
      <div className="mx-auto w-full h-full px-4 space-y-0 flex flex-col gap-[20rem]">
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
