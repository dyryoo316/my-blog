---
layout: home
title: 학습 노트
list_title: 지금까지 쓴 글
---


<div class="corner-post-list">
  <strong>글 목록</strong>
  <ul>
    {% for post in site.posts %}
    <li><a href="{{ post.url | relative_url }}">{{ post.title }}</a></li>
    {% endfor %}
  </ul>
</div>

<style>
.corner-post-list {
  position: fixed;
  top: 100px;
  right: 20px;
  width: 200px;
  max-height: 320px;
  overflow-y: auto;
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  padding: 12px 16px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  font-size: 0.85rem;
  z-index: 900;
}
.corner-post-list ul {
  list-style: none;
  padding-left: 0;
  margin: 8px 0 0;
}
.corner-post-list li {
  margin-bottom: 6px;
  line-height: 1.3;
}
.corner-post-list a {
  color: #2d3748;
  text-decoration: none;
}
.corner-post-list a:hover {
  text-decoration: underline;
}
@media (max-width: 768px) {
  .corner-post-list {
    display: none;
  }
}
</style>

부트캠프에서 배운 내용을 매일 정리하는 개발 학습 블로그입니다 ✍️<br>
배운 개념, 헷갈렸던 부분, 직접 겪은 에러 해결 과정을 정리해서 올립니다.

- 배운 것: Git, GitHub, Markdown
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