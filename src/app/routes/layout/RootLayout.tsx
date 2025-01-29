import { SharedHeader } from '@shared/ui/common';
import { Outlet } from 'react-router-dom';

export const RootLayout = () => (
  <div className="relative cover-fill h-[100%] w-full">
    <div
      className="fixed inset-0 w-full h-full z-[-2] bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: "url('/src/shared/assets/background/background.gif')",
      }}
    />
    <div className="absolute w-full h-full z-[-1] bg-black opacity-20" />
    <SharedHeader />
    <div className="px-6 w-full z-[1]">
      {/* Header 자리 */}
      <Outlet />
    </div>
  </div>
);
