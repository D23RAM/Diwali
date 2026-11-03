/* diya.js — Light a Wish
 * Storage sits behind a tiny adapter so Supabase can replace it later:
 * swap store.load/add for async calls to a `wishes` table (id, text, color,
 * created_at, approved) and render only approved rows.
 * Only the wish text is stored — never a name or personal information. */
(() => {
  const KEY = 'deepotsav.wishes.v1';
  const store = {
    load() { try { return JSON.parse(localStorage.getItem(KEY)) || []; } catch { return []; } },
    add(w) { const all = this.load(); all.unshift(w); try { localStorage.setItem(KEY, JSON.stringify(all.slice(0, 60))); } catch {} }
  };
  const colors = ['#FFD34E', '#FF4F91', '#12B8A6', '#FF642D', '#B98CE0'];
  const $ = id => document.getElementById(id);
  const btn = $('diyaBtn'), form = $('wishForm'), text = $('wishText'), wall = $('wall');

  function render() {
    const wishes = store.load();
    wall.replaceChildren(...wishes.map(w => {
      const li = document.createElement('li');
      li.style.setProperty('--c', w.color);
      li.textContent = w.text; // textContent prevents HTML injection
      return li;
    }));
    $('empty').hidden = wishes.length > 0;
  }

  btn.addEventListener('click', () => {
    btn.classList.add('lit');
    btn.setAttribute('aria-pressed', 'true');
    btn.setAttribute('aria-label', 'Diya lit');
    form.hidden = false;
    $('hint').textContent = '';
    text.focus();
  });
  text.addEventListener('input', () => { $('count').textContent = `${text.value.length}/140`; });
  form.addEventListener('submit', e => {
    e.preventDefault();
    const t = text.value.trim();
    if (!t) return;
    store.add({ id: Date.now(), text: t, color: colors[Math.floor(Math.random() * colors.length)] });
    text.value = ''; $('count').textContent = '0/140';
    render();
    $('hint').textContent = 'Your light has joined the wall.';
  });
  render();
})();
