import express from 'express';
import jwt from 'jsonwebtoken';
import Result from '../models/Result.js';

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

// 테스트 결과 조회
router.get('/:id', auth, asyncHandler(async (req, res) => {
  const result = await Result.findById(req.params.id);

  if(!result) {
    return res.status(404).json({ message: '결과 없음 '});
  }

  res.json(result);
}));

export default router;