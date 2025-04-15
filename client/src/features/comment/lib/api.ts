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
