export const CommentPageLayout = ({
  children,
}: {
  children: React.ReactNode;
}) => (
  <div className="w-full flex flex-col gap-1.5 mobile:px-2 mobile:py-10 tablet:p-10">
    {children}
  </div>
);
