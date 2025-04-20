import { notifications } from '@mantine/notifications';
import { Dispatch, SetStateAction } from 'react';

/**
 * @desc 방명록 리스트 조회 API
 * @returns
 */
const READ_COMMENTS_DATA = async () => {
  let result = [];
  try {
    const response = await fetch('http://localhost:8000/api/comments', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      const data = await response.json();
      const sortedDataByDate = data.sort(
        (a: { createdAt: string }, b: { createdAt: string }) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
      result = sortedDataByDate;
    }

    notifications.show({
      title: '성공',
      message: '방명록이 등록되었습니다.',
      /* TODO - [추후 notification 을 모듈화하여 공통적인 props 값 선언은 생략하여 코드 길이 줄이기] */
      color: 'green',
      position: 'top-right',
      autoClose: 3000,
    });
  } catch (error) {
    if (error instanceof Error) {
      notifications.show({
        title: '오류',
        message: error.message,
        position: 'top-right',
        color: 'red',
      });
    }
  } finally {
    return result;
  }
};

export const readComments = async <Record>({
  dispatch,
}: {
  dispatch: Dispatch<SetStateAction<Record[]>>;
}): Promise<void> => {
  const commentsList = await READ_COMMENTS_DATA();
  dispatch(commentsList);
};
