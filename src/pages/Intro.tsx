import { useThemeStore } from '@store/index';
import '@/App.css';
import { IntroWidget, TimelineWidget } from '@/widgets/intro';
import { ProjectAlbumWidget } from '@widgets/intro/ProjectAlbumWidget';

export const Section: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => <section className="w-full h-[95vh] text-white">{children}</section>;

function Intro() {
  const { isDarkMode } = useThemeStore();

  return (
    <div
      className={`${isDarkMode ? 'dark' : ''} min-h-screen w-[100%] transition-colors`}
    >
      <div className="mx-auto w-full px-4 space-y-16">
        <Section>
          <IntroWidget />
        </Section>
        <Section>
          <TimelineWidget />
        </Section>
        <Section>
          <ProjectAlbumWidget />
        </Section>
      </div>
    </div>
  );
}

export default Intro;
