import { showLoading, hideLoading } from "../ui/loading.js";

const URL = 'http://localhost:3000/api/auth/signup';
const form = document.querySelector("form");
const message = document.querySelector('#message');

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const username = document.querySelector("#username").value;
  const nickname = document.querySelector("#nickname").value;
  const password = document.querySelector("#password").value;

  // 프론트 유효성 검사
  if (!username || !nickname || !password) {
    alert("모든 항목을 입력해주세요.");
    return;
  } 

  if (username.length < 3) {
    message.textContent = '아이디는 3자 이상 입력하세요.';
    return ;
  }

  if (nickname.length < 2) {
    message.textContent = '닉네임은 2자 이상 입력하세요.';
    return ;
  }

  if (password.length < 8) {
    message.textContent = '비밀번호는 8자 이상 입력하세요.';
    return ;
  }

  try {
    // API 요청
    const res = await fetch(URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username,
        nickname,
        password,
      }),
    });

    // 응답 해석
    const data = await res.json();

    if (!res.ok) {
      // 서버 응답 에러
      message.textContent = data.message || '회원가입에 실패했습니다.';
      return;
    }

    // 성공 
    message.textContent = '회원가입에 성공했습니다. 로그인 페이지로 이동합니다.';
    setTimeout(() => {
      window.location.href = '/login.html';
    }, 1000);
    
  } catch (error) {
    console.error(error);
    message.textContent = '서버와 통신할 수 없습니다.';
  }
});