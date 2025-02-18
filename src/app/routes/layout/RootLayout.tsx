import { SharedHeader } from '@shared/ui/common';
import { Outlet } from 'react-router-dom';
import backgroundGif from '@shared/assets/background/background.gif';

export const RootLayout = () => (
  <div className="relative cover-fill h-[100%] w-full">
    <div
      className="fixed inset-0 w-full h-full z-[-2] bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: `url(${backgroundGif})`,
      }}
    >
      <div className="absolute w-full h-[100%] z-[-1] bg-black opacity-40" />
    </div>
    {/* Header 자리 */}
    <SharedHeader />
    <div className="px-6 w-full z-[1]">
      <Outlet />
    </div>
  </div>
);
