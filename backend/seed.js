// 테스트 시딩

import mongoose from 'mongoose';
import dotenv from 'dotenv';

import Test from './models/Test.js';
import Question from './models/Question.js';
import Choice from './models/Choice.js';

dotenv.config();

const seed = async() => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB connected');

    await Test.deleteMany();
    await Question.deleteMany();
    await Choice.deleteMany();

    console.log('기존 데이터 삭제 완료');

    // 테스트 생성
    const test = await Test.create({
      title: '간단 MBTI 검사',
      description: '당신의 성격을 16가지 유형으로 분석하다',
      thumbnail: './assets/images/thumbnail_mbti.png',
      banner: './assets/images/banner_mbti.png',
      isPublished: true,
    });

    // 질문 생성
    const q1 = await Question.create({
      testId: test._id,
      text: '1. 사람들과 함께 있으면 에너지가 충전된다.',
      order: 1,
    });

    const q2 = await Question.create({
      testId: test._id,
      text: '2. 새롭고 예측 불가능한 아이디어가 좋다.',
      order: 2,
    });

    const q3 = await Question.create({
      testId: test._id,
      text: '3. 감정이 동요되고 공감되는 주장이 좋다.',
      order: 3,
    });

    const q4 = await Question.create({
      testId: test._id,
      text: '4. 내가 사용하는 공간이 깨끗, 정돈된 게 좋다.',
      order: 4,
    });

    const q5 = await Question.create({
      testId: test._id,
      text: '5. 낯을 가린다.',
      order: 5,
    });

    const q6 = await Question.create({
      testId: test._id,
      text: '6. 정체불명의 괴물이 나를 습격하는 상상이 안 된다.',
      order: 6,
    });

    const q7 = await Question.create({
      testId: test._id,
      text: '7. 온갖 논리가 오가는 섬세한 토론을 좋아한다.',
      order: 7,
    });

    const q8 = await Question.create({
      testId: test._id,
      text: '8. 친구가 1시간 뒤에 만나자고 갑자기 제안하는 게 싫다.',
      order: 8,
    });

    const q9 = await Question.create({
      testId: test._id,
      text: '9. 모임에 나가면 목소리가 크고 모임을 주도하는 편이다.',
      order: 9,
    });

    const q10 = await Question.create({
      testId: test._id,
      text: '10. 추상적인, 철학적인 질문이 싫다.',
      order: 10,
    });

    const q11 = await Question.create({
      testId: test._id,
      text: '11. 친구에게 무슨 얘기를 들었을 때 왜?부터 튀어나오는 편이다.',
      order: 11,
    });

    const q12 = await Question.create({
      testId: test._id,
      text: '12. 대부분 모든 일에 계획을 세우는 편이다.',
      order: 12,
    });

    // 선택지 생성
    await Choice.insertMany([
      {
        questionId: q1._id,
        text: '그렇다',
        dimension: 'EI',
        value: 'E',
      },
      {
        questionId: q1._id,
        text: '아니다',
        dimension: 'EI',
        value: 'I',
      },
      {
        questionId: q5._id,
        text: '그렇다',
        dimension: 'EI',
        value: 'E',
      },
      {
        questionId: q5._id,
        text: '아니다',
        dimension: 'EI',
        value: 'I',
      },
      {
        questionId: q9._id,
        text: '그렇다',
        dimension: 'EI',
        value: 'E',
      },
      {
        questionId: q9._id,
        text: '아니다',
        dimension: 'EI',
        value: 'I',
      },
      {
        questionId: q2._id,
        text: '그렇다',
        dimension: 'SN',
        value: 'N',
      },
      {
        questionId: q2._id,
        text: '아니다',
        dimension: 'SN',
        value: 'S',
      },
      {
        questionId: q6._id,
        text: '그렇다',
        dimension: 'SN',
        value: 'S',
      },
      {
        questionId: q6._id,
        text: '아니다',
        dimension: 'SN',
        value: 'N',
      },
      {
        questionId: q10._id,
        text: '그렇다',
        dimension: 'SN',
        value: 'S',
      },
      {
        questionId: q10._id,
        text: '아니다',
        dimension: 'SN',
        value: 'N',
      },
      {
        questionId: q3._id,
        text: '그렇다',
        dimension: 'TF',
        value: 'F',
      },
      {
        questionId: q3._id,
        text: '아니다',
        dimension: 'TF',
        value: 'T',
      },
      {
        questionId: q7._id,
        text: '그렇다',
        dimension: 'TF',
        value: 'T',
      },
      {
        questionId: q7._id,
        text: '아니다',
        dimension: 'TF',
        value: 'F',
      },
      {
        questionId: q11._id,
        text: '그렇다',
        dimension: 'TF',
        value: 'T',
      },
      {
        questionId: q11._id,
        text: '아니다',
        dimension: 'TF',
        value: 'F',
      },
      {
        questionId: q4._id,
        text: '그렇다',
        dimension: 'JP',
        value: 'J',
      },
      {
        questionId: q4._id,
        text: '아니다',
        dimension: 'JP',
        value: 'P',
      },
      {
        questionId: q8._id,
        text: '그렇다',
        dimension: 'JP',
        value: 'J',
      },
      {
        questionId: q8._id,
        text: '아니다',
        dimension: 'JP',
        value: 'P',
      },
      {
        questionId: q12._id,
        text: '그렇다',
        dimension: 'JP',
        value: 'J',
      },
      {
        questionId: q12._id,
        text: '아니다',
        dimension: 'JP',
        value: 'P',
      },
    ]);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

seed();
