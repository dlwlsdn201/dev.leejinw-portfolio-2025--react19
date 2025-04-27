import { useThemeStore } from '@store/index';
import '@/App.css';
import { IntroWidget, TimelineWidget } from '@widgets/intro';
import { ProjectAlbumWidget } from '@widgets/intro/ProjectAlbumWidget';
import { useAos } from '@widgets/intro/hook/useAos';
import { TEXT_SIZE_CONFIG } from '@app/config/style';
import { useFullPageScroll } from '@shared/hooks/useFullPageScroll';

// type IntroSectionId = 0 | 1 | 2;

export const Section: React.FC<{
  title?: string;
  id: string;
  // sectionRef: React.RefObject<HTMLDivElement | null>;
  children: React.ReactNode;
}> = ({ title, id, children }) => (
  <section
    id={id}
    className={`w-full h-[100vh] overflow-hidden flex flex-col items-center justify-between gap-y-4 text-white`}
  >
    {title && (
      <span
        data-aos="flip-down"
        className={`mobile:${TEXT_SIZE_CONFIG.MEDIUM} mobile:mt-[5rem]! laptop:mt-[7rem] laptop:${TEXT_SIZE_CONFIG.LARGE}`}
      >
        {title}
      </span>
    )}
    {children}
  </section>
);

function Intro() {
  const { isDarkMode } = useThemeStore();

  useAos();

  /* SECTION - [FullPage scroll 효과 로직 custom hook] &*/
  // const { sectionRefs } = useFullPageScroll<IntroSectionId>({
  //   initialValue: 0,
  // });

  const sectionIds = ['section0', 'section1', 'section2'];

  useFullPageScroll({
    sectionIds,
    scrollDelay: 1500,
  });

  return (
    <div
      className={`${isDarkMode ? 'dark' : ''} h-full w-[100%] transition-colors`}
    >
      <div className="mx-auto w-full h-full mobile:px-0 tablet:px-4 space-y-0 flex flex-col">
        <Section id="section0">
          <IntroWidget />
        </Section>
        <Section id="section1" title="타임라인">
          <TimelineWidget />
        </Section>
        <Section id="section2" title="커리어">
          <ProjectAlbumWidget />
        </Section>
      </div>
    </div>
  );
}

export default Intro;
