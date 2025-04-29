import { create } from 'zustand';
// import { persist } from 'zustand/middleware';
import { Comment } from '@/features/comment/model/comment';

interface UseCommentStore {
  comments: Comment[] | undefined;
  updateComments: (data: Comment[]) => void;
  loading: boolean;
  switchLoading: (isLoading: boolean) => void;
}

export const useCommentStore = create<UseCommentStore>((set) => ({
  comments: undefined,
  updateComments: (updatedComments) =>
    set(() => ({ comments: updatedComments })),
  loading: false,
  switchLoading: (isLoading) => set(() => ({ loading: isLoading })),
}));
