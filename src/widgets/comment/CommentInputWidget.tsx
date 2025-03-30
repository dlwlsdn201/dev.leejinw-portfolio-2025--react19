// GuestBook.tsx
import { useState, useEffect, FormEvent } from 'react';
import {
  TextInput,
  Textarea,
  Button,
  Paper,
  Title,
  PasswordInput,
} from '@mantine/core';
import { notifications } from '@mantine/notifications';
// import { useDisclosure } from '@mantine/hooks';
import { NewGuestbookComment } from '@features/comment/model/comment';
import { useCommentStore } from './store/useCommentStore';
import { InputItem } from './component/InputItem';

export const CommentInputWidget = () => {
  const [author, setAuthor] = useState('');
  const [password, setPassword] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);
  // const [deleteId, setDeleteId] = useState<string | null>(null);
  // const [deletePassword, setDeletePassword] = useState('');
  // const [{ open, close }] = useDisclosure(false);

  const { initComment, addComment } = useCommentStore();

  const fetchEntries = async () => {
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
      //   fetchEntries();
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

  // const handleOpenDeleteModal = (id: string) => {
  //   setDeleteId(id);
  //   setDeletePassword('');
  //   open();
  // };

  // const handleDelete = async () => {
  //   if (!deleteId || !deletePassword.trim()) {
  //     notifications.show({
  //       title: '입력 오류',
  //       message: '비밀번호를 입력해주세요.',
  //       color: 'red',
  //     });
  //     return;
  //   }

  //   try {
  //     const response = await fetch(`/api/guestbook/${deleteId}`, {
  //       method: 'DELETE',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify({ password: deletePassword }),
  //     });

  //     if (response.ok) {
  //       close();
  //       fetchEntries();
  //       notifications.show({
  //         title: '성공',
  //         message: '방명록이 삭제되었습니다.',
  //         color: 'green',
  //       });
  //     } else {
  //       const error = await response.json();
  //       throw new Error(error.message || '방명록 삭제에 실패했습니다.');
  //     }
  //   } catch (error) {
  //     if (error instanceof Error) {
  //       notifications.show({
  //         title: '오류',
  //         message: error.message,
  //         color: 'red',
  //       });
  //     }
  //   }
  // };

  // const formatDate = (dateString: string) => {
  //   const date = new Date(dateString);
  //   return date.toLocaleDateString('ko-KR', {
  //     year: 'numeric',
  //     month: 'long',
  //     day: 'numeric',
  //     hour: '2-digit',
  //     minute: '2-digit',
  //   });
  // };

  // Init
  useEffect(() => {
    fetchEntries();
  }, []);

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
        className="h-[100%] border border-gray-500"
      >
        <form onSubmit={handleSubmit} className="h-full flex flex-col gap-y-6">
          <Title order={3}>작성하기</Title>
          <div className="h-full flex flex-col gap-y-4 justify-start flex-1">
            <InputItem
              label="작성자"
              isRequired={true}
              inputElement={
                <TextInput
                  placeholder="이름을 입력하세요"
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                  required
                  className="w-full"
                />
              }
            />
            <InputItem
              label="비밀번호"
              isRequired={true}
              inputElement={
                <PasswordInput
                  placeholder="삭제 시 필요한 비밀번호 (영소문자/숫자)"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full"
                />
              }
            />
            <InputItem
              label="내용"
              isRequired={true}
              inputElement={
                <Textarea
                  placeholder="방명록 내용을 입력하세요"
                  minRows={1}
                  maxRows={10}
                  size="md"
                  resize="block"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  required
                  className="w-full"
                />
              }
            />
            <Button
              type="submit"
              loading={loading}
              disabled={!author || !password || !content}
              size="lg"
              className="mt-auto! cursor-pointer!"
            >
              등록하기
            </Button>
          </div>
        </form>
      </Paper>
    </div>
  );
};
