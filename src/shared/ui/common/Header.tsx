import { routes } from '@app/routes/routes';
import { NavLink } from 'react-router-dom';
import { PADDING_CONFIG } from '@app/config/style';

export const SharedHeader = () => {
  return (
    <div className="sticky top-0 w-full z-[1]">
      <nav
        className={`w-full flex z-50  justify-center decoration gap-10 py-[${PADDING_CONFIG.padding_sm}]`}
      >
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
