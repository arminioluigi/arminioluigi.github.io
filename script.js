// Small enhancements. The site still works if this file fails to load.

(function () {
  const root = document.documentElement;

  /* ---------- Light / dark toggle ---------- */
  const themeBtn = document.getElementById('theme-toggle');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');

  function currentTheme() {
    return root.getAttribute('data-theme') || (prefersDark.matches ? 'dark' : 'light');
  }
  function updateThemeIcon() {
    const icon = themeBtn.querySelector('i');
    icon.className = currentTheme() === 'dark' ? 'fa-solid fa-sun' : 'fa-solid fa-moon';
  }
  themeBtn.addEventListener('click', function () {
    const next = currentTheme() === 'dark' ? 'light' : 'dark';
    root.setAttribute('data-theme', next);
    try { localStorage.setItem('theme', next); } catch (e) {}
    updateThemeIcon();
  });
  prefersDark.addEventListener('change', updateThemeIcon);
  updateThemeIcon();

  /* ---------- Mobile menu ---------- */
  const menuBtn = document.getElementById('menu-toggle');
  const nav = document.getElementById('site-nav');
  function setMenu(open) {
    nav.classList.toggle('is-open', open);
    menuBtn.setAttribute('aria-expanded', String(open));
    menuBtn.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    menuBtn.querySelector('i').className = open ? 'fa-solid fa-xmark' : 'fa-solid fa-bars';
  }
  menuBtn.addEventListener('click', function () { setMenu(!nav.classList.contains('is-open')); });
  nav.addEventListener('click', function (e) { if (e.target.closest('a')) setMenu(false); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') setMenu(false); });

  /* ---------- Highlight the section you're reading in the menu ---------- */
  const links = Array.from(nav.querySelectorAll('a[href^="#"]'));
  const sections = links.map(a => document.querySelector(a.getAttribute('href'))).filter(Boolean);
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        links.forEach(a => a.classList.toggle('is-current', a.getAttribute('href') === '#' + entry.target.id));
      });
    }, { rootMargin: '-40% 0px -55% 0px' });
    sections.forEach(s => observer.observe(s));
  }

  /* ---------- Publication filters ---------- */
  const chips = document.querySelectorAll('.filters .chip');
  const pubs = document.querySelectorAll('.pub');
  chips.forEach(function (chip) {
    chip.addEventListener('click', function () {
      const type = chip.dataset.filter;
      chips.forEach(c => {
        const on = c === chip;
        c.classList.toggle('is-active', on);
        c.setAttribute('aria-pressed', String(on));
      });
      pubs.forEach(p => { p.hidden = type !== 'all' && p.dataset.type !== type; });
    });
  });

  /* ---------- "Cite" buttons copy the citation ---------- */
  document.querySelectorAll('.cite-btn').forEach(function (btn) {
    const original = btn.innerHTML;
    btn.addEventListener('click', async function () {
      try {
        await navigator.clipboard.writeText(btn.dataset.cite);
        btn.classList.add('copied');
        btn.innerHTML = '<i class="fa-solid fa-check" aria-hidden="true"></i>Copied';
        setTimeout(function () { btn.classList.remove('copied'); btn.innerHTML = original; }, 1800);
      } catch (e) {
        window.prompt('Copy this citation:', btn.dataset.cite);
      }
    });
  });

  /* ---------- Network pattern behind the header ---------- */
  const svg = document.getElementById('hero-network');
  if (svg) {
    const W = 1400, H = 460, NS = 'http://www.w3.org/2000/svg';
    let seed = 20261120;                       // change this number for a different pattern
    const rand = () => (seed = (seed * 16807) % 2147483647) / 2147483647;

    svg.setAttribute('viewBox', `0 0 ${W} ${H}`);
    svg.setAttribute('preserveAspectRatio', 'xMidYMid slice');

    const nodes = [];
    for (let i = 0; i < 90; i++) {
      nodes.push({ x: rand() * W, y: rand() * H, hub: rand() < 0.1 });
    }

    const edges = document.createElementNS(NS, 'g');
    edges.setAttribute('stroke', 'currentColor');
    edges.setAttribute('stroke-width', '1');
    const maxD = 150;
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const d = Math.hypot(nodes[i].x - nodes[j].x, nodes[i].y - nodes[j].y);
        if (d < maxD) {
          const line = document.createElementNS(NS, 'line');
          line.setAttribute('x1', nodes[i].x); line.setAttribute('y1', nodes[i].y);
          line.setAttribute('x2', nodes[j].x); line.setAttribute('y2', nodes[j].y);
          line.setAttribute('stroke-opacity', (0.32 * (1 - d / maxD)).toFixed(3));
          edges.appendChild(line);
        }
      }
    }
    svg.appendChild(edges);

    const dots = document.createElementNS(NS, 'g');
    dots.setAttribute('fill', 'currentColor');
    nodes.forEach(function (n) {
      const c = document.createElementNS(NS, 'circle');
      c.setAttribute('cx', n.x); c.setAttribute('cy', n.y);
      c.setAttribute('r', n.hub ? 4.5 : 2.2);
      c.setAttribute('fill-opacity', n.hub ? '0.75' : '0.4');
      dots.appendChild(c);
    });
    svg.appendChild(dots);
  }
})();
