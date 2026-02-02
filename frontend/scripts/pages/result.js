document.addEventListener('DOMContentLoaded', async () => {
  const params = new URLSearchParams(window.location.search);
  const resultId = params.get('resultId');

  if (!resultId) {
    alert('결과 ID가 없습니다.');
    return;
  }

  try {
    const res = await fetch(`http://localhost:3000/api/result/${resultId}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });

    if (!res.ok) {
      throw new Error('결과 조회 실패');
    }

    const result = await res.json();

    document.querySelector('.result-title').textContent = result.resultTitle;
    document.querySelector('.result-content').textContent = result.resultContent;

  } catch (err) {
    console.error(err);
    alert('결과를 불러올 수 없습니다.');
    location.href="404.html";
  }
});
