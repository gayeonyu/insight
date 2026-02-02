document.addEventListener('DOMContentLoaded', () => {
  const mypageBtn = document.querySelector('#mypage-btn');

  if (!mypageBtn) {
    return ;
  }

  mypageBtn.addEventListener('click', (e) => {
    e.preventDefault();

    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');

    if (!token || !userId) {
      location.href = 'login.html';
    } else {
      location.href = `mypage.html`;
    }
  });
});