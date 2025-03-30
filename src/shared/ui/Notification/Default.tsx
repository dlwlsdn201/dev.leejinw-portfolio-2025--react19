import { Notification } from '@mantine/core';
import { useEffect, useState } from 'react';

interface DefaultNotificationProps {
  title: string | React.ReactElement;
  description: string | React.ReactElement;
  mode: Mode;
}
type Mode = 'success' | 'warning' | 'fail';

// NOTE - @shared/styles/animation.css
type SlideAnimateType = 'slideLeftStart' | 'slideLeftEnd';

export const DefaultNotification = ({
  title,
  description,
  mode,
}: DefaultNotificationProps) => {
  const defaultDuration = 3;
  const [animationType, setAnimationType] =
    useState<SlideAnimateType>('slideLeftStart');
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const activate = setTimeout(() => {
      setAnimationType('slideLeftEnd');
    }, defaultDuration * 1000);
    const visible = setTimeout(
      () => {
        setIsVisible(false);
      },
      defaultDuration * 1000 + 250
    );
    return () => {
      clearTimeout(activate);
      clearTimeout(visible);
    };
  }, []);

  const modeConfig: { [key in Mode]: string } = {
    success: 'green',
    warning: 'orange',
    fail: 'red',
  };

  return (
    isVisible && (
      <Notification
        title={<span className="text-2xl">{title}</span>}
        color={modeConfig[mode]}
        className="w-[25rem]"
        style={{
          position: 'absolute',
          padding: '1.25rem 1rem 1.25rem 1.75rem',
          textAlign: 'left',
          top: '0.5rem',
          right: 0,
          animation: `${animationType} 0.25s linear`,
          animationFillMode: 'forwards',
        }}
      >
        <span className="text-lg">{description}</span>
      </Notification>
    )
  );
};
