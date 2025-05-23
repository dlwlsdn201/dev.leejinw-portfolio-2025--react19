// src/models/commentModel.ts
import mongoose, { Document, Schema } from 'mongoose';
import bcryptjs from 'bcryptjs';

// Comment Document 인터페이스 정의
export interface IComment extends Document {
  author: string;
  content: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
  comparePassword(candidatePassword: string): Promise<boolean>;
}

// Comment 스키마 정의
const commentSchema = new Schema<IComment>(
  {
    author: {
      type: String,
      required: [true, '이름은 필수입니다'],
      trim: true,
      maxlength: [50, '이름은 최대 50자까지 가능합니다'],
    },
    content: {
      type: String,
      required: [true, '내용은 필수입니다'],
      trim: true,
    },
    password: {
      type: String,
      required: [true, '비밀번호는 필수입니다'],
      minlength: [4, '비밀번호는 최소 4자 이상이어야 합니다'],
    },
  },
  {
    timestamps: true, // createdAt, updatedAt 자동 생성
  }
);

// 비밀번호 해싱 미들웨어
commentSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();

  try {
    const salt = await bcryptjs.genSalt(10);
    this.password = await bcryptjs.hash(this.password, salt);
    next();
  } catch (error) {
    next(error as Error);
  }
});

// 비밀번호 검증 메소드
commentSchema.methods.comparePassword = async function (
  candidatePassword: string
): Promise<boolean> {
  return await bcryptjs.compare(candidatePassword, this.password);
};

// Comment 모델 생성
export const CommentModel = mongoose.model<IComment>(
  'comment',
  commentSchema,
  'comments'
); // 첫 번째 인자: name, 세 번째 인자: collection name(기본형: name의 복수형)
