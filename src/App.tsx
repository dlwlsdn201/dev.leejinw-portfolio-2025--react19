import { MantineProvider } from '@mantine/core';
import './App.css';
import { useThemeStore } from './store/useThemeStore';
import { IntroSection, ProjectsSection } from './widgets';

function App() {
  const { isDarkMode } = useThemeStore();

  return (
    <MantineProvider defaultColorScheme="light">
      {/* <ColorSchemeScript defaultColorScheme="light" /> */}
      <div
        className={`${isDarkMode ? 'dark' : ''} min-h-screen transition-colors`}
      >
        <div className="container mx-auto px-4 py-8 space-y-16">
          <IntroSection />
          <ProjectsSection />
          {/* <CommentSection />
          <SettingsSection /> */}
        </div>
      </div>
    </MantineProvider>
  );
}

export default App;
