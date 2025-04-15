import { Paper } from '@mantine/core';
import { CommentInputForm } from '@/features/comment';

export const CommentInputWidget = () => {
  return (
    <div className="w-full py-12 flex-[0.4] h-[80vh]">
      <Paper
        styles={{
          root: {
            backgroundColor: 'rgba(17, 24, 39, 0.2)',
            backdropFilter: 'blur(0.25rem)',
          },
        }}
        radius="md"
        p="xl"
        className="h-[100%] "
      >
        <CommentInputForm />
      </Paper>
    </div>
  );
};
