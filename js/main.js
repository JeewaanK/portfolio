/* ─── STICKY HEADER ─────────────────────────── */
(function () {
  const h = document.querySelector('.site-header');
  if (!h) return;
  window.addEventListener('scroll', () => {
    h.classList.toggle('scrolled', window.scrollY > 12);
  }, { passive: true });
})();

/* ─── MOBILE MENU ───────────────────────────── */
(function () {
  const btn = document.querySelector('.menu-btn');
  const nav = document.querySelector('.mobile-nav');
  if (!btn || !nav) return;
  btn.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    btn.setAttribute('aria-expanded', String(open));
  });
})();

/* ─── SUBTLE FADE ON SCROLL (non-blocking) ──── */
(function () {
  // Only animate if user hasn't requested reduced motion
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const els = document.querySelectorAll('.fade-up');
  if (!els.length) return;
  // Start hidden for JS-enabled browsers only
  els.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(16px)';
    el.style.transition = 'opacity 0.55s ease, transform 0.55s ease';
  });
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.style.opacity = '1';
        e.target.style.transform = 'translateY(0)';
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.05, rootMargin: '0px 0px -20px 0px' });
  // Trigger visible elements immediately
  els.forEach(el => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight) {
      el.style.opacity = '1';
      el.style.transform = 'translateY(0)';
    } else {
      io.observe(el);
    }
  });
})();

/* ─── ACTIVE NAV LINK ───────────────────────── */
(function () {
  const page = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-link').forEach(a => {
    const href = (a.getAttribute('href') || '').split('/').pop();
    if (href === page || (page === '' && href === 'index.html')) a.classList.add('active');
  });
})();
