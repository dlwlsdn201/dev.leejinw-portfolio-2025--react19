import dayjs from 'dayjs';
import { create } from 'zustand';

interface Comment {
  id: string;
  content: string;
  author: string;
  createdAt: number;
}

interface CommentStore {
  // 상태
  comments: Comment[];
  isLoading: boolean;
  error: string | null;

  // 액션
  initComment: (comments: Comment[]) => void;
  addComment: (comment: Omit<Comment, 'id' | 'createdAt'>) => void;
  removeComment: (id: string) => void;
  updateComment: (id: string, content: string) => void;
  setComments: (comments: Comment[]) => void;
  setLoading: (isLoading: boolean) => void;
  setError: (error: string | null) => void;
}

export const useCommentStore = create<CommentStore>((set) => ({
  // 초기 상태
  comments: [],
  isLoading: false,
  error: null,

  // 신규 방명록 추가
  initComment: (allComments) =>
    set(() => ({
      comments: [...allComments],
    })),

  // 신규 방명록 추가
  addComment: (comment) =>
    set((state) => ({
      comments: [
        ...state.comments,
        {
          ...comment,
          id: crypto.randomUUID(),
          createdAt: dayjs().valueOf(),
        },
      ],
    })),

  // 삭제
  removeComment: (id) =>
    set((state) => ({
      comments: state.comments.filter((comment) => comment.id !== id),
    })),

  // 내용 수정
  updateComment: (id, content) =>
    set((state) => ({
      comments: state.comments.map((comment) =>
        comment.id === id ? { ...comment, content } : comment
      ),
    })),

  setComments: (comments) => set({ comments }),
  setLoading: (isLoading) => set({ isLoading }),
  setError: (error) => set({ error }),
}));
