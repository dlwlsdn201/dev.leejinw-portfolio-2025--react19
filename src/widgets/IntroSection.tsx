import React from 'react';
import { motion } from 'framer-motion';
import { Button, useMantineColorScheme } from '@mantine/core';

export const IntroSection: React.FC = () => {
  const { colorScheme, setColorScheme } = useMantineColorScheme();
  const greeting = '안녕하세요, 프론트엔드 개발자입니다.';

  return (
    <section className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="text-5xl md:text-6xl font-bold mb-4 tracking-tight">
          {greeting.split('').map((char, index) => (
            <motion.span
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: index * 0.05,
                type: 'spring',
                stiffness: 100,
              }}
              className="inline-block"
            >
              {char}
            </motion.span>
          ))}
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300">
          혁신적인 웹 경험을 만드는 개발자
        </p>
      </motion.div>

      <Button
        onClick={() =>
          setColorScheme(colorScheme === 'light' ? 'dark' : 'light')
        }
      >
        테마 변경
      </Button>
    </section>
  );
};
