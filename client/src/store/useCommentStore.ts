import { create } from 'zustand';
// import { persist } from 'zustand/middleware';
import { Comment } from '@/features/comment/model/comment';

interface UseCommentStore {
  comments: Comment[] | undefined;
  updateComments: (data: Comment[]) => void;
}

export const useCommentStore = create<UseCommentStore>((set) => ({
  comments: undefined,
  updateComments: (updatedComments) =>
    set(() => ({ comments: updatedComments })),
}));
