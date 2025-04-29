import { useCommentStore } from '@/store';
import { useEffect, useState } from 'react';
import { readComments } from '../api/comment';

interface UseReadCommentsProps {
  refreshSubscription?: string[];
}

export const useReadComments = ({
  refreshSubscription = [],
}: UseReadCommentsProps) => {
  const { comments, updateComments, loading, switchLoading } =
    useCommentStore();

  useEffect(() => {
    readComments({
      dispatch: updateComments,
    });
  }, [...refreshSubscription]);

  useEffect(() => {
    console.log('읽기 실행');
    switchLoading(false);
  }, [comments]);

  return {
    comments,
    loading,
  };
};
