import Choice from '../models/Choice.js';
import Result from '../models/Result.js';
import User from '../models/User.js';
import mbtiDescription from '../constants/mbtiDescriptions.js';

// mbti 결과 계산
export const submitTest = async (req, res) => {
  try {
    const { answers } = req.body;
    const userId = req.userId;
    const testId = req.params.id;

    const result = {
      EI: { E: 0, I: 0 },
      SN: { S: 0, N: 0 },
      TF: { T: 0, F: 0 },
      JP: { J: 0, P: 0 },
    };

    // 설문에 따른 mbti 증가
    for (const answer of answers) {
      const choice = await Choice.findById(answer.choiceId);
      result[choice.dimension][choice.value]++;
    }

    // 횟수 비교
    const mbti = 
      (result.EI.E >= result.EI.I ? 'E' : 'I') +
      (result.SN.S >= result.SN.N ? 'S' : 'N') +
      (result.TF.T >= result.TF.F ? 'T' : 'F') +
      (result.JP.J >= result.JP.P ? 'J' : 'P');

    // 결과 Result DB에 저장
    const saveResult = await Result.create({
      userId,
      testId,
      resultTitle: mbti,
      resultContent: mbtiDescription[mbti],
    });

    // User에 결과 연결
    await User.findByIdAndUpdate(userId, {
      $push: { testResults: saveResult._id },
    });

    // 결과 전송
    return res.status(201).json(saveResult);

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: '결과 계산 실패 '});
  }
};