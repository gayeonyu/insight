const params = new URLSearchParams(window.location.search);
const testId = params.get('testId');

const heart = document.querySelector(".heart");
let clicked = false;

if (!testId) {
  alert('잘못된 접근입니다.');
  location.href = 'index.html';
}

const URL = `http://localhost:3000/api/tests/${testId}`;
const LIKE_URL = `http://localhost:3000/api/tests/${testId}/like`;

// 테스트 정보를 불러와 입장 화면 렌더링
fetch(URL)
  .then(res => res.json())
  .then(test => {
    renderTestInfo(test);
  })
  .catch(err => {
    console.log(err);
    location.href = "404.html";
  });

// 좋아요 누르면 유저 좋아요 목록에 추가
heart.addEventListener('click', () => {
  const token = localStorage.getItem('token');

  if (!token) {
    alert("로그인이 필요한 서비스입니다.");
    return ;
  }

  fetch(LIKE_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  })
    .then(res => res.json())
    .then(data => {
      clicked = data.liked;
      heart.style.color = clicked ? 'red' : 'gray';
      console.log(data.message);
    })
    .catch(err => console.error('좋아요 처리 중 에러:', err));
});

document.getElementById('startBtn').addEventListener('click', () =>{
  location.href=`test.html?testId=${testId}`;
});

function renderTestInfo(test) {
  const thumbnailEl = document.querySelector('.entrance-thumbnail');

  thumbnailEl.style.backgroundImage = `
      linear-gradient(
        to top,
        rgba(0, 0, 0, 1),
        rgba(0, 0, 0, 0.6),
        rgba(0, 0, 0, 0)
      ),
      url("${test.thumbnail}")
    `;
  thumbnailEl.style.backgroundSize = 'cover';
  thumbnailEl.style.backgroundPosition = 'center';

  document.querySelector('.entrance-title').textContent = test.title;
  document.querySelector('.entrance-desc').textContent = test.description;
}