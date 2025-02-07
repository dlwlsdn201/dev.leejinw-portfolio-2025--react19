// TimelineCard.tsx
import React from 'react';
import 'aos/dist/aos.css';
import { cardBackgroundStyle } from '@widgets/intro/config/style';

interface TimelineCardProps {
  item: TimelineItem;
  index: number;
}

// types.ts
interface TimelineItem {
  id: number;
  title: string;
  period: string;
  description?: string;
  position: 'left' | 'right';
}

export const TimelineCard: React.FC<TimelineCardProps> = ({ item, index }) => {
  const isLeft = item.position === 'left';
  return (
    <div
      data-aos={isLeft ? 'fade-left' : 'fade-right'}
      data-aos-delay={index * 200} // 200ms씩 delay
      className={`flex w-full ${isLeft ? 'justify-end' : 'justify-start'}`}
    >
      <div className={`w-5/12 p-4 ${isLeft ? 'text-right' : 'text-left'}`}>
        <div
          className={`${cardBackgroundStyle} border-2 border-gray-400/30 p-6 rounded-lg shadow-xl hover:transform hover:scale-105 transition duration-300`}
        >
          <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
          <p className="text-gray-300 text-sm mb-2">{item.period}</p>
          {item.description && (
            <p className="text-gray-400 text-sm">{item.description}</p>
          )}
        </div>
      </div>
    </div>
  );
};
