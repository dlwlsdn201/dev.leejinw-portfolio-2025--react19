import { useState, useEffect } from 'react';

export const useScroll = ({ triggerScrollY }: { triggerScrollY: number }) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      console.log({ scrollY: window.scrollY, triggerScrollY });
      setIsScrolled(window.scrollY > triggerScrollY); // 스크롤 50px 이상일 때 상태 변경
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [window.scrollY]);

  return { isScrolled };
};
