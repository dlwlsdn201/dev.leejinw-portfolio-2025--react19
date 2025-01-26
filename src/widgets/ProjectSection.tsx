import React from 'react';
import { Card, Image, Text, Badge } from '@mantine/core';

const projects = [
  {
    title: 'E-commerce Platform',
    description: '실시간 재고 관리 시스템',
    skills: ['React', 'TypeScript', 'Node.js'],
    imageUrl:
      'https://velog.velcdn.com/images/nhs075241/post/b217c0cf-e715-4687-a51d-423edab2ca9a/image.jpeg',
  },
  // 추가 프로젝트들...
];

export const ProjectsSection: React.FC = () => {
  return (
    <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {projects.map((project, index) => (
        <Card
          key={project.title}
          className={`
            ${index % 2 === 0 ? 'md:col-span-2' : 'md:col-span-1'}
            transform transition-transform hover:scale-105
          `}
          shadow="sm"
        >
          <Card.Section>
            <Image src={project.imageUrl} alt={project.title} />
          </Card.Section>

          <Text className="mt-4 text-2xl font-bold">{project.title}</Text>
          <Text className="text-gray-600 dark:text-gray-300">
            {project.description}
          </Text>

          <div className="flex gap-2 mt-4">
            {project.skills.map((skill) => (
              <Badge key={skill} color="blue" variant="light">
                {skill}
              </Badge>
            ))}
          </div>
        </Card>
      ))}
    </section>
  );
};
