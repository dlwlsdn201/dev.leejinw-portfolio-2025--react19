// src/controllers/commentController.ts
import { Request, Response } from 'express';
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
export const createComment = async (req: Request, res: Response) => {
  try {
    const { auth, content, password } = req.body;

    // 입력 검증
    if (!auth || !content || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const newComment = new CommentModel({
      auth,
      content,
      password,
    });

    const savedComment = await newComment.save();

    // 비밀번호 제외하고 응답
    const responseComment = {
      id: savedComment._id,
      auth: savedComment.auth,
      content: savedComment.content,
      createdAt: savedComment.createdAt,
      updatedAt: savedComment.updatedAt,
    };

    res.status(201).json(responseComment);
  } catch (error) {
    console.error('Error creating comment:', error);
    res.status(500).json({ message: 'Failed to create comment' });
  }
};

// 방명록 수정
export const updateComment = async (req: Request, res: Response) => {
  try {
    const { content, password } = req.body;

    // 입력 검증
    if (!content || !password) {
      return res
        .status(400)
        .json({ message: 'Content and password are required' });
    }

    // 해당 ID의 댓글 찾기
    const comment = await CommentModel.findById(req.params.id);

    if (!comment) {
      return res.status(404).json({ message: 'Comment not found' });
    }

    // 비밀번호 검증
    const isPasswordValid = await comment.comparePassword(password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid password' });
    }

    // 댓글 내용 업데이트
    comment.content = content;
    await comment.save();

    res.status(200).json({
      message: 'Comment updated successfully',
      id: comment._id,
      name: comment.auth,
      content: comment.content,
      createdAt: comment.createdAt,
      updatedAt: comment.updatedAt,
    });
  } catch (error) {
    console.error('Error updating comment:', error);
    res.status(500).json({ message: 'Failed to update comment' });
  }
};

// 방명록 삭제
export const deleteComment = async (req: Request, res: Response) => {
  try {
    const { password } = req.body;

    // 입력 검증
    if (!password) {
      return res.status(400).json({ message: 'Password is required' });
    }

    // 해당 ID의 댓글 찾기
    const comment = await CommentModel.findById(req.params.id);

    if (!comment) {
      return res.status(404).json({ message: 'Comment not found' });
    }

    // 비밀번호 검증
    const isPasswordValid = await comment.comparePassword(password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid password' });
    }

    // 댓글 삭제
    await CommentModel.findByIdAndDelete(req.params.id);

    res.status(200).json({ message: 'Comment deleted successfully' });
  } catch (error) {
    console.error('Error deleting comment:', error);
    res.status(500).json({ message: 'Failed to delete comment' });
  }
};
