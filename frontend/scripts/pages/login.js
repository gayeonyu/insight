const URL = 'http://localhost:3000/api/auth/login';

const form = document.querySelector("form");
const message = document.querySelector("#message");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const username = document.querySelector("#username").value;
  const password = document.querySelector("#password").value;

  if (!username || !password) {
    alert("아이디와 비밀번호를 전부 입력하세요.");
    return ;
  }

  try {
    const res = await fetch(URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username,
        password,
      }),
    });

    // 응답 해석
    const data = await res.json();

    if (!res.ok) {
      message.textContent = data.message;
      return ;
    }

    // 성공
    localStorage.setItem('token', data.token); // 토큰 저장
    localStorage.setItem('userId', data.userId);
    message.textContent = '환영합니다.';
    setTimeout(() => {
      window.location.href='index.html';
    }, 1000);

  } catch (error) {
    console.error(error);
    message.textContent = '서버와 통신할 수 없습니다.';
  }

});