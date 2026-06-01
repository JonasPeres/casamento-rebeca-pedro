(function () {
  const root = document.getElementById('carousel');
  if (!root) return;
  const track = document.getElementById('carousel-track');
  const dotsWrap = document.getElementById('carousel-dots');
  const prev = root.querySelector('.carousel__nav--prev');
  const next = root.querySelector('.carousel__nav--next');
  const slides = Array.from(track.children);
  if (!slides.length) return;

  let dots = [];
  let autoplayId = null;
  const AUTOPLAY_MS = 6000;

  function visibleCount() {
    const w = window.innerWidth;
    if (w >= 1000) return 3;
    if (w >= 700)  return 2;
    return 1;
  }

  function pageCount() {
    return Math.max(1, slides.length - visibleCount() + 1);
  }

  function slideStride() {
    if (slides.length < 2) return slides[0].getBoundingClientRect().width;
    return slides[1].offsetLeft - slides[0].offsetLeft;
  }

  function currentIndex() {
    const stride = slideStride();
    if (!stride) return 0;
    return Math.round(track.scrollLeft / stride);
  }

  function scrollToIndex(i) {
    const max = pageCount() - 1;
    const target = Math.max(0, Math.min(i, max));
    const slide = slides[target];
    if (!slide) return;
    track.scrollTo({ left: slide.offsetLeft - track.offsetLeft, behavior: 'smooth' });
  }

  function buildDots() {
    dotsWrap.innerHTML = '';
    const n = pageCount();
    dots = [];
    for (let i = 0; i < n; i++) {
      const b = document.createElement('button');
      b.type = 'button';
      b.setAttribute('aria-label', `Ir para foto ${i + 1}`);
      b.addEventListener('click', () => { scrollToIndex(i); restartAutoplay(); });
      dotsWrap.appendChild(b);
      dots.push(b);
    }
    updateActiveDot();
  }

  function updateActiveDot() {
    const idx = Math.min(currentIndex(), dots.length - 1);
    dots.forEach((d, i) => d.classList.toggle('is-active', i === idx));
  }

  function advance() {
    const max = pageCount() - 1;
    const idx = currentIndex();
    scrollToIndex(idx >= max ? 0 : idx + 1);
  }

  function startAutoplay() {
    if (autoplayId || pageCount() <= 1) return;
    autoplayId = setInterval(advance, AUTOPLAY_MS);
  }
  function stopAutoplay() {
    if (autoplayId) { clearInterval(autoplayId); autoplayId = null; }
  }
  function restartAutoplay() { stopAutoplay(); startAutoplay(); }

  prev.addEventListener('click', () => { scrollToIndex(currentIndex() - 1); restartAutoplay(); });
  next.addEventListener('click', () => { scrollToIndex(currentIndex() + 1); restartAutoplay(); });

  let rafId = null;
  track.addEventListener('scroll', () => {
    if (rafId) cancelAnimationFrame(rafId);
    rafId = requestAnimationFrame(updateActiveDot);
  }, { passive: true });

  root.addEventListener('mouseenter', stopAutoplay);
  root.addEventListener('mouseleave', startAutoplay);
  root.addEventListener('touchstart', stopAutoplay, { passive: true });
  root.addEventListener('focusin', stopAutoplay);
  root.addEventListener('focusout', startAutoplay);
  document.addEventListener('visibilitychange', () => document.hidden ? stopAutoplay() : startAutoplay());

  // Rebuild dots ao redimensionar (muda visibleCount)
  let resizeTimer = null;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      buildDots();
      scrollToIndex(Math.min(currentIndex(), pageCount() - 1));
    }, 120);
  });

  buildDots();
  startAutoplay();
})();
