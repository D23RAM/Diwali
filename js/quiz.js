/* quiz.js — multiple choice quiz with progress, feedback, results and restart */
(() => {
  const Q = [
    ['After defeating Ravana and 14 years of exile, who returns to Ayodhya in the Ramayana?', ['Shri Ram', 'Hanuman alone', 'Krishna', 'Arjun'], 0, 'Ayodhya lit lamps to welcome Ram, Sita and Lakshman home.'],
    ['Which goddess of prosperity is welcomed on Diwali night?', ['Maa Saraswati', 'Maa Lakshmi', 'Maa Durga', 'Maa Ganga'], 1, 'Lakshmi is the goddess of prosperity and well-being.'],
    ['Which goddess represents knowledge, music and learning?', ['Maa Saraswati', 'Maa Lakshmi', 'Maa Parvati', 'Maa Sita'], 0, 'Saraswati stands for wisdom and the arts.'],
    ['What does Diwali symbolise?', ['Light over darkness', 'The harvest only', 'The end of summer', 'A royal coronation'], 0, 'Light over darkness, and knowledge over ignorance.'],
    ['What is a diya?', ['A sweet', 'A small oil lamp', 'A rangoli colour', 'A drum'], 1, 'A diya is a small lamp, traditionally clay, with oil and a wick.'],
    ['What is rangoli?', ['Floor art made with colour, rice flour or petals', 'A type of sweet', 'A prayer book', 'A musical instrument'], 0, 'Rangoli decorates entrances and welcomes guests and blessings.'],
    ['Which deity, remover of obstacles, is worshipped with Lakshmi in many Diwali pujas?', ['Ganesha', 'Indra', 'Kartikeya', 'Varuna'], 0, 'Ganesha is invoked at the start of auspicious beginnings.'],
    ['In what year did the first Indian contract labourers arrive in Suriname?', ['1863', '1873', '1903', '1945'], 1, 'The Lalla Rookh arrived in Paramaribo in 1873.'],
    ['Which language developed among Hindustani communities in Suriname?', ['Sarnámi', 'Tamil', 'Bengali', 'Marathi'], 0, 'Sarnámi (Sarnami Hindustani) is spoken by many Surinamese Hindustanis.']
  ];
  const titles = [[9, 'Diwali Master'], [7, 'Bright Flame'], [5, 'Glowing Diya'], [0, 'Spark of Curiosity']];
  const box = document.getElementById('quizbox'); let i, score;
  const el = (t, txt, cls) => { const e = document.createElement(t); if (txt) e.textContent = txt; if (cls) e.className = cls; return e; };

  function show() {
    const [q, o, a, why] = Q[i];
    const bar = el('div', '', 'bar'); bar.innerHTML = `<i style="width:${i / Q.length * 100}%"></i>`;
    const opts = el('div', '', 'opts'), fb = el('p'); fb.setAttribute('aria-live', 'polite');
    o.forEach((t, k) => { const b = el('button', t); b.type = 'button'; b.onclick = () => {
      opts.querySelectorAll('button').forEach((x, n) => { x.disabled = true; if (n === a) x.classList.add('ok'); });
      if (k === a) score++; else b.classList.add('no');
      fb.textContent = (k === a ? 'Correct! ' : 'Not quite. ') + why;
      const nx = el('button', i + 1 < Q.length ? 'Next question' : 'See results'); nx.type = 'button'; nx.onclick = () => { i++; i < Q.length ? show() : end(); }; box.append(nx); nx.focus(); }; opts.append(b); });
    box.replaceChildren(el('p', `Question ${i + 1} of ${Q.length}`), bar, el('h3', q), opts, fb);
  }
  function end() {
    const t = titles.find(([m]) => score >= m * Q.length / 9)[1];
    const r = el('button', 'Play again'); r.type = 'button'; r.onclick = start;
    box.replaceChildren(el('h3', `${score} / ${Q.length}`), el('p', `You earned the title: ${t}`), r);
  }
  function start() { i = 0; score = 0; show(); }
  start();
})();
