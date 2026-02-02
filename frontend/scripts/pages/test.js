const params = new URLSearchParams(location.search);
const testId = params.get('testId');

const QUESTION_URL = `http://localhost:3000/api/tests/${testId}/questions`;
const SUBMIT_URL = `http://localhost:3000/api/tests/${testId}/submit`;

let currentIndex = 0;
let answers = [];
let questions = [];

fetch(QUESTION_URL)
  .then(res => res.json())
  .then(data => {
    questions = data;
    renderQuestion();
  });

function renderQuestion() {
  const q = questions[currentIndex];
  document.querySelector('.question-content').textContent = q.text;

  const buttons = document.querySelectorAll('.answer');
  buttons.forEach((btn, idx) => {
    btn.querySelector('h5').textContent = q.choices[idx].text;

    btn.onclick = () => {
      answers.push({
        questionId: q._id,
        choiceId: q.choices[idx]._id
      });

      if (currentIndex < questions.length - 1) {
        currentIndex++;
        renderQuestion();
      } else {
        submitTest();
      }
    };
  });
}

let isSubmitting = true;

function submitTest() {
  // 중복 제출 방지
  if (!isSubmitting) return ;
  isSubmitting = false;

  const token = localStorage.getItem('token');

  fetch(SUBMIT_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ answers }),
  })
    .then(async res => {
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.message || '테스트 제출 실패')
      }

      return res.json();
      })
    .then(result => {
      location.href=`result.html?resultId=${result._id}`;
    })
    .catch(err => {
      alert(err.message);
      location.href="404.html";
    });
}