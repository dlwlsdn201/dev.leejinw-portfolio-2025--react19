import './App.css';
import { useThemeStore } from './store/useThemeStore';

function App() {
  const { isDarkMode } = useThemeStore();

  return (
    <div
      className={`${isDarkMode ? 'dark' : ''} min-h-screen transition-colors`}
    >
      <div className="container mx-auto px-4 py-8 space-y-16">
        {/* <IntroSection />
          <ProjectsSection /> */}
        {/* <CommentSection />
          <SettingsSection /> */}
      </div>
    </div>
  );
}

export default App;
