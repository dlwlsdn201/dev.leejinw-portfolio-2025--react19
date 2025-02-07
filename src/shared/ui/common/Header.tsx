import { PADDING_CONFIG } from '@/app/config/style';
import { routes } from '@app/routes/routes';
import { NavLink } from 'react-router-dom';

export const SharedHeader = () => {
  return (
    <div
      className={`sticky top-0 w-full z-[1] h-[3rem] ${PADDING_CONFIG.py_sm}`}
    >
      <nav className={`w-full flex z-50 justify-center decoration gap-10`}>
        {routes.map(({ path, label }) => (
          <NavLink
            to={path}
            key={path}
            className="text-white hover:bg-blue-300 rounded w-[6rem] "
          >
            {label}
          </NavLink>
        ))}
      </nav>
    </div>
  );
};
