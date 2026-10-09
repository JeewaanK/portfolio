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
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const els = document.querySelectorAll('.fade-up');
  if (!els.length) return;
  // Immediately show everything first, then apply animation to off-screen elements
  els.forEach(el => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight + 100) {
      // Already visible — no animation needed
      return;
    }
    // Off-screen — set up animation
    el.style.opacity = '0';
    el.style.transform = 'translateY(16px)';
    el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
  });
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.style.opacity = '1';
        e.target.style.transform = 'translateY(0)';
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.05 });
  els.forEach(el => {
    if (el.style.opacity === '0') io.observe(el);
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

/* ─── THEME TOGGLE ──────────────────────────── */
(function () {
  const btn = document.querySelector('.theme-btn');
  if (!btn) return;
  const root = document.documentElement;
  const isDark = () => root.dataset.theme
    ? root.dataset.theme === 'dark'
    : window.matchMedia('(prefers-color-scheme: dark)').matches;
  const sync = () => btn.setAttribute('aria-pressed', String(isDark()));
  if (!root.dataset.theme && isDark()) root.dataset.theme = 'dark';
  sync();
  btn.addEventListener('click', () => {
    root.dataset.theme = isDark() ? 'light' : 'dark';
    try { localStorage.setItem('theme', root.dataset.theme); } catch (e) {}
    sync();
  });
})();

/* ─── RESEARCH FILTER ───────────────────────── */
(function () {
  const tabs = document.querySelectorAll('.filter-tab');
  if (!tabs.length) return;
  tabs.forEach(tab => tab.addEventListener('click', () => {
    const f = tab.dataset.filter;
    tabs.forEach(t => t.setAttribute('aria-pressed', String(t === tab)));
    document.querySelectorAll('.research-card[data-kind]').forEach(card => {
      card.hidden = f !== 'all' && card.dataset.kind !== f;
    });
  }));
})();

/* ─── HERO JUMP → FILTER ────────────────────── */
document.querySelectorAll('[data-jump]').forEach(a => a.addEventListener('click', () => {
  const tab = document.querySelector(`.filter-tab[data-filter="${a.dataset.jump}"]`);
  if (tab) tab.click();
}));
