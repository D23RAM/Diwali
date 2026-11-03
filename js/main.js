/* main.js — navigation and the hero's floating decorations */
(() => {
  const toggle = document.querySelector('.nav-toggle');
  const menu = document.getElementById('menu');
  const setOpen = o => { menu.classList.toggle('open', o); toggle.setAttribute('aria-expanded', o); };
  toggle.addEventListener('click', () => setOpen(!menu.classList.contains('open')));
  menu.addEventListener('click', e => { if (e.target.closest('a')) setOpen(false); });

  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const layer = document.querySelector('.floaters');
  const marigold = c => `<svg width="34" height="34" viewBox="0 0 34 34"><g fill="${c}">${[0,45,90,135].map(a=>`<ellipse cx="17" cy="9" rx="5" ry="8" transform="rotate(${a} 17 17)"/><ellipse cx="17" cy="9" rx="5" ry="8" transform="rotate(${a+22.5} 17 17)"/>`).join('')}</g><circle cx="17" cy="17" r="5" fill="#7B3FB2"/></svg>`;
  const star = `<svg width="22" height="22" viewBox="0 0 22 22"><path d="M11 0l2.5 8.5L22 11l-8.5 2.5L11 22l-2.5-8.5L0 11l8.5-2.5z" fill="#FFD34E"/></svg>`;
  for (let i = 0; i < 14; i++) { // kept small for performance
    const s = document.createElement('span');
    s.innerHTML = i % 3 === 0 ? star : marigold(i % 2 ? '#FF642D' : '#FFD34E');
    s.style.left = Math.random() * 96 + '%';
    s.style.animationDuration = 14 + Math.random() * 14 + 's';
    s.style.animationDelay = -Math.random() * 20 + 's';
    layer.appendChild(s);
  }
})();
