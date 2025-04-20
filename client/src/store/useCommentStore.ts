import { create } from 'zustand';
// import { persist } from 'zustand/middleware';
import { Comment } from '@/features/comment/model/comment';

interface UseCommentStore {
  comments: Comment[];
  updateComments: (data: Comment[]) => void;
}

export const useCommentStore = create<UseCommentStore>((set) => ({
  comments: [],
  updateComments: (updatedComments) =>
    set(() => ({ comments: updatedComments })),
}));
