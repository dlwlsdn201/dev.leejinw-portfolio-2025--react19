// GuestBook.tsx
import { Paper, Text, Group, Skeleton } from '@mantine/core';
import { Content } from './component/Content';
import { CommentDeleteButton } from '@/features/comment';
import { useReadComments } from '@/entities/comment';

export const CommentListWidget = () => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const { comments, loading } = useReadComments({});

  return (
    <div className="w-full py-12 flex-[0.6]">
      <div className="my-8">
        <div className="flex flex-col gap-y-2">
          {comments?.length === 0 ? (
            <Text c="dimmed" py="xl">
              <Skeleton visible={loading} width="90%" radius={8}>
                아직 작성된 방명록이 없습니다. 첫 번째 방명록을 작성해보세요!
              </Skeleton>
            </Text>
          ) : (
            comments?.map((comment) => (
              <Paper
                styles={{
                  // Ref. CommentInputWidget.tsx:175
                  root: {
                    backgroundColor: 'rgba(17, 24, 39, 0.2)',
                    backdropFilter: 'blur(0.25rem)',
                  },
                }}
                key={comment._id}
                shadow="xs"
                radius="md"
                p="md"
                className="border border-gray-500 hover:border-gray-300 transition-all duration-200"
              >
                <div className="flex justify-between items-start">
                  <div className="w-full flex flex-col items-start gap-y-2">
                    <Skeleton visible={loading} width="90%" radius={8}>
                      <Group>
                        <span className="font-bold text-lg">
                          {comment.author}
                        </span>
                        <Text size="sm" c="dimmed">
                          {formatDate(comment.createdAt)}
                        </Text>
                      </Group>
                    </Skeleton>
                    <Skeleton visible={loading} width="90%" radius={8}>
                      <Content>{comment.content}</Content>
                    </Skeleton>
                  </div>
                  <CommentDeleteButton
                    deleteId={comment._id}
                    /* TODO - [추후 entities 로 리팩터링 하여 Button 내부에서 lib 핸들러 함수로 리팩터링] */
                  />
                </div>
              </Paper>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
