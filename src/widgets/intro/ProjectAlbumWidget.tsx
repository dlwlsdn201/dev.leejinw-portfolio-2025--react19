import { ProjectCard } from './components/ProjectCard';
import { StyledContainer } from './style/StyledContainer';
import Project_1_Image from '@shared/assets/image/project_sample.jpeg';
import { SkillsIconProvider } from '@shared/assets/icon/skills';
// import { useAos } from './hook/useAos';

const SAMPLE_data = [
  {
    id: 1,
    title: 'AI 기반 일정 관리 서비스',
    description:
      '머신러닝을 활용한 개인 맞춤형 일정 관리 및 추천 시스템. React, TypeScript, Node.js를 활용하여 개발했습니다.',
    imageSrc: Project_1_Image,
    category: 'Full Stack',
    skills: SkillsIconProvider(['javascript', 'react', 'styledComponents']),
    link: '#',
  },
  {
    id: 2,
    title: '실시간 협업 플랫폼',
    description:
      'WebSocket을 활용한 실시간 문서 공동 작업 플랫폼. 다중 사용자 편집 및 버전 관리 기능을 제공합니다.',
    imageSrc: Project_1_Image,
    category: 'FrontEnd',
    skills: SkillsIconProvider([
      'javascript',
      'react',
      'styledComponents',
      'eslint',
    ]),
    link: '#',
  },
  {
    id: 3,
    title: '블록체인 기반 투표 시스템',
    description:
      '이더리움 스마트 컨트랙트를 활용한 투명한 전자 투표 시스템. Web3.js와 React를 사용했습니다.',
    imageSrc: Project_1_Image,
    category: 'Blockchain',
    skills: SkillsIconProvider([
      'typescript',
      'react',
      'styledComponents',
      'eslint',
    ]),
    link: '#',
  },
  {
    id: 4,
    title: 'IoT 홈 모니터링 대시보드',
    description:
      '라즈베리파이와 React를 연동한 실시간 홈 모니터링 시스템. 센서 데이터 시각화 및 원격 제어 기능을 제공합니다.',
    imageSrc: Project_1_Image,
    category: 'IoT',
    skills: SkillsIconProvider([
      'typescript',
      'react',
      'styledComponents',
      'eslint',
    ]),
    link: '#',
  },
  {
    id: 5,
    title: 'AR 가구 배치 시뮬레이터',
    description:
      'Three.js와 AR.js를 활용한 실시간 가구 배치 시뮬레이션 앱. 모바일에 최적화된 UI/UX를 제공합니다.',
    imageSrc: Project_1_Image,
    category: 'AR/VR',
    skills: SkillsIconProvider([
      'typescript',
      'nextjs',
      'tailwindCss',
      'eslint',
    ]),
    link: '#',
  },
  {
    id: 6,
    title: 'AR 가구 배치 시뮬레이터2',
    description:
      'Three.js와 AR.js를 활용한 실시간 가구 배치 시뮬레이션 앱. 모바일에 최적화된 UI/UX를 제공합니다.',
    imageSrc: Project_1_Image,
    category: 'AR/VR',
    skills: SkillsIconProvider(['nextjs', 'styledComponents']),
    link: '#',
  },
];

export const ProjectAlbumWidget = () => {
  // useAos();

  return (
    <StyledContainer>
      <div className="h-full px-8">
        <div className="w-full mx-auto">
          {/* Project Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
            {SAMPLE_data.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))}
          </div>
        </div>
      </div>
    </StyledContainer>
  );
};
