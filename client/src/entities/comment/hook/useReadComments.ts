import { useCommentStore } from '@/store';
import { useEffect, useState } from 'react';
import { readComments } from '../api/comment';

interface UseReadCommentsProps {
  refreshSubscription?: string[];
}

export const useReadComments = ({
  refreshSubscription = [],
}: UseReadCommentsProps) => {
  const { comments, updateComments } = useCommentStore();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    readComments({
      dispatch: updateComments,
    });
  }, [...refreshSubscription]);

  useEffect(() => {
    console.log('comments', comments);
    if (comments) {
      setTimeout(() => {
        setLoading(false);
      }, 3000);
    }
  }, [comments]);

  return {
    comments,
    loading,
  };
};
