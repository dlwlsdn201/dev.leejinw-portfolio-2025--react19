import { PADDING_CONFIG } from '@/app/config/style';
import { useGlobalStore } from '@/store';
import { routes } from '@app/routes/routes';
import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';

export const SharedHeader = () => {
  const [isSticky, setIsSticky] = useState(false);

  const { currentPageId } = useGlobalStore();

  /* stick mode 갑지 */
  useEffect(() => {
    const handleScroll = () => {
      const isStickyMode = window.scrollY > 0;
      setIsSticky(isStickyMode);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div
      className={`sticky top-0 w-full z-[1] h-[3.25rem] ${PADDING_CONFIG.py_sm} ${
        isSticky ? 'bg-black/30 backdrop-blur-sm' : 'bg-transparent'
      } transition-colors duration-500 linear`}
    >
      <nav className={`w-full flex z-50 justify-center decoration gap-10`}>
        {routes.map(({ path, label }) => (
          <div className="flex flex-col items-center" key={path}>
            <NavLink
              to={path}
              key={path}
              className="text-white hover:bg-transparent hover:text-blue-400 hover:text-lg transition-all duration-300 linear rounded w-[5rem] "
            >
              {label}
            </NavLink>
            {label === currentPageId && (
              <div className={`w-[20%]  border-b-1 border-amber-50`} />
            )}
          </div>
        ))}
      </nav>
    </div>
  );
};
