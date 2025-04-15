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
  {
    _id: '2',
    author: '김미리',
    content: '안녕하세요. 김미리입니다.',
    createdAt: '2021-10-01T12:00:00',
  },
];

export const CommentListWidget = () => {
  const [entries, setEntries] = useState<GuestbookEntry[]>([]);
  const [author, setAuthor] = useState('');
  const [password, setPassword] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [deletePassword, setDeletePassword] = useState('');
  const [opened, { open, close }] = useDisclosure(false);

  const fetchEntries = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/comments', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      // const DATA = TEST_ENTRIES;
      /* TODO -[추후 lib 핸들러 함수로 리팩터링] */
      const sortedDataByDate = data.sort(
        (a: { createdAt: string }, b: { createdAt: string }) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
      setEntries(sortedDataByDate);
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
      const response = await fetch(
        `http://localhost:8000/api/comment/${deleteId}`,
        {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ password: deletePassword }),
        }
      );

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

  const deleteIcon = toolsIconProvider({ keys: ['delete'] }).map(
    ({ IconElement }, idx) => <IconElement key={idx} size={IconSize.SMALL} />
  );

  return (
    <div className="w-full py-12 flex-[0.6]">
      <div className="my-8">
        <div className="flex flex-col gap-y-2">
          {entries.length === 0 ? (
            <Text c="dimmed" py="xl">
              아직 작성된 방명록이 없습니다. 첫 번째 방명록을 작성해보세요!
            </Text>
          ) : (
            entries.map((entry) => (
              <Paper
                styles={{
                  // Ref. CommentInputWidget.tsx:175
                  root: {
                    backgroundColor: 'rgba(17, 24, 39, 0.2)',
                    backdropFilter: 'blur(0.25rem)',
                  },
                }}
                key={entry._id}
                shadow="xs"
                radius="md"
                p="md"
                className="border border-gray-500 hover:border-gray-300 transition-all duration-200"
              >
                <div className="flex justify-between items-start">
                  <div className="w-full flex flex-col items-start gap-y-2">
                    <Group>
                      <span className="font-bold text-lg">{entry.author}</span>
                      <Text size="sm" c="dimmed">
                        {formatDate(entry.createdAt)}
                      </Text>
                    </Group>
                    <Content>{entry.content}</Content>
                  </div>
                  <ActionIcon
                    c="red"
                    variant="subtle"
                    onClick={() => handleOpenDeleteModal(entry._id)}
                    className="hover:bg-red-50"
                  >
                    {...deleteIcon}
                  </ActionIcon>
                </div>
              </Paper>
            ))
          )}
        </div>
      </div>

      <Modal opened={opened} onClose={close} title="방명록 삭제" centered>
        <div className="p-2">
          <Text size="sm" mb="md">
            방명록을 삭제하려면 작성 시 입력했던 비밀번호를 입력해주세요.
          </Text>
          <PasswordInput
            placeholder="비밀번호"
            value={deletePassword}
            onChange={(e) => setDeletePassword(e.target.value)}
            mb="md"
          />
          <Group justify="flex-end">
            <Button variant="outline" onClick={close}>
              취소
            </Button>
            <Button c="red" onClick={handleDelete}>
              삭제
            </Button>
          </Group>
        </div>
      </Modal>
    </div>
  );
};
