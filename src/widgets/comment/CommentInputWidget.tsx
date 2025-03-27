// GuestBook.tsx
import { useState, useEffect, FormEvent } from 'react';
import {
  TextInput,
  Textarea,
  Button,
  Paper,
  Title,
  Stack,
  PasswordInput,
} from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { useDisclosure } from '@mantine/hooks';
import {
  GuestbookComment,
  NewGuestbookComment,
} from '@features/comment/model/comment';
import dayjs from 'dayjs';
import { useCommentStore } from './store/useCommentStore';

export const CommentInputWidget = () => {
  const [author, setAuthor] = useState('');
  const [password, setPassword] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [deletePassword, setDeletePassword] = useState('');
  const [opened, { open, close }] = useDisclosure(false);

  const { initComment, addComment } = useCommentStore();

  const reFetchEntries = async () => {
    try {
      const response = await fetch('/api/guestbook');
      const data = await response.json();
      initComment(data);
    } catch (error) {
      notifications.show({
        title: '오류',
        message: '방명록을 불러오지 못했습니다.',
        color: 'red',
      });
    }
  };

  const SAMPLE_AddComment = (comment: NewGuestbookComment) => {
    addComment(comment);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!author.trim() || !content.trim() || !password.trim()) {
      notifications.show({
        title: '입력 오류',
        message: '모든 필드를 입력해주세요.',
        color: 'red',
      });
      return;
    }

    // FormData를 객체로 변환
    const formValues = {
      author,
      password,
      content,
    };

    setLoading(true);
    try {
      SAMPLE_AddComment(formValues);
      // TODO - [추후 API 연동 필요] */
      // const response = await fetch('/api/guestbook', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify({ author, password, content }),
      // });
      // if (response.ok) {
      //   setAuthor('');
      //   setPassword('');
      //   setContent('');
      //   reFetchEntries();
      //   notifications.show({
      //     title: '성공',
      //     message: '방명록이 등록되었습니다.',
      //     color: 'green',
      //   });
      // } else {
      //   const error = await response.json();
      //   throw new Error(error.message || '방명록 등록에 실패했습니다.');
      // }
    } catch (error) {
      if (error instanceof Error) {
        notifications.show({
          title: '오류',
          message: error.message,
          color: 'red',
        });
      }
    } finally {
      setLoading(false);
    }
  };

  const handleOpenDeleteModal = (id: string) => {
    setDeleteId(id);
    setDeletePassword('');
    open();
  };

  const handleDelete = async () => {
    if (!deleteId || !deletePassword.trim()) {
      notifications.show({
        title: '입력 오류',
        message: '비밀번호를 입력해주세요.',
        color: 'red',
      });
      return;
    }

    try {
      const response = await fetch(`/api/guestbook/${deleteId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ password: deletePassword }),
      });

      if (response.ok) {
        close();
        reFetchEntries();
        notifications.show({
          title: '성공',
          message: '방명록이 삭제되었습니다.',
          color: 'green',
        });
      } else {
        const error = await response.json();
        throw new Error(error.message || '방명록 삭제에 실패했습니다.');
      }
    } catch (error) {
      if (error instanceof Error) {
        notifications.show({
          title: '오류',
          message: error.message,
          color: 'red',
        });
      }
    }
  };

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
        <form onSubmit={handleSubmit}>
          <Stack>
            <Title order={3} className="">
              작성하기
            </Title>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <TextInput
                label="작성자명"
                placeholder="이름을 입력하세요"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                required
                className="w-full"
              />
              <PasswordInput
                label="비밀번호"
                placeholder="삭제 시 필요한 비밀번호"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full"
              />
            </div>
            <Textarea
              label="내용"
              placeholder="방명록 내용을 입력하세요"
              minRows={1}
              maxRows={10}
              size="md"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
              className="w-full"
            />
            <Button
              type="submit"
              loading={loading}
              // leftIcon={<IconSend size={16} />}
              className="w-full bg-blue-600 hover:bg-blue-700 transition-colors"
            >
              등록하기
            </Button>
          </Stack>
        </form>
      </Paper>
    </div>
  );
};
