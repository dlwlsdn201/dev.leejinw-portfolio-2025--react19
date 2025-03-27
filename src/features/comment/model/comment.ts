export interface NewGuestbookComment {
  author: string;
  password: string;
  content: string;
}
export interface GuestbookComment extends NewGuestbookComment {
  id: string;
  createdAt: number; // unix
}
