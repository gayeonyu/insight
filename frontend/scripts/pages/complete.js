const URL = 'http://localhost:3000/api/users/me/complete';

document.addEventListener('DOMContentLoaded', () => {
  const token = localStorage.getItem('token');

  fetch(URL, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then(res => {
      if (!res.ok) throw new Error('완료한 테스트 불러오기 실패');
      return res.json();
    })
    .then(results => renderTests(results))
    .catch(err => {
      console.error(err);
      location.href="404.html";
    });
});

function renderTests(results) {
  const testList = document.querySelector('.test-list');
  testList.innerHTML = '';

  results.forEach(result => {
    const test = result.testId; // populate된 Test
    const testEl = document.createElement('div');
    testEl.className = 'test';

    testEl.innerHTML = `
      <a class="test-click" href="result.html?resultId=${result._id}">
        <div class="test-thumbnail">
          <img src="${test.thumbnail || ''}">
        </div>
      </a>
      <h4 class="bold">${test.title}</h4>
    `;

    testList.appendChild(testEl);
  });
}