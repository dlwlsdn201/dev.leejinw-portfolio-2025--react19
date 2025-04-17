import { notifications } from '@mantine/notifications';

// 댓글 작성 처리
export const CREATE_COMMENT_DATA = async ({
  author,
  content,
  password,
}: {
  author: string;
  content: string;
  password: string;
}) => {
  try {
    // await createComment({ author, content, password });
    // 새로운 댓글 목록 불러오기
    // loadComments();

    return { resultCode: 'ok' };
  } catch (err) {
    console.error(err);
  }
};

export const DELETE_COMMENT_DATA = async ({
  deleteId,
  deletePassword,
  callback,
}: {
  deleteId: string | null;
  deletePassword: string;
  callback?: () => void;
}) => {
  if (!deleteId || !deletePassword.trim()) {
    notifications.show({
      title: '입력 오류',
      message: '비밀번호를 입력해주세요.',
      color: 'orange',
      position: 'top-right',
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
      notifications.show({
        title: '성공',
        message: '방명록이 삭제되었습니다.',
        color: 'green',
        position: 'top-right',
        autoClose: 3000,
      });

      if (callback) {
        callback();
      }
    } else {
      const error = await response.json();
      throw new Error(error.message || '방명록 삭제에 실패했습니다.');
    }
  } catch (error) {
    if (error instanceof Error) {
      notifications.show({
        title: '오류',
        message: error.message,
        position: 'top-right',
        color: 'red',
      });
    }
  }
};
