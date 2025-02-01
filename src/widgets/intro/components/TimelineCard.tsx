// TimelineCard.tsx
import React from 'react';
import 'aos/dist/aos.css';

interface TimelineCardProps {
  item: TimelineItem;
}

// types.ts
interface TimelineItem {
  id: number;
  title: string;
  period: string;
  description?: string;
  position: 'left' | 'right';
}

export const TimelineCard: React.FC<TimelineCardProps> = ({ item }) => {
  const isLeft = item.position === 'left';
  return (
    <div
      className={`flex w-full ${isLeft ? 'justify-end' : 'justify-start'}`}
      data-aos={isLeft ? 'fade-left' : 'fade-right'}
    >
      <div className={`w-5/12 p-4 ${isLeft ? 'text-right' : 'text-left'}`}>
        <div className="bg-gray-800 bg-opacity-50 backdrop-blur-sm p-6 rounded-lg shadow-xl hover:transform hover:scale-105 transition duration-300">
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
