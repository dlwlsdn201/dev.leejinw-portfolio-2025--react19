import {
  Button,
  PasswordInput,
  Stack,
  Textarea,
  TextInput,
  Title,
} from '@mantine/core';
import { useState } from 'react';
import { CREATE_COMMENT_DATA } from '../api/comment';
import { readComments } from '@/entities/comment/api/comment';
import { useCommentStore } from '@/store';

export const CommentInputForm = () => {
  /* TODO - [조회 entities 으로 옮길 예정] */
  const [author, setAuthor] = useState('');
  const [password, setPassword] = useState('');
  const [content, setContent] = useState('');
  const { updateComments, loading, switchLoading } = useCommentStore();

  const resetForm = () => {
    setAuthor('');
    setPassword('');
    setContent('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    switchLoading(true);

    const response = await CREATE_COMMENT_DATA({
      author,
      content,
      password,
    });

    setTimeout(() => {
      if (response?.ok) {
        resetForm();
        readComments({
          dispatch: updateComments,
        });
      }
    }, 1000);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Stack gap={30}>
        <Title order={3} className="mobile:hidden tablet:block">
          새 방명록
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
            disabled={loading}
          />
          <PasswordInput
            label="비밀번호"
            placeholder="삭제 시 필요한 비밀번호"
            value={password}
            size="md"
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full"
            disabled={loading}
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
          disabled={loading}
        />
        <Button
          type="submit"
          loading={loading}
          size="md"
          className="bg-blue-600 hover:bg-blue-700 transition-colors w-full"
          disabled={loading}
        >
          등록하기
        </Button>
      </Stack>
    </form>
  );
};
