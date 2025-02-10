import { SkillsIconProvider } from '@shared/assets/icon/skills';
import Project_1_Image from '@shared/assets/image/project_sample.jpeg';
import Project_1 from '@shared/assets/image/Project_1.gif';

export const PROJECT_CONFIG = [
  {
    id: 1,
    title: '박스오피스 Top 10 랭킹 조회 서비스',
    description:
      'React 18, TypeScript 환경을 기반으로 개발한 영화 Top 10 랭킹 정보 제공 웹 서비스입니다.',
    imageSrc: Project_1,
    category: 'FrontEnd',
    skills: SkillsIconProvider([
      'typescript',
      'react',
      'tanstack/react-query',
      'styledComponents',
      'mantineUI',
    ]),
    link: '#',
  },
  {
    id: 2,
    title: '(작업 중)',
    description: '(작업 중)',
    imageSrc: Project_1_Image,
    category: '(작업 중)',
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
    title: '(작업 중)',
    description: '(작업 중)',
    imageSrc: Project_1_Image,
    category: '(작업 중)',
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
    title: '(작업 중)',
    description: '(작업 중)',
    imageSrc: Project_1_Image,
    category: '(작업 중)',
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
    title: '(작업 중)',
    description: '(작업 중)',
    imageSrc: Project_1_Image,
    category: '(작업 중)',
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
    title: '(작업 중)',
    description: '(작업 중)',
    imageSrc: Project_1_Image,
    category: '(작업 중)',
    skills: SkillsIconProvider(['nextjs', 'styledComponents']),
    link: '#',
  },
];
