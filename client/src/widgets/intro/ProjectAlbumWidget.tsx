import { ProjectCard } from './components/ProjectCard';
import { StyledContainer } from './style/StyledContainer';
import { PROJECT_CONFIG } from '@widgets/intro/config/project';

export const ProjectAlbumWidget = () => {
  return (
    <StyledContainer>
      <div className="h-full laptop:px-4 desktop:px-8">
        <div className="w-full mx-auto">
          {/* Project Grid */}
          <div className="grid mobile:grid-cols-2 laptop:grid-cols-3 desktop:grid-cols-4 gap-6">
            {PROJECT_CONFIG.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))}
          </div>
        </div>
      </div>
    </StyledContainer>
  );
};
