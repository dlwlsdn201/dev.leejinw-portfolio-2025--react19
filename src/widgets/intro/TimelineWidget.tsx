// Timeline.tsx
import React from 'react';
import { TimelineCard } from './components/TimelineCard';
import { TimelineItem } from './model/TimelineWidget';
import { StyledContainer } from './style/StyledContainer';

export const TimelineWidget: React.FC = () => {
  const timelineData: TimelineItem[] = [
    {
      id: 1,
      title: '출생',
      period: '1994년 10월 28일 출생',
      position: 'left',
    },
    {
      id: 2,
      title: '호계초등학교 졸업',
      period: '2001.03 ~ 2007.02',
      position: 'right',
    },
    {
      id: 3,
      title: '호계중학교 졸업',
      period: '2007.03 ~ 2010.02',
      position: 'left',
    },
    {
      id: 4,
      title: '호계고등학교 졸업',
      period: '2010.03 ~ 2013.02',
      description: '(이과계열)',
      position: 'right',
    },
    {
      id: 5,
      title: '국립 경상대학교 졸업',
      period: '2013.03 ~ 2021.02',
      description: '정보통신공학과 학사',
      position: 'left',
    },
    {
      id: 6,
      title: '빌딩 에너지 관리 솔루션 기업 입사',
      period: '2021.05 ~ ',
      description: 'Tech-Cell Team FrontEnd Engineer / 선임연구원 ',
      position: 'right',
    },
  ];

  return (
    <StyledContainer>
      <div className="h-[100%] relative ">
        <div
          data-aos="zoom-in"
          data-aos-offset="0"
          className="absolute left-1/2 py-6 top-0 bottom-0 w-px bg-gray-500 transform -translate-x-1/2"
        />
        {/* Center Line */}
        <div className="space-y-24">
          {timelineData.map((item, index) => (
            <TimelineCard key={item.id} item={item} index={index} />
          ))}
        </div>
      </div>
    </StyledContainer>
  );
};
