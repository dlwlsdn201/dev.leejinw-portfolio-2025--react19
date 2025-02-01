import { useThemeStore } from '@store/index';
import '@/App.css';
import { IntroWidget, TimelineWidget } from '@/widgets/intro';
import { ProjectAlbumWidget } from '@widgets/intro/ProjectAlbumWidget';
import { useAos } from '@widgets/intro/hook/useAos';
import { TEXT_SIZE_CONFIG } from '@app/config/style';

export const Section: React.FC<{
  title?: string;
  children: React.ReactNode;
}> = ({ title, children }) => (
  <section className=" w-full h-[100vh] overflow-visible flex flex-col items-center gap-20 text-white">
    <div data-aos="flip-down" className={`${TEXT_SIZE_CONFIG.SEMI_LARGE}`}>
      {title ?? ''}
    </div>
    {children}
  </section>
);

function Intro() {
  const { isDarkMode } = useThemeStore();

  useAos();

  return (
    <div
      className={`${isDarkMode ? 'dark' : ''} h-full w-[100%] transition-colors`}
    >
      <div className="mx-auto w-full h-full px-4 space-y-24 flex flex-col gap-[20rem]">
        <Section>
          <IntroWidget />
        </Section>
        <Section title="타임라인">
          <TimelineWidget />
        </Section>
        <Section title="커리어">
          <ProjectAlbumWidget />
        </Section>
      </div>
    </div>
  );
}

export default Intro;
