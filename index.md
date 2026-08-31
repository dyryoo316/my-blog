---
layout: home
title: 학습 BLOG
list_title: 지금까지 쓴 글
---

<div class="profile-box">
  <img src="{{ '/assets/img/profile.jpg' | relative_url }}" alt="프로필 사진" class="profile-img">
  <h3 class="profile-name">Ryoo316</h3>
  <p class="profile-bio">부트캠프 4일차 </p>
  <div class="profile-links">
    <a href="https://github.com/dyryoo316" target="_blank">GitHub</a>
    <a href="mailto:dyryoo316@gmail.com">Email</a>
  </div>
</div>

<style>
.profile-box {
  position: fixed;
  top: 100px;
  left: 20px;
  width: 180px;
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 10px;
  padding: 16px;
  text-align: center;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  z-index: 900;
}
.profile-img {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: 10px;
}
.profile-name {
  margin: 0 0 4px;
  font-size: 1.1rem;
}
.profile-bio {
  font-size: 0.8rem;
  color: #718096;
  margin: 0 0 10px;
}
.profile-links {
  display: flex;
  flex-direction: column;
  gap: 6px;
  font-size: 0.8rem;
}
.profile-links a {
  color: #2d3748;
  text-decoration: none;
}
.profile-links a:hover {
  text-decoration: underline;
}
@media (max-width: 768px) {
  .profile-box {
    display: none;
  }
}
</style>

<div class="calendar-box">
  <div class="calendar-header">
    <button id="cal-prev">‹</button>
    <span id="cal-title"></span>
    <button id="cal-next">›</button>
  </div>
  <div class="calendar-grid" id="cal-grid"></div>
</div>

