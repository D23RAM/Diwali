/* rangoli.js — canvas drawing with rotational + mirror symmetry.
 * All drawing happens in coordinates relative to the canvas centre; each() replays
 * a draw function once per symmetry copy by rotating (and optionally mirroring) the context. */
(() => {
  const $ = id => document.getElementById(id), cv = $('cv'), c = cv.getContext('2d'), W = 640, M = W / 2;
  const cols = ['#FF642D', '#FF4F91', '#7B3FB2', '#12B8A6', '#FFD34E', '#FFF4E5'];
  let col = cols[4], hist = [], drawing = false, last;
  const base = () => { c.fillStyle = '#32153F'; c.fillRect(0, 0, W, W); };
  const snap = () => { hist.push(c.getImageData(0, 0, W, W)); if (hist.length > 30) hist.shift(); };
  const rnd = (a, b) => a + Math.random() * (b - a);

  function each(fn) {
    const n = +$('sym').value;
    for (let k = 0; k < n; k++) for (const flip of $('mir').checked ? [1, -1] : [1]) {
      c.save(); c.translate(M, M); c.scale(flip, 1); c.rotate(k * 2 * Math.PI / n); fn(); c.restore();
    }
  }
  function shape(t, x, y, s) {
    c.fillStyle = col; c.beginPath();
    if (t === 'dot') c.arc(x, y, s, 0, 7);
    else if (t === 'flower') for (let i = 0; i < 6; i++) { const a = i * Math.PI / 3; c.moveTo(x, y); c.ellipse(x + Math.cos(a) * s * .8, y + Math.sin(a) * s * .8, s * .7, s * .32, a, 0, 7); }
    else if (t === 'star') { for (let i = 0; i < 10; i++) { const r = i % 2 ? s * .45 : s * 1.2, a = i * Math.PI / 5 - Math.PI / 2; c.lineTo(x + r * Math.cos(a), y + r * Math.sin(a)); } c.closePath(); }
    else { c.arc(x, y, s, 0, Math.PI); c.closePath(); c.moveTo(x, y - s * .2); c.quadraticCurveTo(x + s * .35, y - s * .8, x, y - s * 1.5); c.quadraticCurveTo(x - s * .35, y - s * .8, x, y - s * .2); }
    c.fill();
  }
  const seg = (a, b) => { c.strokeStyle = col; c.lineWidth = +$('size').value; c.lineCap = 'round'; c.beginPath(); c.moveTo(a.x - M, a.y - M); c.lineTo(b.x - M, b.y - M); c.stroke(); };
  const pos = e => { const r = cv.getBoundingClientRect(); return { x: (e.clientX - r.left) * W / r.width, y: (e.clientY - r.top) * W / r.height }; };

  cv.addEventListener('pointerdown', e => {
    snap(); const p = pos(e);
    if ($('tool').value === 'brush') { drawing = true; last = p; cv.setPointerCapture(e.pointerId); each(() => seg(p, p)); }
    else each(() => shape($('tool').value, p.x - M, p.y - M, +$('size').value * 1.5));
  });
  cv.addEventListener('pointermove', e => { if (!drawing) return; const p = pos(e), l = last; each(() => seg(l, p)); last = p; });
  ['pointerup', 'pointercancel'].forEach(ev => cv.addEventListener(ev, () => drawing = false));

  const sw = $('sw');
  cols.forEach(k => { const b = document.createElement('button'); b.type = 'button'; b.style.background = k; b.setAttribute('aria-label', 'Colour ' + k); b.setAttribute('aria-pressed', k === col);
    b.onclick = () => { col = k; sw.querySelectorAll('button').forEach(x => x.setAttribute('aria-pressed', x === b)); }; sw.appendChild(b); });

  $('pat').onclick = () => { snap(); [[90, 12], [150, 18], [210, 24]].forEach(([r, n], i) => { col = cols[(i * 2 + 1) % 6]; for (let k = 0; k < n; k++) { const a = k * 2 * Math.PI / n; shape(i % 2 ? 'flower' : 'dot', M + r * Math.cos(a), M + r * Math.sin(a), 9 + i * 2); } }); };
  $('rnd').onclick = () => { snap(); base(); $('sym').value = Math.random() < .5 ? 8 : 12; $('mir').checked = true;
    for (let i = 0; i < 22; i++) { col = cols[Math.floor(Math.random() * 6)]; const r = rnd(30, 290), a = rnd(0, 0.8), t = ['flower', 'star', 'dot', 'diya'][Math.floor(Math.random() * 4)], s = rnd(6, 20);
      each(() => shape(t, r * Math.cos(a), r * Math.sin(a), s)); } };
  $('undo').onclick = () => { const h = hist.pop(); if (h) c.putImageData(h, 0, 0); };
  $('clr').onclick = () => { snap(); base(); };
  $('dl').onclick = () => { const a = document.createElement('a'); a.download = 'deepotsav-rangoli.png'; a.href = cv.toDataURL('image/png'); a.click(); };
  base();
})();
