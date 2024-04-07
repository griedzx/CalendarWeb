window.addEventListener('scroll', function() {
  var topnav = document.querySelector('.topnav');
  var scrollPosition = window.pageYOffset;
  var maxOpacityChangeDistance = 500; // 你可以根据需要调整这个值

  var opacity = 0.1 + (scrollPosition / maxOpacityChangeDistance) * (1 - 0.1);
  opacity = Math.min(opacity, 1); // 确保透明度不超过1

  topnav.style.backgroundColor = 'rgba(225, 225, 225, ' + opacity + ')';
});

var blogEvents;  // 定义一个全局变量来保存博客事件

document.addEventListener('DOMContentLoaded', function() {
  var calendarEl = document.getElementById('calendar');

  var calendar = new FullCalendar.Calendar(calendarEl, {
    initialView: 'dayGridMonth'
  });

  calendar.render();

  // 使用 fetch API 从你的博客获取文章数据
  fetch('https://griedzx.github.io/index.json')
    .then(response => response.json())
    .then(articles => {
      // 创建一个新的数组，该数组只包含每个标题的最新文章
      const events = articles.reduce((acc, current) => {
        const x = acc.find(item => item.title === current.title);
        if (!x) {
          return acc.concat([current]);
        } else {
          return acc;
        }
      }, []).map(article => ({
        title: article.title,
        start: article.date,
        url: article.RelPermalink,  // 修改这一行
      }));

      // 将转换后的数据添加到日历的 events 中
      calendar.addEventSource(events);
      calendar.render();

      // 保存博客事件到全局变量中
      blogEvents = events;
    })
    .catch(error => console.error('Error:', error));
});

document.getElementById('blogEventsCheckbox').addEventListener('change', function() {
  var calendar = new FullCalendar.Calendar(document.getElementById('calendar'), {
    initialView: 'dayGridMonth'
  });

  if (this.checked) {
    // 如果复选框被选中，添加博客文章事件
    calendar.addEventSource(blogEvents);
    alert('Checkbox is checked. Blog events are added.');
  } else {
    // 如果复选框没有被选中，移除博客文章事件
    calendar.getEvents().forEach(function(event) {
      if (event.source === blogEvents) {
        event.remove();
      }
    });
    alert('Checkbox is not checked. Blog events are removed.');
  }
});