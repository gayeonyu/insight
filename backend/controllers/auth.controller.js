import User from '../models/User.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

// 회원가입 처리
export const signup = async (req, res) => {
  try {
    const { username, nickname, password } = req.body;

    // 필수값 검사
    if (!username || !nickname || !password) {
      return res.status(400).json({
        message: '모든 항목을 입력해 주세요.',
      });
    }

    // 길이 검사
    if (password.length < 8) {
      return res.status(400).json({
        message: '비밀번호는 8자 이상 입력하세요.',
      });
    }

    if (username.length < 3) {
      return res.status(400).json({
        message: '아이디는 3자 이상 입력하세요.',
      });
    }

    if (nickname.length < 2) {
      return res.status(400).json({
        message: '닉네임은 2자 이상 입력하세요.',
      });
    }

    // 아이디 중복 검사
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(409).json({
        message: '이미 존재하는 아이디입니다.',
      });
    }

    // 비밀번호 해싱
    const hashedPassword = await bcrypt.hash(password, 10);

    // 유저 생성
    const user = await User.create({
      username,
      nickname,
      password: hashedPassword,
    });

    // 응답
    return res.status(201).json({
      message: '회원가입 성공',
      userId: user._id,
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      messgae: '서버 오류',
    });
  }
};

// 로그인 처리
export const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    // 필수값 검사
    if (!username || !password) {
      return res.status(400).json({
        message: '모든 항목을 입력하세요.',
      });
    }

    // 아이디 검색
    const existingUser = await User.findOne({ username });

    // 아이디 없을 시
    if (!existingUser) {
      return res.status(404).json({
        message: '존재하지 않는 아이디입니다.',
      });
    }

    // 비밀번호 비교
    const isMatch = await bcrypt.compare(
      password,
      existingUser.password
    );

    // 비밀번호 틀렸을 시
    if (!isMatch) {
      return res.status(401).json({
        message: '비밀번호가 틀립니다.',
      });
    }

    const token = jwt.sign(
      {
        userId: existingUser._id,
        username: existingUser.username,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: process.env.JWT_EXPIRES_IN,
      }
  );

    // 응답
    return res.status(200).json({
      message: '환영합니다.',
      token,
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: '서버 오류',
    });
  }
};