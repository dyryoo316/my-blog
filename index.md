---
layout: home
title: 학습 노트
list_title: 지금까지 쓴 글
---

부트캠프에서 배운 내용을 매일 정리하는 개발 학습 블로그입니다 ✍️

배운 개념, 헷갈렸던 부분, 직접 겪은 에러 해결 과정을 정리해서 올립니다.

- 배운 것: Git, GitHub, 마크다운
- 지금 하는 것: <span id="bootcamp-day">계산 중...</span>

<script>
(function () {
  var startDate = new Date(2026, 7, 26); // 2026년 8월 26일 (월은 0부터 시작하므로 7 = 8월)
  var today = new Date();

  startDate.setHours(0, 0, 0, 0);
  today.setHours(0, 0, 0, 0);

  var diffDays = Math.floor((today - startDate) / (1000 * 60 * 60 * 24)) + 1;

  document.getElementById('bootcamp-day').textContent = '부트캠프 ' + diffDays + '일차';
})();
</script>