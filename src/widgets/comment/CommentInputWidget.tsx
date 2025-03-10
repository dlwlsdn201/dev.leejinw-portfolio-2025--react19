// GuestBook.tsx
import { useState, useEffect } from 'react';
import {
  TextInput,
  Textarea,
  Button,
  Paper,
  Title,
  Text,
  Group,
  Stack,
  PasswordInput,
  Modal,
  ActionIcon,
} from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { useDisclosure } from '@mantine/hooks';
import { CARD_BACKGROUND } from '@app/config/style';

interface GuestbookEntry {
  _id: string;
  author: string;
  content: string;
  createdAt: string;
}

const TEST_ENTRIES: GuestbookEntry[] = [
  {
    _id: '1',
    author: '홍길동',
    content: '안녕하세요. 홍길동입니다.',
    createdAt: '2021-09-01T12:00:00',
  },
];

export const CommentInputWidget = () => {
  const [entries, setEntries] = useState<GuestbookEntry[]>(TEST_ENTRIES);
  const [author, setAuthor] = useState('');
  const [password, setPassword] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [deletePassword, setDeletePassword] = useState('');
  const [opened, { open, close }] = useDisclosure(false);

  const fetchEntries = async () => {
    try {
      const response = await fetch('/api/guestbook');
      const data = await response.json();
      setEntries(data);
    } catch (error) {
      notifications.show({
        title: '오류',
        message: '방명록을 불러오지 못했습니다.',
        color: 'red',
      });
    }
  };

  useEffect(() => {
    fetchEntries();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!author.trim() || !content.trim() || !password.trim()) {
      notifications.show({
        title: '입력 오류',
        message: '모든 필드를 입력해주세요.',
        color: 'red',
      });
      return;
    }

    setLoading(true);
    try {
      const response = await fetch('/api/guestbook', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ author, password, content }),
      });

      if (response.ok) {
        setAuthor('');
        setPassword('');
        setContent('');
        fetchEntries();
        notifications.show({
          title: '성공',
          message: '방명록이 등록되었습니다.',
          color: 'green',
        });
      } else {
        const error = await response.json();
        throw new Error(error.message || '방명록 등록에 실패했습니다.');
      }
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
        fetchEntries();
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
              minRows={4}
              maxRows={8}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
              className="w-full"
            />
            <Group>
              <Button
                type="submit"
                loading={loading}
                // leftIcon={<IconSend size={16} />}
                className="bg-blue-600 hover:bg-blue-700 transition-colors"
              >
                등록하기
              </Button>
            </Group>
          </Stack>
        </form>
      </Paper>
    </div>
  );
};
