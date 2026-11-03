/* memory.js — Generations of Light archive (LocalStorage prototype).
 * Photos are downscaled to 480px JPEG before saving. Content is only inserted via textContent. */
(() => {
  const KEY = 'deepotsav.memories.v1', $ = id => document.getElementById(id);
  const load = () => { try { return JSON.parse(localStorage.getItem(KEY)) || []; } catch { return []; } };
  const save = a => { try { localStorage.setItem(KEY, JSON.stringify(a)); return true; } catch { return false; } };
  const el = (t, txt) => { const e = document.createElement(t); if (txt) e.textContent = txt; return e; };

  function render() {
    const all = load();
    $('mList').replaceChildren(...all.map(m => {
      const li = el('li'); li.append(el('b', m.title), el('small', `${m.cat} · ${m.name}`));
      if (m.img) { const i = el('img'); i.src = m.img; i.alt = 'Photo for ' + m.title; li.append(i); }
      const del = el('button', 'Delete'); del.type = 'button'; del.onclick = () => { save(load().filter(x => x.id !== m.id)); render(); };
      li.append(el('p', m.text), del); return li;
    }));
    $('gallery').replaceChildren(...all.filter(m => m.img).map(m => { const i = el('img'); i.src = m.img; i.alt = 'Photo for ' + m.title; return i; }));
  }
  const shrink = f => new Promise(res => {
    if (!f) return res('');
    const r = new FileReader();
    r.onload = () => { const im = new Image(); im.onload = () => { const s = Math.min(1, 480 / Math.max(im.width, im.height)), c = document.createElement('canvas');
      c.width = im.width * s; c.height = im.height * s; c.getContext('2d').drawImage(im, 0, 0, c.width, c.height); res(c.toDataURL('image/jpeg', .7)); }; im.onerror = () => res(''); im.src = r.result; };
    r.onerror = () => res(''); r.readAsDataURL(f);
  });
  $('memForm').addEventListener('submit', async e => {
    e.preventDefault();
    const img = await shrink($('mImg').files[0]), all = load();
    all.unshift({ id: Date.now(), title: $('mTitle').value.trim(), name: $('mName').value.trim() || 'Anonymous', cat: $('mCat').value, text: $('mText').value.trim(), img });
    $('mMsg').textContent = save(all) ? 'Saved in this browser only. It is not shared publicly.' : 'Could not save: browser storage is full. Delete an entry or use a smaller photo.';
    e.target.reset(); render();
  });
  render();
})();
