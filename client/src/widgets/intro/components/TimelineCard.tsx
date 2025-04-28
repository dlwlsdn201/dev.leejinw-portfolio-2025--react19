// TimelineCard.tsx
import React from 'react';
import 'aos/dist/aos.css';
import { CARD_BACKGROUND, TEXT_SIZE_CONFIG } from '@app/config/style';

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
      <div
        className={`mobile:w-11/24 tablet:w-5/10 mobile:p-0 tablet:p-4 ${isLeft ? 'text-right' : 'text-left'}`}
      >
        <div
          className={`${CARD_BACKGROUND} border-2 border-gray-400/30 mobile:p-4 tablet:px-6 rounded-lg shadow-xl hover:transform hover:scale-105 transition duration-300`}
        >
          <span
            className={`mobile:text-[1rem] tablet:text-xl font-bold text-white mb-2}`}
          >
            {item.title}
          </span>
          <p className="text-gray-300 text-sm mb-2">{item.period}</p>
          {item.description && (
            <p className="text-gray-400 text-sm break-keep">
              {item.description}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
