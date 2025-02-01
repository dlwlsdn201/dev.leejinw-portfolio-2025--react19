import { motion } from 'motion/react';
import { useEffect, useState } from 'react';
import { StyledContainer } from './style/StyledContainer';

const CONTENTS_VALUE = "Let's see about dev.leejinw 🤓"; // 출력할 텍스트

export const IntroWidget = () => {
  const [displayText, setDisplayText] = useState('');
  const [index, setIndex] = useState(0);

  // 타이핑 효과 구현
  useEffect(() => {
    if (index < CONTENTS_VALUE.length) {
      const timeout = setTimeout(() => {
        setDisplayText((prev) => prev + CONTENTS_VALUE[index]);
        setIndex(index + 1);
      }, 100);
      return () => clearTimeout(timeout);
    }
  }, [index]);

  return (
    <StyledContainer>
      <motion.div
        className="flex gap-1.5 items-center justify-center h-[100%] text-gray-300 text-5xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
      >
        <motion.span
          className="text-center flex items-center gap-2"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2, ease: 'easeOut' }}
        >
          {displayText}
          <motion.span
            className="w-1 h-8 bg-gray-300 inline-block animate-blink"
            animate={{ opacity: [0, 1, 0] }}
            transition={{ repeat: Infinity, duration: 0.8 }}
          />
        </motion.span>
      </motion.div>
    </StyledContainer>
  );
};
