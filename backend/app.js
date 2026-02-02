// 설계
import express from 'express';
import cors from 'cors';
import authRoutes from './routes/auth.routes.js';
import testRoutes from './routes/test.routes.js';
import userRoutes from './routes/user.routes.js';
import resultRoutes from './routes/result.routes.js';

const app = express();

app.use(cors());
app.use(express.json());

// 라우트
app.use('/api/auth', authRoutes);
app.use('/api/tests', testRoutes);
app.use('/api/users', userRoutes);
app.use('/api/result', resultRoutes);

export default app;