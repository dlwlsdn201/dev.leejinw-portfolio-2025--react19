import {
  Button,
  PasswordInput,
  Stack,
  Textarea,
  TextInput,
  Title,
} from '@mantine/core';
import { useState } from 'react';
import { Comment } from '@/features/comment/model/comment';
import { useDisclosure } from '@mantine/hooks';
import { notifications } from '@mantine/notifications';

export const CommentInputForm = () => {
  /* TODO - [조회 entities 으로 옮길 예정] */
  const [entries, setEntries] = useState<Comment[]>([]);
  const [author, setAuthor] = useState('');
  const [password, setPassword] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);

  /* TODO - [삭제 feature 으로 옮길 예정] */
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [deletePassword, setDeletePassword] = useState('');
  const [opened, { open, close }] = useDisclosure(false);

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
      const response = await fetch('http://localhost:8000/api/comment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ author, password, content }),
      });

      if (response.ok) {
        setAuthor('');
        setPassword('');
        setContent('');
        // fetchEntries();
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

  return (
    <form onSubmit={handleSubmit}>
      <Stack gap={30}>
        <Title order={3} className="">
          작성하기
        </Title>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <TextInput
            label="작성자명"
            placeholder="이름을 입력하세요"
            value={author}
            size="md"
            onChange={(e) => setAuthor(e.target.value)}
            required
            className="w-full"
          />
          <PasswordInput
            label="비밀번호"
            placeholder="삭제 시 필요한 비밀번호"
            value={password}
            size="md"
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
          size="md"
          onChange={(e) => setContent(e.target.value)}
          required
          className="w-full"
        />
        <Button
          type="submit"
          loading={loading}
          size="md"
          className="bg-blue-600 hover:bg-blue-700 transition-colors w-full"
        >
          등록하기
        </Button>
      </Stack>
    </form>
  );
};
