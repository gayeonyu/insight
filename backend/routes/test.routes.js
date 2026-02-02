import express from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import Test from '../models/Test.js';
import Question from '../models/Question.js';
import Choice from '../models/Choice.js';
import { submitTest } from '../controllers/result.controller.js';

const router = express.Router();

function asyncHandler(handler) {
  return async function(req, res) {
    try {
      await handler(req, res);
    } catch (e) {
      if (e.name === 'ValidationError') {
        res.status(400).send({ message: e.message });
      } else if (e.name === 'CastError') {
        res.status(404).send({ message: e.message });
      } else {
        res.status(500).send({ message: e.message });
      }
    }
  }
}

function auth(req, res, next) {
  const authHeader = req.headers.authorization;
  if(!authHeader) {
    return res.status(401).json({ message: '토큰 없음 '});
  }

  // [0] = Bearer, [1] = Token
  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.userId;  // 유저 식별
    next();                   // 검사 통과
  } catch (error) {
    return res.status(401).json({ message: '토큰이 유효하지 않음 '});
  }
}


router.get('/', asyncHandler(async (req, res) => {
  const sort = req.query.sort;
  const sortOption = { createdAt: sort === 'oldest' ? 'asc' : 'desc'};

  // DB 객체 조회
  const tests = await Test.find().sort(sortOption);
  res.json(tests);
}));

router.get('/:id', asyncHandler(async (req, res) => {
  const test = await Test.findById(req.params.id);

  if (!test) {
    return res.status(404).json({ message: '테스트 없음' });
  }

  res.json(test);
}));

// 테스트 질문 불러오기
router.get('/:id/questions', asyncHandler(async (req, res) => {
  const questions = await Question.find({ testId: req.params.id })
    .sort({ order: 1 })
    .lean();

  const questionIds = questions.map(q => q._id);

  const choices = await Choice.find({
    questionId: {$in: questionIds }
  }).lean();

  // 질문마다 새 객체를 만들어 반환
  const questionMap = questions.map(q => ({
    ...q, // 기존 질문 데이터 그대로 복사
    choices: choices.filter(c => String(c.questionId) === String(q._id)), // 질문에 해당하는 것만 추림
  }));

  // 클라이언트(프론트)에 전달
  res.json(questionMap);
}));

// 테스트 결과 생성
router.post('/:id/submit', auth, submitTest);

// 좋아요
router.post('/:id/like', auth, asyncHandler(async (req, res) => {
  const testId = req.params.id;
  const user = await User.findById(req.userId);

  if (!user) {
    return res.status(404).json({ message: '유저를 찾을 수 없음' });
  }

  const isLiked = user.likedTests.includes(testId);

  if (!isLiked) {
    // 좋아요 추가
    user.likedTests.push(testId);
    await user.save();
    return res.status(200).json({ message: '좋아요 추가 완료', liked: true });
  } else {
    // 좋아요 제거
    user.likedTests = user.likedTests.filter(id => id.toString() !== testId);
    await user.save();
    return res.status(200).json({ message: '좋아요 제거 완료 ', liked: false });
  }
}));

export default router;