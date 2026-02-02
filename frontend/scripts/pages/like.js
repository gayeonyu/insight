const URL = `http://localhost:3000/api/users/likes`;

document.addEventListener('DOMContentLoaded', () => {
  const token = localStorage.getItem('token');

  fetch(URL, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then(res => res.json())
    .then(tests => renderLikes(tests))
    .catch(err => {
      console.log(err);
      location.href="404.html";
    });
});

function renderLikes(tests) {
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
    `

    testList.appendChild(testEl);
  });
}