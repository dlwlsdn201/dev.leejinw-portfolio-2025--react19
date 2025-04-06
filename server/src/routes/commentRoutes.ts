// src/routes/commentRoutes.ts
import express from 'express';
import * as commentController from '../controllers/commentController';

const router = express.Router();

// GET - 모든 댓글 조회
router.get('/', commentController.getComments);

// // GET - 특정 댓글 조회
// router.get('/:id', commentController.getComment);

// POST - 새 댓글 생성
router.post('/', commentController.createComment);

// PUT - 댓글 수정
router.put('/:id', commentController.updateComment);

// DELETE - 댓글 삭제
router.delete('/:id', commentController.deleteComment);

export default router;
