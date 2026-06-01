(function () {
  const target = new Date('2026-09-19T16:00:00-03:00').getTime();
  const cells = {
    days:    document.querySelector('[data-unit="days"]'),
    hours:   document.querySelector('[data-unit="hours"]'),
    minutes: document.querySelector('[data-unit="minutes"]'),
    seconds: document.querySelector('[data-unit="seconds"]'),
  };

  const pad = (n) => String(Math.max(0, n)).padStart(2, '0');

  function tick() {
    const diff = target - Date.now();
    if (diff <= 0) {
      cells.days.textContent = '00';
      cells.hours.textContent = '00';
      cells.minutes.textContent = '00';
      cells.seconds.textContent = '00';
      return;
    }
    const days    = Math.floor(diff / 86400000);
    const hours   = Math.floor((diff % 86400000) / 3600000);
    const minutes = Math.floor((diff % 3600000) / 60000);
    const seconds = Math.floor((diff % 60000) / 1000);
    cells.days.textContent    = pad(days);
    cells.hours.textContent   = pad(hours);
    cells.minutes.textContent = pad(minutes);
    cells.seconds.textContent = pad(seconds);
  }

  tick();
  setInterval(tick, 1000);
})();
