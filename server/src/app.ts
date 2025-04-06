// src/app.ts
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './config/db';
import commentRoutes from './routes/commentRoutes';

// 환경변수 설정
dotenv.config();

// 데이터베이스 연결
connectDB();

const app = express();
const PORT = process.env.PORT || 5000;

// 미들웨어
app.use(cors());
app.use(express.json());

// 라우트
app.use('/api/comments', commentRoutes);

// 기본 라우트
app.get('/', (req, res) => {
  res.send('Portfolio Blog API with MongoDB is running...');
});

// 에러 핸들링 미들웨어
app.use(
  (
    err: any,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    console.error(err.stack);
    res.status(500).json({
      message: 'Something went wrong!',
      error: process.env.NODE_ENV === 'development' ? err.message : undefined,
    });
  }
);

// 서버 시작
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app;
