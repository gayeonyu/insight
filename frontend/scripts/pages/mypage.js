const URL = `http://localhost:3000/api/users/me`;

const userId = localStorage.getItem('userId');
const token = localStorage.getItem('token');

const logout = document.querySelector("#logout");

document.addEventListener('DOMContentLoaded', async () =>{
  if (!token || !userId) {
    alert("로그인 후 이용 가능합니다.");
    return location.href="login.html";
  }

  try {
    // http 프로토콜에서 클라이언트가 서버에 인가돼있음을 전달
    const res = await fetch(URL, {
      headers: {
        Authorization: `Bearer ${token}`,
      }, 
    });

    if (!res.ok) {
      throw new Error('유저 정보 불러오기 실패');
    }

    const data = await res.json();
    renderInformation(data);

  } catch(error) {
    console.error(error);
    alert("세션이 만료되었습니다.");
    
    localStorage.clear();
    location.href="login.html";
  }
});

// 로그아웃
logout.addEventListener("click", (e) => {
  e.preventDefault();

  localStorage.clear();
  return location.href="index.html";
});

function renderInformation(data) {
  document.querySelector('#nickname').textContent = data.nickname;
  document.querySelector('#username').textContent = data.username;
  document.querySelector("#like").textContent = data.likedTests.length;
  document.querySelector("#complete").textContent = data.testResults.length;
};