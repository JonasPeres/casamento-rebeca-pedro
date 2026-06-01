(function () {
  const canvas = document.getElementById('petals');
  if (!canvas) return;

  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduced) { canvas.style.display = 'none'; return; }

  const ctx = canvas.getContext('2d');
  const colors = ['#C8388B', '#F19478', '#E8C547', '#B8CDB5', '#F8B9A5'];
  let petals = [];
  let width = 0, height = 0;
  let rafId = null;

  function resize() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    width = canvas.clientWidth;
    height = canvas.clientHeight;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  function rand(min, max) { return Math.random() * (max - min) + min; }

  function spawn(initial = false) {
    return {
      x: rand(0, width),
      y: initial ? rand(0, height) : -20,
      r: rand(6, 13),
      color: colors[Math.floor(Math.random() * colors.length)],
      vy: rand(0.4, 1.1),
      vx: rand(-0.4, 0.4),
      angle: rand(0, Math.PI * 2),
      spin: rand(-0.02, 0.02),
      opacity: rand(0.55, 0.9),
    };
  }

  function init() {
    resize();
    const count = Math.min(38, Math.floor(width / 30));
    petals = Array.from({ length: count }, () => spawn(true));
  }

  function drawPetal(p) {
    ctx.save();
    ctx.translate(p.x, p.y);
    ctx.rotate(p.angle);
    ctx.globalAlpha = p.opacity;
    ctx.fillStyle = p.color;
    ctx.beginPath();
    // shape: simple petal (ellipse-ish)
    ctx.ellipse(0, 0, p.r * 0.6, p.r, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }

  function tick() {
    ctx.clearRect(0, 0, width, height);
    petals.forEach((p) => {
      p.y += p.vy;
      p.x += p.vx + Math.sin(p.y * 0.012) * 0.5;
      p.angle += p.spin;
      if (p.y - p.r > height) Object.assign(p, spawn(false));
      if (p.x < -30) p.x = width + 20;
      if (p.x > width + 30) p.x = -20;
      drawPetal(p);
    });
    rafId = requestAnimationFrame(tick);
  }

  function start() { if (!rafId) rafId = requestAnimationFrame(tick); }
  function stop()  { if (rafId) { cancelAnimationFrame(rafId); rafId = null; } }

  init();
  start();

  window.addEventListener('resize', () => { stop(); init(); start(); });
  document.addEventListener('visibilitychange', () => document.hidden ? stop() : start());
})();