<style>
.calendar-box {
  position: fixed;
  top: 340px;
  left: 20px;
  width: 180px;
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 10px;
  padding: 14px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  z-index: 900;
  font-size: 0.75rem;
}
.calendar-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
  font-weight: bold;
}
.calendar-header button {
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1rem;
  padding: 0 6px;
}
.calendar-grid {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 3px;
  text-align: center;
  position: relative;
}
.cal-day-label {
  color: #a0aec0;
  font-size: 0.7rem;
}
.cal-day {
  padding: 4px 0;
  border-radius: 4px;
  color: #cbd5e0;
}
.cal-day.has-post {
  background: #2d3748;
  color: #ffffff;
  cursor: pointer;
  font-weight: bold;
}
.cal-day.has-post:hover {
  background: #4a5568;
}
.cal-day.empty {
  visibility: hidden;
}
.cal-popup {
  position: absolute;
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 6px;
  padding: 8px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.15);
  font-size: 0.75rem;
  z-index: 1000;
  min-width: 140px;
}
.cal-popup a {
  display: block;
  color: #2d3748;
  text-decoration: none;
  padding: 4px 2px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.cal-popup a:hover {
  text-decoration: underline;
}
@media (max-width: 768px) {
  .calendar-box {
    display: none;
  }
}
</style>

<script>
var postDates = {};
{% for post in site.posts %}
  {% assign d = post.date | date: '%Y-%m-%d' %}
  if (!postDates["{{ d }}"]) postDates["{{ d }}"] = [];
  postDates["{{ d }}"].push({ title: {{ post.title | jsonify }}, url: "{{ post.url | relative_url }}" });
{% endfor %}

(function () {
  var current = new Date();
  current.setDate(1);

  var titleEl = document.getElementById('cal-title');
  var gridEl = document.getElementById('cal-grid');
  var activePopup = null;

  function closePopup() {
    if (activePopup) {
      activePopup.remove();
      activePopup = null;
    }
  }

  function showPopup(cell, posts) {
    closePopup();
    var popup = document.createElement('div');
    popup.className = 'cal-popup';

    posts.forEach(function (post) {
      var a = document.createElement('a');
      a.href = post.url;
      a.textContent = post.title;
      popup.appendChild(a);
    });

    gridEl.appendChild(popup);

    var cellRect = cell.getBoundingClientRect();
    var gridRect = gridEl.getBoundingClientRect();
    popup.style.left = (cellRect.left - gridRect.left) + 'px';
    popup.style.top = (cellRect.bottom - gridRect.top + 4) + 'px';

    activePopup = popup;
  }

  function render() {
    closePopup();
    gridEl.innerHTML = '';
    var year = current.getFullYear();
    var month = current.getMonth();

    titleEl.textContent = year + '년 ' + (month + 1) + '월';

    ['일','월','화','수','목','금','토'].forEach(function (d) {
      var label = document.createElement('div');
      label.className = 'cal-day-label';
      label.textContent = d;
      gridEl.appendChild(label);
    });

    var firstDay = new Date(year, month, 1).getDay();
    var daysInMonth = new Date(year, month + 1, 0).getDate();

    for (var i = 0; i < firstDay; i++) {
      var empty = document.createElement('div');
      empty.className = 'cal-day empty';
      gridEl.appendChild(empty);
    }

    for (var d = 1; d <= daysInMonth; d++) {
      var cell = document.createElement('div');
      cell.className = 'cal-day';
      cell.textContent = d;

      var key = year + '-' + String(month + 1).padStart(2, '0') + '-' + String(d).padStart(2, '0');
      var posts = postDates[key];

      if (posts && posts.length > 0) {
        cell.classList.add('has-post');

        if (posts.length > 1) {
          cell.textContent = d + ' •';
        }

        cell.addEventListener('click', function (posts) {
          return function (e) {
            e.stopPropagation();
            if (posts.length === 1) {
              window.location.href = posts[0].url;
            } else {
              showPopup(this, posts);
            }
          };
        }(posts));
      }

      gridEl.appendChild(cell);
    }
  }

  document.addEventListener('click', closePopup);

  document.getElementById('cal-prev').addEventListener('click', function (e) {
    e.stopPropagation();
    current.setMonth(current.getMonth() - 1);
    render();
  });
  document.getElementById('cal-next').addEventListener('click', function (e) {
    e.stopPropagation();
    current.setMonth(current.getMonth() + 1);
    render();
  });

  render();
})();
</script>

<div class="corner-post-list">
  <strong>태그별 글 목록</strong>
  <ul class="corner-tag-list">
    {% assign tags = site.tags | sort %}
    {% for tag in tags %}
      <li>
        <details>
          <summary>{{ tag[0] }} <span class="corner-tag-count">({{ tag[1].size }})</span></summary>
          <ul class="corner-tag-posts">
            {% for post in tag[1] %}
              <li><a href="{{ post.url | relative_url }}">{{ post.title }}</a></li>
            {% endfor %}
          </ul>
        </details>
      </li>
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
.corner-tag-list {
  list-style: none;
  padding-left: 0;
  margin: 8px 0 0;
}
.corner-tag-list > li {
  margin-bottom: 8px;
}
.corner-tag-list summary {
  cursor: pointer;
  font-weight: bold;
  outline: none;
}
.corner-tag-count {
  color: #a0aec0;
  font-weight: normal;
  font-size: 0.8rem;
}
.corner-tag-posts {
  list-style: none;
  padding-left: 8px;
  margin: 6px 0 0;
}
.corner-tag-posts li {
  margin-bottom: 4px;
  line-height: 1.3;
}
.corner-tag-posts a {
  color: #2d3748;
  text-decoration: none;
}
.corner-tag-posts a:hover {
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

  // ── 공휴일 목록 (근무일 계산용, 확인 후 필요시 수정) ──
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

  // from ~ to(포함하지 않음) 사이 근무일 수 세기
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

  var oneDay = 1000 * 60 * 60 * 24;

  // ── 1. "N일차" 표시용: 근무일(평일) 수 ──
  var todayForCount = new Date(today);
  todayForCount.setDate(todayForCount.getDate() + 1); // to는 미포함이라 +1
  var workdaysDone = countWorkdays(startDate, todayForCount);
  if (workdaysDone < 1) workdaysDone = 1;

  document.getElementById('bootcamp-day').textContent = '부트캠프 ' + workdaysDone + '일차';

  // ── 2. 퍼센트 바용: 그냥 통째로 센 달력 일수 ──
  var totalDays = Math.round((endDate - startDate) / oneDay) + 1; // 174
  var dayCount = Math.round((today - startDate) / oneDay) + 1;
  if (dayCount < 1) dayCount = 1;
  if (dayCount > totalDays) dayCount = totalDays;

  var percent = Math.round((dayCount / totalDays) * 100);
  document.getElementById('bootcamp-progress-bar').style.width = percent + '%';
  document.getElementById('bootcamp-progress-label').textContent =
    dayCount + ' / ' + totalDays + '일 (' + percent + '%)';
})();
</script>