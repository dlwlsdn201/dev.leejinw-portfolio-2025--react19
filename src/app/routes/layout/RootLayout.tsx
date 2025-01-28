import { Outlet } from 'react-router-dom';

export const RootLayout = () => (
  <div className="relative cover-fill overflow-hidden">
    <img
      src="/src/shared/assets/background/background.gif"
      className="absolute w-full h-full z-0 object-cover"
    />
    <div className="absolute w-full h-full z-[1] bg-black opacity-20" />
    <div className="px-6 border-amber-600 border-2 w-[100%]">
      {/* Header 자리 */}
      <Outlet />
    </div>
  </div>
);
