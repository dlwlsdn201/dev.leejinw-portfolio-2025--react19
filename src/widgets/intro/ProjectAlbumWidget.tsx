import { ProjectCard } from './components/ProjectCard';
import { StyledContainer } from './style/StyledContainer';
import { PROJECT_CONFIG } from '@widgets/intro/config/project';
// import { useAos } from './hook/useAos';

export const ProjectAlbumWidget = () => {
  // useAos();

  return (
    <StyledContainer>
      <div className="h-full px-4 md:px-8">
        <div className="w-full mx-auto">
          {/* Project Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
            {PROJECT_CONFIG.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))}
          </div>
        </div>
      </div>
    </StyledContainer>
  );
};
