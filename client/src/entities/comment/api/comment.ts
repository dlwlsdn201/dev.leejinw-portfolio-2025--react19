import { notifications } from '@mantine/notifications';
import { Dispatch, SetStateAction } from 'react';

/**
 * @desc 방명록 리스트 조회 API
 * @returns
 */
const READ_COMMENTS_DATA = async () => {
  let result = [];
  try {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/comments`, {
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
  dispatch: (updatedComments: Record[]) => void;
}): Promise<void> => {
  const commentsList = await READ_COMMENTS_DATA();
  dispatch(commentsList);
};
