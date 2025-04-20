// GuestBook.tsx
import { useState, useEffect } from 'react';
import {
  Button,
  Paper,
  Text,
  Group,
  PasswordInput,
  Modal,
  ActionIcon,
} from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { useDisclosure } from '@mantine/hooks';
import { toolsIconProvider } from '@/shared/assets/icon/tools';
import { Content } from './component/Content';
import { IconSize } from '@/app/config/icon';
import { CommentDeleteButton } from '@/features/comment';
import { readComments } from '@/entities/comment/api/comment';
import { useCommentStore } from '@/store';

export const CommentListWidget = () => {
  const [author, setAuthor] = useState('');
  const [password, setPassword] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);

  const { comments, updateComments } = useCommentStore();

  useEffect(() => {
    readComments({
      dispatch: updateComments,
    });
  }, []);

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

  return (
    <div className="w-full py-12 flex-[0.6]">
      <div className="my-8">
        <div className="flex flex-col gap-y-2">
          {comments.length === 0 ? (
            <Text c="dimmed" py="xl">
              아직 작성된 방명록이 없습니다. 첫 번째 방명록을 작성해보세요!
            </Text>
          ) : (
            comments.map((comment) => (
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
                    <Group>
                      <span className="font-bold text-lg">
                        {comment.author}
                      </span>
                      <Text size="sm" c="dimmed">
                        {formatDate(comment.createdAt)}
                      </Text>
                    </Group>
                    <Content>{comment.content}</Content>
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
