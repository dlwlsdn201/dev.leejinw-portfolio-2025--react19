// src/app.ts
import cors from 'cors';
import dotenv from 'dotenv';
import express, { Express } from 'express';
import { connectDB } from '@config/db';
import commentRoutes from '@routes/commentRoutes';

// 환경변수 설정
dotenv.config();

// 데이터베이스 연결
connectDB();

const app: Express = express();
const PORT = process.env.PORT || 8000;
const dev = process.env.NODE_ENV !== 'production';

// 미들웨어
// app.use(cors()); // 기본값: cors() (모든 Origin을 허용하지 않음.)
app.use(
  cors({
    origin: 'http://localhost:3000', // Client 앱의 주소
    // methods: ['GET', 'POST', 'PUT', 'DELETE'], // 허용할 HTTP 메서드
    credentials: true, // 쿠키를 포함한 요청을 허용
  })
);
app.use(express.json());

// 라우트
app.use('/api', commentRoutes);

app.use('/api', (req, res, next) => {
  console.log(`[API ROUTE] ${req.method} ${req.originalUrl}`);
  next();
});

// 기본 라우트
app.get('/', (req, res) => {
  res.send('Portfolio Blog API with MongoDB is running...');
});

// 에러 핸들링 미들웨어
app.use(
  (
    err: any,
    _: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    console.error(err.stack);
    res.status(500).json({
      message: 'Something went wrong!',
      error: process.env.NODE_ENV === 'development' ? err.message : undefined,
    });

    next(err);
  }
);

// 서버 시작
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app;
