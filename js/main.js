window.addEventListener('scroll', function() {
  var topnav = document.querySelector('.topnav');
  var scrollPosition = window.scrollY;
  var maxOpacityChangeDistance = 500; 

  var opacity = 0.1 + (scrollPosition / maxOpacityChangeDistance) * (1 - 0.1);
  opacity = Math.min(opacity, 1); // 确保透明度不超过1

  topnav.style.backgroundColor = 'rgba(0, 0, 0, ' + opacity + ')';
});

var blogEvents;  

document.addEventListener('DOMContentLoaded', function() {
  var calendarEl = document.getElementById('calendar');
  var calendar = new FullCalendar.Calendar(calendarEl, {
    initialView: 'dayGridMonth',
    eventClick: function(info) {
      window.open(info.event.url, '_blank');
      info.jsEvent.preventDefault();
    },
  });
  calendar.render();

  fetch('https://griedzx.github.io/index.json')
    .then(response => response.json())
    .then(articles => {
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
        url: article.uri,
      }));

      calendar.addEventSource(events);
      calendar.render();

      blogEvents = events;
    })
    .catch(error => console.error('Error:', error));
});