// src/controllers/commentController.ts
import { Request, RequestHandler, Response } from 'express';
import { CommentModel } from '../models/commentModel';

// 모든 방명록 조회
export const getComments = async (req: Request, res: Response) => {
  try {
    const comments = await CommentModel.find()
      .select('-password') // 비밀번호 필드 제외
      .sort({ createdAt: -1 }) // 최신순 정렬
      .exec();

    res.status(200).json(comments);
  } catch (error) {
    console.error('Error fetching comments:', error);
    res.status(500).json({ message: 'Failed to fetch comments' });
  }
};

// 특정 방명록 조회
export const getComment = async (req: Request, res: Response) => {
  try {
    const comment = await CommentModel.findById(req.params.id)
      .select('-password')
      .exec();

    if (!comment) {
      return res.status(404).json({ message: 'Comment not found' });
    }

    res.status(200).json(comment);
  } catch (error) {
    console.error('Error fetching comment:', error);
    res.status(500).json({ message: 'Failed to fetch comment' });
  }
};

// 방명록 생성
export const createComment: RequestHandler = async (
  req: Request,
  res: Response
) => {
  try {
    const { author, content, password } = req.body;
    // 입력 검증
    if (!author || !content || !password) {
      res.status(400).json({ message: 'All fields are required' });
    }

    const newComment = new CommentModel({
      author,
      content,
      password,
    });

    const savedComment = await newComment.save();

    // 비밀번호 제외하고 응답
    const responseComment = {
      id: savedComment._id,
      author: savedComment.author,
      content: savedComment.content,
      createdAt: savedComment.createdAt,
      updatedAt: savedComment.updatedAt,
    };

    res.status(201).json(responseComment);
  } catch (error) {
    console.error('Error creating comment:', error);
    res.status(500).json({ message: 'Failed to create comment' });

    // next(error); // 에러 핸들링 미들웨어로 전달
  }
};

// 방명록 수정
export const updateComment: RequestHandler = async (
  req: Request,
  res: Response,
  next
) => {
  try {
    const { content, password } = req.body;

    // 입력 검증
    if (!content || !password) {
      res.status(400).json({ message: 'Content and password are required' });
    }

    // 해당 ID의 댓글 찾기
    const comment = await CommentModel.findById(req.params.id);

    if (!comment) {
      res.status(404).json({ message: 'Comment not found' });
    }

    // 비밀번호 검증
    const isPasswordValid = await comment?.comparePassword(password);

    if (!isPasswordValid) {
      res.status(401).json({ message: 'Invalid password' });
    }

    // 댓글 내용 업데이트
    if (comment) {
      comment.content = content;
      await comment?.save();
    }

    res.status(200).json({
      message: 'Comment updated successfully',
      id: comment?._id,
      author: comment?.author,
      content: comment?.content,
      createdAt: comment?.createdAt,
      updatedAt: comment?.updatedAt,
    });
  } catch (error) {
    console.error('Error updating comment:', error);
    // res.status(500).json({ message: 'Failed to update comment' });
    next(error); // 에러 핸들링 미들웨어로 전달
  }
};

// 방명록 삭제
export const deleteComment: RequestHandler = async (
  req: Request,
  res: Response,
  next
) => {
  try {
    const { password } = req.body;

    // 입력 검증
    if (!password) {
      res.status(400).json({ message: 'Password is required' });
    }

    // 해당 ID의 댓글 찾기
    const comment = await CommentModel.findById(req.params.id);

    if (!comment) {
      res.status(404).json({ message: 'Comment not found' });
    }

    // 비밀번호 검증

    if (comment) {
      const isPasswordValid = await comment.comparePassword(password);

      if (!isPasswordValid) {
        res.status(401).json({ message: 'Invalid password' });
      }
    }

    // 댓글 삭제
    await CommentModel.findByIdAndDelete(req.params.id);

    res.status(200).json({ message: 'Comment deleted successfully' });
  } catch (error) {
    console.error('Error deleting comment:', error);
    // res.status(500).json({ message: 'Failed to delete comment' });
    next(error); // 에러 핸들링 미들웨어로 전달
  }
};
