import { PADDING_CONFIG } from '@/app/config/style';

export const StyledContainer = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <div className={`w-full h-[100%] tablet:${PADDING_CONFIG.px_md}`}>
      {children}
    </div>
  );
};
