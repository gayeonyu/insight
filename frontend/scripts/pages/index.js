const URL = 'http://localhost:3000/api/tests';

// 테스트 목록 불러오기
document.addEventListener('DOMContentLoaded', () => {
  fetch(URL)
    .then(res => res.json())
    .then(tests => {
      renderTests(tests);
      renderBanner(tests); })
    .catch(err => { 
      console.error(err); 
      location.href="404.html";
    });
});

// 테스트 목록 html 구현
function renderTests(tests) {
  const testList = document.querySelector('.test-list');
  testList.innerHTML = '';

  tests.forEach((test) => {
    const testEl = document.createElement('div');
    testEl.className = 'test';

    testEl.innerHTML = `
      <a class="test-click" href="entrance.html?testId=${test._id}">
        <div class="test-thumbnail">
          <img src="${test.thumbnail || ''}">
        </div>
      </a>
      <h4 class="bold">${test.title}</h4>
    `;

    testList.appendChild(testEl);
  });

  const testLinks = document.querySelectorAll('.test-click');

  testLinks.forEach((link) => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      checkToken(link.href);
    })
  })
};

function renderBanner(tests) {
  tests.forEach((test) => {
    document.querySelector('.banner-title').textContent = test.title;
    document.querySelector('.banner-text').textContent = test.description;
    document.querySelector('.banner-click').href = `entrance.html?testId=${test._id}`;

    // 이미지
    const bannerThumbnail = document.querySelector('.banner');
    bannerThumbnail.style.backgroundImage = `
      linear-gradient(
        to top,
        rgba(0, 0, 0, 0.9),
        rgba(0, 0, 0, 0.5),
        rgba(0, 0, 0, 0)
      ),
      url("${test.banner}")
      `;
    bannerThumbnail.style.backgroundSize = 'cover';
    bannerThumbnail.style.backgroundPosition = 'center';
  });
}

// 로그인 확인
function checkToken(targetUrl) {
  const token = localStorage.getItem('token');
  const userId = localStorage.getItem('userId');

  // 로그인 안 돼있으면 login 화면으로 이동
  if (!token || !userId) {
    alert("로그인 후 진행해 주세요.");
    location.href="login.html";
    return ;
  }

  // 로그인 돼있으면 테스트 입장 페이지로 이동
  location.href = targetUrl;
}