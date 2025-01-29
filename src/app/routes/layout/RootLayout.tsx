import { SharedHeader } from '@shared/ui/common';
import { Outlet } from 'react-router-dom';

export const RootLayout = () => (
  <div className="relative cover-fill h-[100%]">
    <img
      src="/src/shared/assets/background/background.gif"
      className="absolute w-full h-full z-[-2] object-cover"
    />
    <div className="absolute w-full h-full z-[-1] bg-black opacity-20" />
    <SharedHeader />
    <div className="px-6 w-[100%] z-[1]">
      {/* Header 자리 */}
      <Outlet />
    </div>
  </div>
);
