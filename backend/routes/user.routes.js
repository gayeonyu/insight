import express from 'express';
import User from '../models/User.js';
import jwt from 'jsonwebtoken';

const router = express.Router();

function asyncHandler(handler) {
  return async function(req, res) {
    try {
      await handler(req, res);
    } catch (e) {
      if (e.name === 'ValidationError') {
        res.status(400).sesnd({ message: e.message });
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

router.get('/me', auth, asyncHandler(async (req, res) => {
  const user = await User.findById(req.userId).select('-password');

  if (!user) {
    return res.status(404).json({ message: '유저 정보 없음' });
  }

  res.json(user);
}));

router.get('/me/complete', auth, asyncHandler(async (req, res) => {
  // User가 완료한 테스트 항목을 찾음
  const user = await User.findById(req.userId)
    .populate({
      path: 'testResults',
      populate: {
        path: 'testId',
      },
    });

  if (!user || user.testResults.length === 0) {
    return res.status(200).json([]);
  }

  res.json(user.testResults);
}));

router.get('/likes', auth, asyncHandler(async (req, res) => {
  const user = await User.findById(req.userId)
    .populate('likedTests');

    if (!user || user.likedTests.length === 0) {
      return res.status(200).json([]);
    }

    res.json(user.likedTests);
}));

export default router;