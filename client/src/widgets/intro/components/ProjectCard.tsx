import {
  CARD_BACKGROUND,
  PADDING_CONFIG,
  TEXT_SIZE_CONFIG,
} from '@app/config/style';
import React from 'react';
import { Tooltip } from '@mantine/core';

// types.ts
interface Project {
  id: number;
  title: string;
  description: string;
  imageSrc: string;
  category: string;
  skills: { name: string; icon: React.ReactElement }[];
  link: string;
}

// ProjectCard.tsx

interface ProjectCardProps {
  project: Project;
  index: number;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project, index }) => {
  const goToProjectUrl = (projectLink: string) => {
    window.open(projectLink, '_blank');
  };

  const aosAnimation = 'fade-right';
  return (
    <div
      data-aos={aosAnimation}
      data-aos-delay={index * 200}
      className={`group relative overflow-hidden rounded-xl ${CARD_BACKGROUND} cursor-pointer mobile:min-h-[10rem] tablet:min-h-[12rem]`}
      onClick={() => goToProjectUrl(project.link)}
    >
      <div className="w-full">
        <div className="mobile:aspect-[6/2] laptop:aspect-[16/9] relative">
          <img
            src={project.imageSrc}
            alt={project.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 flex p-2 justify-center items-end w-full h-full">
            <div className="z-10 relative flex gap-2 -translate-y-10 group-hover:translate-y-0 transition-transform duration-300">
              {project.skills.map((item, idx) => (
                <Tooltip
                  key={item.name}
                  label={item.name}
                  transitionProps={{ transition: 'pop', duration: 300 }}
                >
                  <span
                    key={`icon-skills-${idx}`}
                    className={`opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                  >
                    {item.icon}
                  </span>
                </Tooltip>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Hover 시, Project Card의 background mask  */}
      <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-900/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <div
        className={`relative bottom-0 left-0 right-0 mobile:${PADDING_CONFIG.px_sm} tablet:p-4 mobile:translate-y-5 tablet:translate-y-4 group-hover:translate-y-2 transition-transform duration-300`}
      >
        <div className="space-y-3">
          <p className="text-sm font-medium text-emerald-400 group-hover:hidden">
            {project.category}
          </p>
          <span
            className={`mobile:text-[1rem] tablet:text-[1.25rem] font-bold text-white`}
          >
            {project.title}
          </span>
          <p className="mobile:text-sm text-gray-300 line-clamp-2 opacity-0 group-hover:opacity-100">
            {project.description}
          </p>
        </div>
      </div>
    </div>
  );
};
