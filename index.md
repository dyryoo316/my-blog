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

<div class="progress-wrap">
  <div class="progress-bar" id="bootcamp-progress-bar"></div>
</div>
<div class="progress-label" id="bootcamp-progress-label"></div>

<style>
.progress-wrap {
  width: 100%;
  max-width: 400px;
  height: 14px;
  background: #e2e8f0;
  border-radius: 7px;
  overflow: hidden;
  margin: 10px 0 4px;
}
.progress-bar {
  height: 100%;
  width: 0%;
  background: #2d3748;
  transition: width 0.6s ease;
}
.progress-label {
  font-size: 0.85rem;
  color: #4a5568;
}
</style>

<script>
(function () {
  // ── 부트캠프 시작일 / 종료일 ──
  var startDate = new Date(2026, 7, 26);  // 2026-08-26
  var endDate   = new Date(2027, 1, 16);  // 2027-02-16

  // ── 공휴일 목록 (필요할 때 이 배열만 수정하면 됨) ──
  var holidays = [
    "2026-09-24", "2026-09-25", "2026-09-26", // 추석 연휴
    "2026-10-03", // 개천절
    "2026-10-09", // 한글날
    "2026-12-25", // 성탄절
    "2027-01-01", // 신정
    "2027-02-05", "2027-02-06", "2027-02-07" // 설 연휴
  ];

  function toKey(d) {
    return d.getFullYear() + "-" +
      String(d.getMonth() + 1).padStart(2, "0") + "-" +
      String(d.getDate()).padStart(2, "0");
  }

  function isWorkday(d) {
    var day = d.getDay(); // 0=일, 6=토
    if (day === 0 || day === 6) return false;
    if (holidays.indexOf(toKey(d)) !== -1) return false;
    return true;
  }

  // start ~ end(포함하지 않음) 사이 평일 수 세기
  function countWorkdays(from, to) {
    var count = 0;
    var cur = new Date(from);
    while (cur < to) {
      if (isWorkday(cur)) count++;
      cur.setDate(cur.getDate() + 1);
    }
    return count;
  }

  startDate.setHours(0, 0, 0, 0);
  endDate.setHours(0, 0, 0, 0);
  var today = new Date();
  today.setHours(0, 0, 0, 0);

  var totalWorkdays = countWorkdays(startDate, endDate); // 전체 평일 수 (분모)

  // 오늘이 포함된 날까지의 경과 평일 수 (분자)
  var todayForCount = new Date(today);
  todayForCount.setDate(todayForCount.getDate() + 1); // to는 미포함이라 +1
  var doneWorkdays = countWorkdays(startDate, todayForCount);
  if (doneWorkdays > totalWorkdays) doneWorkdays = totalWorkdays;
  if (doneWorkdays < 0) doneWorkdays = 0;

  document.getElementById('bootcamp-day').textContent = '부트캠프 ' + doneWorkdays + '일차';

  var percent = totalWorkdays > 0 ? Math.round((doneWorkdays / totalWorkdays) * 100) : 0;
  document.getElementById('bootcamp-progress-bar').style.width = percent + '%';
  document.getElementById('bootcamp-progress-label').textContent =
    doneWorkdays + ' / ' + totalWorkdays + '일 (' + percent + '%)';
})();
</script>