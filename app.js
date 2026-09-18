'use strict';
/* ==========================================================================
   Aetherlink x Worldline — Two-day classroom deck
   Adapted from the AetherLink training-site engine. Kept: hash navigation,
   keyboard nav, the segmented footer progress bar, per-slide dark variant,
   the "Do this now" exercise panel, all 7 layout renderers. Removed: the
   multi-squad/day picker, glossary, mascot, and the framework-mode fallback
   branches — this deck is always a single flat 78-slide array.
   New: assignment-visibility styling and the presenter-view sync (BroadcastChannel
   with a localStorage fallback) — see presenter.js for the receiving end.
   ========================================================================== */
const slides = window.SLIDES || [];
const $ = id => document.getElementById(id);
let current = 0, lastFocus = null, toastTimer;
const panel = $('panel');

function node(tag, cls, text) { const e = document.createElement(tag); if (cls) e.className = cls; if (text !== undefined) e.textContent = text; return e; }
function announce(text) { $('announcement').textContent = text; }
function notify(text) { $('toast').textContent = text; $('toast').classList.add('show'); clearTimeout(toastTimer); toastTimer = setTimeout(() => $('toast').classList.remove('show'), 2600); }
function openPanel(title, content) { lastFocus = document.activeElement; if (lastFocus instanceof HTMLElement) lastFocus.setAttribute('aria-expanded', 'true'); $('panel-title').textContent = title; $('panel-body').replaceChildren(content); panel.setAttribute('aria-labelledby', 'panel-title'); panel.showModal(); $('close-panel').focus(); }
function closePanel() { panel.close(); lastFocus?.setAttribute('aria-expanded', 'false'); lastFocus?.focus(); }
$('close-panel').addEventListener('click', closePanel);
panel.addEventListener('cancel', e => { e.preventDefault(); closePanel(); });

function showPrompt() {
  const s = slides[current], wrap = node('div');
  if (!s.prompt) { wrap.append(node('p', 'prompt-intro', 'This slide has no exact read-aloud prompt.')); openPanel('Example prompt · ' + s.title, wrap); return; }
  wrap.append(node('p', 'prompt-intro', 'Read this aloud, or paste it into Claude Code.'));
  const area = node('textarea', 'prompt-text'); area.value = s.prompt; area.readOnly = true; area.setAttribute('aria-label', 'Copy-ready example prompt'); wrap.append(area);
  const row = node('div', 'prompt-copy'), copy = node('button', 'prompt-button', 'Copy prompt');
  copy.addEventListener('click', async () => { try { await navigator.clipboard.writeText(area.value); notify('Prompt copied'); copy.textContent = 'Copied ✓'; } catch { area.focus(); area.select(); notify('Select and copy the prompt manually.'); } });
  row.append(copy); wrap.append(row);
  openPanel('Example prompt · ' + s.title, wrap);
}

/* ---- card icons (kept from the source engine, keyword-matched) ---- */
const ICONS = { target: '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="4"/><circle cx="12" cy="12" r="1"/>', shield: '<path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z"/>', route: '<circle cx="6" cy="18" r="2"/><circle cx="18" cy="6" r="2"/><path d="M8 18h6a4 4 0 0 0 0-8H10a4 4 0 0 1 0-8h6"/>', inbox: '<path d="M3 13l2-8h14l2 8v6H3z"/><path d="M3 13h5l2 3h4l2-3h5"/>', check: '<circle cx="12" cy="12" r="9"/><path d="M8 12l3 3 5-6"/>', cross: '<circle cx="12" cy="12" r="9"/><path d="M9 9l6 6M15 9l-6 6"/>', gate: '<path d="M4 20V6l8-3 8 3v14"/><path d="M9 20v-7h6v7"/><path d="M4 12h16"/>', clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>', users: '<circle cx="9" cy="8" r="3"/><circle cx="17" cy="9" r="2.5"/><path d="M3 19a6 6 0 0 1 12 0"/><path d="M15 19a4 4 0 0 1 6-3.5"/>', user: '<circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/>', file: '<path d="M6 3h8l4 4v14H6z"/><path d="M14 3v4h4M9 12h6M9 16h6"/>', cpu: '<rect x="6" y="6" width="12" height="12" rx="2"/><rect x="10" y="10" width="4" height="4"/><path d="M9 2v4M15 2v4M9 18v4M15 18v4M2 9h4M2 15h4M18 9h4M18 15h4"/>', search: '<circle cx="11" cy="11" r="6"/><path d="M20 20l-4.5-4.5"/>', bulb: '<path d="M9 18h6M10 21h4"/><path d="M8 13a5 5 0 1 1 8 0c-1 1-1.5 2-1.5 3h-5c0-1-.5-2-1.5-3z"/>', flag: '<path d="M5 21V4"/><path d="M5 4h12l-2 4 2 4H5"/>', hand: '<path d="M8 12V6a1.5 1.5 0 0 1 3 0v5"/><path d="M11 11V4a1.5 1.5 0 0 1 3 0v7"/><path d="M14 11V6a1.5 1.5 0 0 1 3 0v8a6 6 0 0 1-12 0v-3a1.5 1.5 0 0 1 3 0v1"/>', play: '<path d="M7 5v14l11-7z"/>', repeat: '<path d="M4 12a8 8 0 0 1 14-5l2 2"/><path d="M20 4v5h-5"/><path d="M20 12a8 8 0 0 1-14 5l-2-2"/><path d="M4 20v-5h5"/>', stop: '<path d="M8 3h8l5 5v8l-5 5H8l-5-5V8z"/>', list: '<path d="M9 6h11M9 12h11M9 18h11"/><circle cx="4.5" cy="6" r="1.2"/><circle cx="4.5" cy="12" r="1.2"/><circle cx="4.5" cy="18" r="1.2"/>', dot: '<circle cx="12" cy="12" r="3"/>' };
const ICON_RULES = [[/goal|outcome|what$/, 'target'], [/boundar|guard|scope/, 'shield'], [/^stop/, 'stop'], [/^mode|route|during/, 'route'], [/input|source|read|deliver|include|contain/, 'inbox'], [/result|check|expected/, 'check'], [/must not|negative|problem|fail/, 'cross'], [/gate|decision/, 'gate'], [/open|time|when/, 'clock'], [/rotate|repeat|loop|again/, 'repeat'], [/group|mob|roles|team|squad|users|driver|navigator/, 'users'], [/individual|analyst|developer|tester|reviewer|observer|engineer|you/, 'user'], [/packet|claim|evidence|log|record|handoff|trace|contract|file|brief|plan|note|status/, 'file'], [/model|agent|adapter|tool|harness|hook|checker|cpu|subagent|session|repo|skill|mcp/, 'cpu'], [/review|search|inspect|compare/, 'search'], [/learned|why|idea|concept/, 'bulb'], [/can do|flag|deliver|ship|transfer|required output/, 'flag'], [/pick|choose|decide/, 'hand'], [/run|demo|execute|play|watch|ask/, 'play'], [/step|list|todo|checklist/, 'list']];
function cardIcon(title) { const t = (title || '').toLowerCase(); const hit = ICON_RULES.find(([re]) => re.test(t)); const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg'); svg.setAttribute('viewBox', '0 0 24 24'); svg.setAttribute('aria-hidden', 'true'); svg.innerHTML = ICONS[hit ? hit[1] : 'dot']; const wrap = node('span', 'card-icon'); wrap.append(svg); return wrap; }
function cardBody(body) {
  const text = String(body || '');
  const arrows = text.split(/\s*(?:→|->)\s*/);
  if (arrows.length >= 3 && text.length < 200) {
    const chain = node('div', 'chain');
    arrows.forEach((a, i) => { chain.append(node('span', 'chip' + (i === 0 ? ' first' : ''), a.trim())); if (i < arrows.length - 1) chain.append(node('span', 'chain-arrow', '→')); });
    return chain;
  }
  return node('p', null, text);
}
function renderCard(c, i) { const card = node('article', 'card'); card.style.setProperty('--i', i); const head = node('div', 'card-head'); head.append(cardIcon(c.title), node('h2', null, c.title)); card.append(head, cardBody(c.body)); return card; }

/* ---- slide layouts ---- */
let timerHandle = null;
let slideController = null;
function stopTimer() { if (timerHandle) { clearInterval(timerHandle); timerHandle = null; } }
function renderTagline(stage, s) { if (s.tagline) stage.append(node('p', 'tagline', s.tagline)); }
function renderPillars(stage, s) { const row = node('div', 'pillars'); (s.items || []).forEach((it, i) => { const p = node('div', 'pillar'); p.style.setProperty('--i', i); p.append(node('span', 'pillar-label', it.label)); if (it.caption) p.append(node('span', 'pillar-caption', it.caption)); row.append(p); }); stage.append(row); }
function renderSteps(stage, s) {
  const wrap = node('div', 'steps-wrap'); const row = node('ol', 'steps-chain'); let active = -1; const els = []; const co = s.callout;
  (s.items || []).forEach((it, i) => {
    const li = node('li', 'step-item'); li.style.setProperty('--i', i);
    if (co && co.at === i + 1) { const c = node('div', 'step-callout'); c.append(node('span', 'step-callout-text', co.text), node('span', 'step-callout-arrow', '▼')); li.append(c); }
    const b = node('button', 'step-btn'); b.setAttribute('aria-pressed', 'false'); b.setAttribute('aria-label', 'Step ' + (i + 1) + ': ' + it.label);
    b.append(node('span', 'step-circle', String(i + 1))); li.append(b, node('span', 'step-label', it.label));
    if (it.caption) li.append(node('span', 'step-caption', it.caption));
    b.addEventListener('click', () => { active = i; els.forEach((e, k) => { e.classList.toggle('active', k === i); e.querySelector('button').setAttribute('aria-pressed', String(k === i)); }); cap.textContent = it.detail || it.caption || it.label; });
    els.push(li); row.append(li);
  });
  const cap = node('p', 'steps-detail', s.detail || '');
  const ctrl = node('div', 'widget-controls');
  const next = node('button', null, 'Reveal next →'); next.addEventListener('click', () => { if (active < els.length - 1) els[active + 1].querySelector('button').click(); });
  const all = node('button', 'secondary', 'Show all'); all.addEventListener('click', () => { els.forEach(e => { e.classList.add('active'); e.querySelector('button').setAttribute('aria-pressed', 'true'); }); active = els.length - 1; cap.textContent = s.detail || ''; });
  ctrl.append(next, all);
  if (co && co.at) els[co.at - 1].classList.add('highlight');
  wrap.append(row, cap, ctrl); stage.append(wrap);
}
function renderCompare(stage, s) { const grid = node('div', 'compare'); (s.columns || []).forEach((c, i) => { const col = node('section', 'compare-col'); col.style.setProperty('--i', i); col.append(node('h2', null, c.title)); const ul = node('ul'); (c.items || []).forEach(x => ul.append(node('li', null, x))); col.append(ul); if (c.foot) col.append(node('p', 'compare-foot', c.foot)); grid.append(col); }); stage.append(grid); }
function renderRecap(stage, s) {
  const list = node('ul', 'recap-list'); const items = s.items || [];
  items.forEach((it, i) => { const li = node('li', 'recap-item hidden-item'); li.setAttribute('aria-hidden', 'true'); li.append(node('span', 'recap-check', String(i + 1)), node('span', 'recap-text', it.label + (it.caption ? ' — ' + it.caption : ''))); list.append(li); });
  let shown = 0; const ctrl = node('div', 'widget-controls'); const btn = node('button', null, 'Reveal (' + items.length + ')');
  btn.addEventListener('click', () => { if (shown < items.length) { const li = list.children[shown]; li.classList.remove('hidden-item'); li.removeAttribute('aria-hidden'); li.querySelector('.recap-check').textContent = '✓'; announce(li.textContent); shown++; btn.textContent = shown < items.length ? 'Reveal (' + (items.length - shown) + ' left)' : 'All shown'; } });
  ctrl.append(btn); stage.append(list, ctrl);
}
function renderTimer(stage, s) {
  const m = s.timer || Number((s.kicker || '').match(/(\d+)\s*MIN/i)?.[1]);
  if (!m) return;
  let left = m * 60;
  const box = node('div', 'timer'); const face = node('div', 'timer-face', String(m).padStart(2, '0') + ':00');
  const bar = node('div', 'timer-bar'); const fill = node('div', 'timer-fill'); bar.append(fill);
  const ctrl = node('div', 'widget-controls'); const start = node('button', null, 'Start ' + m + ' min'); const reset = node('button', 'secondary', 'Reset');
  function paint() { face.textContent = String(Math.floor(left / 60)).padStart(2, '0') + ':' + String(left % 60).padStart(2, '0'); fill.style.width = (100 * (1 - left / (m * 60))) + '%'; box.classList.toggle('timer-late', left <= 60); }
  start.addEventListener('click', () => {
    if (timerHandle) { stopTimer(); start.textContent = 'Resume'; announce('Timer paused'); return; }
    start.textContent = 'Pause'; announce('Timer started');
    timerHandle = setInterval(() => { if (left > 0) { left--; paint(); } else { stopTimer(); face.textContent = 'TIME'; notify('Time is up — this assignment ends now'); } }, 1000);
  });
  reset.addEventListener('click', () => { stopTimer(); left = m * 60; paint(); start.textContent = 'Start ' + m + ' min'; announce('Timer reset'); });
  ctrl.append(start, reset); box.append(face, bar, ctrl); stage.append(box);
}
function renderLayout(stage, s) {
  const L = s.layout;
  if (L === 'pillars') renderPillars(stage, s);
  else if (L === 'steps') renderSteps(stage, s);
  else if (L === 'compare') renderCompare(stage, s);
  else if (L === 'recap') renderRecap(stage, s);
  if (s.cards?.length && (!L || L === 'exercise' || L === 'cards')) {
    const grid = node('div', 'cards' + (s.cards.length === 3 ? ' three' : ''));
    s.cards.forEach((c, i) => grid.append(renderCard(c, i)));
    stage.append(grid);
  }
  if (L === 'exercise') renderTimer(stage, s);
}

/* ---- AetherBOT + illustrations (slides.js: visual) ----
   Additive only: never changes slide wording. Highlights wrap existing words
   in a span; all art is aria-hidden. AetherBOT is an assistant, not decoration:
   every appearance does something that explains the slide, and his tools come
   out of the hatch in his head. */
const SVGNS = 'http://www.w3.org/2000/svg';
function svg(viewBox, inner, cls) { const e = document.createElementNS(SVGNS, 'svg'); e.setAttribute('viewBox', viewBox); e.setAttribute('aria-hidden', 'true'); e.setAttribute('focusable', 'false'); if (cls) e.setAttribute('class', cls); e.innerHTML = inner; return e; }
/* hatch = where the lid on top of his head sits, in % of the image box (measured) */
const BOTS = {
  wave:  { src: 'assets/aetherbot/aetherbot-wave.webp',  hatch: [58.4, 12.6] },
  think: { src: 'assets/aetherbot/aetherbot-think.webp', hatch: [51.3, 14.8] },
  point: { src: 'assets/aetherbot/aetherbot-point.webp', hatch: [32.6, 14.6] },
  head:  { src: 'assets/aetherbot/aetherbot-head.webp',  hatch: [49.6, 25.8] },
  // stretch-arm poses: tip = fingertip position in % of the image (used by place: 'pointer')
  stretchLeft:  { src: 'assets/aetherbot/stretch/aetherbot-stretch-links.webp',  tip: [0.1, 48], ratio: 900 / 541 },
  stretchUp:    { src: 'assets/aetherbot/stretch/aetherbot-stretch-omhoog.webp', ratio: 336 / 1100 },
  stretchRight: { src: 'assets/aetherbot/stretch/aetherbot-stretch-rechts.webp', tip: [99.7, 48.5], ratio: 900 / 551 }
};
const PILLAR_ICONS = [
  '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1.3"/>',
  '<path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z"/><path d="M8.5 12l2.5 2.5 4.5-5"/>',
  '<circle cx="10.5" cy="10.5" r="6.5"/><path d="M20 20l-4.8-4.8"/><path d="M7.5 10.5l2 2 3.5-4"/>',
  '<path d="M4 12a8 8 0 0 1 14-5l2 2"/><path d="M20 4v5h-5"/><path d="M20 12a8 8 0 0 1-14 5l-2-2"/><path d="M4 20v-5h5"/>'];
const ART = {
  sliders: () => svg('0 0 300 96', [0, 1, 2].map(i => '<g class="sl" style="--i:' + i + '"><path class="sl-track" d="M20 ' + (18 + i * 30) + 'H280"/><circle class="sl-knob" cx="' + [210, 120, 70][i] + '" cy="' + (18 + i * 30) + '" r="10"/></g>').join(''), 'art art-sliders'),
  thermo: () => svg('0 0 300 96', '<rect class="th-tube" x="22" y="10" width="20" height="62" rx="10"/><circle class="th-bulb" cx="32" cy="78" r="14"/><rect class="th-fill" x="27" y="22" width="10" height="56" rx="5"/>' +
    '<path class="th-wave" d="M70 48c15-26 30 26 45 0s30 26 45 0 30 26 45 0 30 26 45 0"/>', 'art art-thermo'),
  route: () => svg('0 0 400 70',
    '<path class="art-path" d="M35 35H365"/>' +
    [35, 145, 255, 365].map((x, i) => '<g transform="translate(' + x + ' 35)"><g class="art-stop" style="--i:' + i + '"><circle r="24"/>' + [
      '<path d="M-6 9h12M-4 14h8M-9 2a10 10 0 1 1 18 0c-2 2-3 4-3 6h-12c0-2-1-4-3-6z"/>',
      '<rect x="-13" y="-10" width="26" height="20" rx="3"/><path d="M-7 -3l5 4-5 4M1 6h6"/>',
      '<path d="M-10 0a10 10 0 0 1 17-7l3 3M10 -9v5h-5M10 0a10 10 0 0 1-17 7l-3-3M-10 9v-5h5"/>',
      '<path d="M-13 11h26M-11 11v-20M-5 11v-16M1 11v-19M7 11l-4-17M11 11v-14"/>'][i] + '</g></g>').join(''), 'art art-route'),
  timeline: () => svg('0 0 760 96',
    [0, 1].map(i => '<g class="tl-block tl-teach" style="--i:' + i + '"><rect x="' + (i * 96) + '" y="20" width="84" height="56" rx="12"/><text x="' + (i * 96 + 42) + '" y="56">' + (i + 1) + '</text></g>').join('') +
    '<path class="tl-arrow" d="M196 48h40m-10-9 10 9-10 9"/>' +
    [0, 1, 2, 3, 4].map(i => '<g class="tl-block tl-support" style="--i:' + (i + 2) + '"><rect x="' + (256 + i * 101) + '" y="20" width="89" height="56" rx="12"/><text x="' + (256 + i * 101 + 44.5) + '" y="56">' + (i + 1) + '</text></g>').join(''), 'art art-timeline'),
  thought: () => svg('0 0 260 210',
    '<circle class="bubble" style="--i:0" cx="22" cy="198" r="7"/><circle class="bubble" style="--i:1" cx="46" cy="174" r="11"/>' +
    '<g transform="translate(262 0) scale(-1 1)"><path class="cloud" style="--i:2" d="M58 142c-26 0-44-18-44-40 0-20 15-36 34-39 5-24 26-41 51-41 19 0 36 10 45 25 6-3 13-5 21-5 27 0 48 21 48 47 0 2 0 4-1 6 12 6 20 18 20 32 0 20-16 35-36 35z"/></g>' +
    '<g class="cloud-ico" style="--i:3"><path class="loop" d="M96 60a36 36 0 1 1-26 12"/><path class="loop" d="M62 64l8 8 9-6"/><circle cx="96" cy="94" r="20"/><path d="M96 94V82M96 94h9"/><circle class="clock-dot" cx="96" cy="94" r="2.6"/></g>' +
    '<text class="cloud-q" x="168" y="120">?</text>', 'gadget gadget-thought')
};
const LID = '<svg class="lid" viewBox="0 0 60 24" aria-hidden="true"><defs><linearGradient id="lidg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#6b5cd6"/><stop offset="1" stop-color="#2b2f6b"/></linearGradient></defs><rect x="2" y="6" width="56" height="14" rx="7" fill="url(#lidg)" stroke="#161d3a" stroke-width="2"/><circle cx="8" cy="13" r="3.4" fill="#FF7A1A"/></svg>';

function highlight(root, s) {
  (s.visual?.highlight || []).forEach(h => {
    let host = null;
    if (h.in === 'title') host = root.querySelector('.heading h1');
    else if (h.in === 'subtitle') host = root.querySelector('.heading .subtitle');
    else if (h.in === 'tagline') host = root.querySelector('.tagline');
    else if (/^card:\d+$/.test(h.in)) host = root.querySelectorAll('.card p')[Number(h.in.split(':')[1])];
    if (!host) return;
    const walker = document.createTreeWalker(host, NodeFilter.SHOW_TEXT);
    for (let t = walker.nextNode(); t; t = walker.nextNode()) {
      const i = t.nodeValue.indexOf(h.text); if (i < 0) continue;
      const mid = t.splitText(i); mid.splitText(h.text.length);
      const span = node('span', 'hl hl-' + h.tone); mid.replaceWith(span); span.append(mid); break;
    }
  });
}
// slides 8-13: extra layouts, all keep the slide text verbatim
function renderExtras(stage, main, s, v) {
  const x = { aim: [] }; const cards = [...main.querySelectorAll('.card')]; const grid = main.querySelector('.cards');
  if (v.keyLine != null && cards[v.keyLine]) {                 // 8: calm lead + key line that gets stamped
    main.classList.add('has-key'); cards.forEach((c, i) => { if (i !== v.keyLine) c.classList.add('card-lead'); });
    const key = cards[v.keyLine]; key.classList.add('card-key'); const row = node('div', 'key-row'); key.replaceWith(row); row.append(key);
    const stamp = node('span', 'stamp'); stamp.append(node('span', 'stamp-in', v.stamp || 'VERIFY')); key.append(stamp); x.aim.push(stamp); x.row = row;
  }
  if (v.art === 'flow' && cards.length >= 3) {                  // 9: input + context -> model -> output
    grid.classList.add('flow'); const left = node('div', 'flow-in'); left.append(cards[0], cards[1]);
    const slot = node('div', 'flow-bot'); cards[2].classList.add('flow-out');
    grid.replaceChildren(left, node('span', 'flow-arrow a1'), slot, node('span', 'flow-arrow a2'), cards[2]); x.slot = slot;
  }
  if (v.art === 'window') {                                    // 10: the context window fills up, noise distracts
    main.classList.add('with-window'); const win = node('div', 'ctxwin'); const box = node('div', 'ctxwin-box');
    const kinds = 'gggggggngnnn'; [...kinds].forEach((k, i) => { const t = node('span', 'tok tok-' + k); t.style.setProperty('--i', i); t.style.gridRow = String(3 - Math.floor(i / 4)); t.style.gridColumn = String(i % 4 + 1); if ([5, 8].includes(i)) t.classList.add('tok-dim'); box.append(t); });
    const meter = node('div', 'ctxwin-meter'); meter.append(node('span', 'ctxwin-fill'));
    win.append(box, meter); grid.after(win);
  }
  if (v.reveal === 'click') {                                  // 12: cards open one by one, so the room answers first
    grid.classList.add('reveal-grid'); let reacted = null;
    const open = i => { const c = cards[i]; if (!c || !c.classList.contains('closed')) return false; c.classList.remove('closed'); c.setAttribute('aria-hidden', 'false'); x.react?.(i); return true; };
    cards.forEach((c, i) => { c.classList.add('closed'); c.setAttribute('aria-hidden', 'true'); const cover = node('span', 'card-cover', String(i + 1)); c.append(cover); c.addEventListener('click', () => open(i)); });
    const next = () => open(cards.findIndex(c => c.classList.contains('closed')));
    const ctrl = node('div', 'widget-controls reveal-controls'); const b1 = node('button', null, 'Reveal next →'); b1.addEventListener('click', next);
    const b2 = node('button', 'secondary', 'Show all'); b2.addEventListener('click', () => cards.forEach((c, i) => open(i)));
    ctrl.append(b1, b2); if (v.buttons) grid.after(ctrl); window.__reveal = next; slideController.signal.addEventListener('abort', () => { if (window.__reveal === next) window.__reveal = null; });
    x.slot = grid;
  }
  if (v.quiz) {                                                  // 14: vote first, then wrong answers drop out
    main.classList.add('narrow'); const order = cards.map((c, i) => i).filter(i => i !== v.quiz.answer); let k = 0;
    const next = () => {
      if (k < order.length) { cards[order[k++]].classList.add('quiz-out'); return true; }
      if (k === order.length) { k++; cards[v.quiz.answer].classList.add('quiz-right'); x.pointer?.classList.add('show'); return true; }
      return false;
    };
    cards.forEach(c => c.addEventListener('click', next)); window.__reveal = next;
    slideController.signal.addEventListener('abort', () => { if (window.__reveal === next) window.__reveal = null; });
  }
  if (v.spotlight != null && cards[v.spotlight]) {               // 16: land on one card
    main.classList.add('narrow', 'spot'); cards[v.spotlight].classList.add('spot-on');
  }
  if (v.pairs) {                                                 // 17: rows come in as pairs, one per click / →
    const cmp = main.querySelector('.compare'); const cols = s.columns || [];
    const g = node('div', 'pairs'); g.append(node('h2', 'pair-head', cols[0]?.title || ''), node('span'), node('h2', 'pair-head', cols[1]?.title || ''));
    const rows = []; const n = Math.max(cols[0]?.items.length || 0, cols[1]?.items.length || 0);
    for (let i = 0; i < n; i++) { const l = node('div', 'pair-l', cols[0].items[i] || ''), m = node('span', 'pair-link'), r = node('div', 'pair-r', cols[1].items[i] || ''); [l, m, r].forEach(e => e.classList.add('pending')); g.append(l, m, r); rows.push([l, m, r]); }
    cmp?.replaceWith(g); let k = 0;
    const next = () => { if (k >= rows.length) return false; rows[k++].forEach(e => e.classList.remove('pending')); return true; };
    g.addEventListener('click', next); window.__reveal = next;
    slideController.signal.addEventListener('abort', () => { if (window.__reveal === next) window.__reveal = null; });
  }
  if (v.countdown) {                                             // pauses: live countdown + real clock time
    const box = node('div', 'pause-box'); const face = node('div', 'pause-clock'); const back = node('p', 'pause-back');
    const end = Date.now() + v.countdown * 60000; const hhmm = new Date(end).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });
    back.append(document.createTextNode('Back at '), node('strong', null, hhmm));
    const tick = () => { const left = Math.max(0, Math.round((end - Date.now()) / 1000)); face.textContent = String(Math.floor(left / 60)).padStart(2, '0') + ':' + String(left % 60).padStart(2, '0'); box.classList.toggle('late', left <= 60); box.classList.toggle('done', left === 0); };
    tick(); const iv = setInterval(tick, 1000); slideController.signal.addEventListener('abort', () => clearInterval(iv));
    box.append(face, back); if (s.cards?.[0]?.body) box.append(node('p', 'pause-next', s.cards[0].body));
    grid.replaceWith(box);
  }
  if (v.term) {                                                  // 20: a terminal that types a few commands, then asks
    main.classList.add('with-window'); const t = node('div', 'term'); const bar = node('div', 'term-bar'); bar.append(node('i'), node('i'), node('i')); t.append(bar);
    const body = node('div', 'term-body'); v.term.forEach((ln, i) => { const row = node('div', 'term-line ' + (ln.c ? 'cmd' : ln.ask ? 'ask' : 'out')); row.style.setProperty('--i', i);
      if (ln.c) { row.append(node('span', 'prompt-sign', '$ ')); const ty = node('span', 'typed', ln.c); ty.style.setProperty('--n', ln.c.length); row.append(ty); } else row.textContent = ln.o || ln.ask; body.append(row); });
    t.append(body); grid.after(t);
  }
  if (v.art === 'gate') {                                        // 21: explore -> plan -> (gate) -> change
    const route = node('div', 'route'); const st = (ico, label, cls) => { const d = node('div', 'station ' + (cls || '')); d.append(node('span', 'st-ico', ico), node('span', 'st-label', label)); return d; };
    const gate = node('div', 'station gate'); gate.append(node('span', 'bar'), node('span', 'st-label', v.gateLabel || 'your approval'));
    route.append(st('🔍', 'Explore', 's1'), node('span', 'rt-line l1'), st('📋', 'Plan', 's2'), node('span', 'rt-line l2'), gate, node('span', 'rt-line l3'), st('✏️', 'Change', 's4'));
    (main.querySelector('.tagline') || grid).before(route); let open = false;
    const next = () => { if (open) return false; open = true; route.classList.add('open'); return true; };
    route.addEventListener('click', next); window.__reveal = next; slideController.signal.addEventListener('abort', () => { if (window.__reveal === next) window.__reveal = null; });
  }
  if (v.art === 'prompt' && s.prompt) {                          // 22: the demo prompt, typed; B = plan B (captured output)
    const t = node('div', 'term term-wide'); const bar = node('div', 'term-bar'); bar.append(node('i'), node('i'), node('i'), node('span', 'term-title', 'claude'));
    const body = node('div', 'term-body'); const pre = node('div', 'term-prompt'); pre.append(node('span', 'prompt-sign', '> '));
    const txt = node('span', 'tp-text', s.prompt); pre.append(txt); body.append(pre); t.append(bar, body); grid.replaceWith(t);
    (v.promptMarks || []).forEach(m => { const w = document.createTreeWalker(txt, NodeFilter.SHOW_TEXT); for (let n = w.nextNode(); n; n = w.nextNode()) { const i = n.nodeValue.indexOf(m); if (i < 0) continue; const mid = n.splitText(i); mid.splitText(m.length); const sp = node('span', 'hl hl-orange'); mid.replaceWith(sp); sp.append(mid); break; } });
    if (window.DEMO_FALLBACK) {
      const panel = node('div', 'planb'); const head = node('div', 'planb-head'); head.append(node('strong', null, 'Plan B'), node('span', null, ' · captured run of this exact prompt · press B to close'));
      panel.append(head, node('pre', 'planb-body', window.DEMO_FALLBACK)); stage.append(panel);
      const tog = () => panel.classList.toggle('show'); window.__planB = tog;
      slideController.signal.addEventListener('abort', () => { if (window.__planB === tog) window.__planB = null; });
    }
  }
  if (v.stepKeys) {                                             // steps without buttons: → activates the next step
    const items = [...main.querySelectorAll('.step-item')]; const ctrl = main.querySelector('.steps-wrap .widget-controls'); if (ctrl) ctrl.style.display = 'none';
    if (v.humanStep != null && items[v.humanStep]) { items[v.humanStep].classList.add('human'); items[v.humanStep].querySelector('.step-circle').textContent = '👤'; }
    const next = () => { const a = items.findIndex(li => li.classList.contains('active')); if (a >= items.length - 1) return false; items[a + 1].querySelector('button').click(); return true; };
    window.__reveal = next; slideController.signal.addEventListener('abort', () => { if (window.__reveal === next) window.__reveal = null; });
    x.steps = items;
  }
  if (v.reach && x.steps) {                                      // 25: AetherBOT's arm telescopes to the active step
    const wrap = main.querySelector('.steps-wrap'); wrap.classList.add('has-reach');
    const r = node('div', 'reach'); r.setAttribute('aria-hidden', 'true');
    const body = document.createElement('img'); body.src = 'assets/aetherbot/stretch/arm-body.webp'; body.className = 'reach-body'; body.alt = '';
    const tube = node('span', 'reach-tube'); const hand = document.createElement('img'); hand.src = 'assets/aetherbot/stretch/arm-hand.webp'; hand.className = 'reach-hand'; hand.alt = '';
    r.append(body, tube, hand); stage.append(r);
    const H = 200, k = H / 551;
    const place = () => {
      const first = rel(x.steps[0].querySelector('.step-circle'), stage);
      const left = first.x - 300 * k - 26, top = first.y + first.h / 2 - 22 - 280 * k;
      r.style.left = left + 'px'; r.style.top = top + 'px'; r.style.height = H + 'px';
      const a = x.steps.findIndex(li => li.classList.contains('active'));
      const tipX = a < 0 ? left + 300 * k + 10 : rel(x.steps[a].querySelector('.step-circle'), stage).x + 14;
      const w = Math.max(0, tipX - (left + 300 * k) - 150 * k); tube.style.width = w + 'px'; hand.style.setProperty('--tube', w + 'px');
    };
    r.style.setProperty('--k', k); requestAnimationFrame(() => requestAnimationFrame(place));
    const mo = new MutationObserver(place); x.steps.forEach(li => mo.observe(li, { attributes: true, attributeFilter: ['class'] }));
    slideController.signal.addEventListener('abort', () => mo.disconnect()); window.addEventListener('resize', place, { signal: slideController.signal });
  }
  if (v.art === 'loop' && x.steps) {                             // 26: the agent loop as a circle
    const chain = main.querySelector('.steps-chain'); chain.classList.add('nest-hidden');
    const labels = (s.items || []).map(i => i.label); const box = node('div', 'loop');
    const pos = [[50, 4], [92, 50], [50, 96], [8, 50]];
    const ring = svg('0 0 400 400', '<defs><marker id="lp-ar" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0 0L10 5L0 10z" fill="currentColor"/></marker></defs>' +
      [[200, 16, 384, 200], [384, 200, 200, 384], [200, 384, 16, 200], [16, 200, 200, 16]].map((p, i) => '<path class="lp-arc lp-arc' + i + '" marker-end="url(#lp-ar)" d="M' + p[0] + ' ' + p[1] + ' A184 184 0 0 1 ' + p[2] + ' ' + p[3] + '"/>').join(''), 'loop-ring');
    box.append(ring);
    labels.slice(0, 4).forEach((l, i) => { const n = node('span', 'lp-node', l); n.style.left = pos[i][0] + '%'; n.style.top = pos[i][1] + '%'; n.style.setProperty('--i', i); box.append(n); });
    const mid = node('div', 'lp-mid'); mid.append(node('span', 'lp-mid-ico', '↻ ■'), node('span', 'lp-mid-label', labels[4] || '')); box.append(mid);
    const orb = node('div', 'lp-orbit'); const head = document.createElement('img'); head.src = BOTS.head.src; head.alt = ''; orb.append(head); box.append(orb);
    chain.after(box); const nodes = [...box.querySelectorAll('.lp-node'), mid];
    const sync = () => x.steps.forEach((li, i) => nodes[i]?.classList.toggle('on', li.classList.contains('active')));
    const mo = new MutationObserver(sync); x.steps.forEach(li => mo.observe(li, { attributes: true, attributeFilter: ['class'] }));
    nodes.forEach((n, i) => n.addEventListener('click', () => x.steps[i].querySelector('button').click()));
    slideController.signal.addEventListener('abort', () => mo.disconnect());
  }
  if (v.art === 'boxes') {                                       // 27: SDLC ⊃ working method ⊃ agent loop, zoom in per →
    const cmp = main.querySelector('.compare'); const cols = s.columns || [];
    const mk = (c, i) => { const b = node('div', 'nb nb' + i); const h = node('div', 'nb-head'); h.append(node('span', 'nb-title', c.title));
      const row = node('div', 'nb-items'); c.items.forEach(t => { const it = node('span', 'nb-item', t); if ((v.link?.[i] || []).includes(t)) it.classList.add('nb-link'); row.append(it); }); h.append(row); b.append(h); return b; };
    const b0 = mk(cols[0], 0), b1 = mk(cols[1], 1), b2 = mk(cols[2], 2); b1.append(b2); b0.append(b1); cmp?.replaceWith(b0);
    let k = 0; const steps = [() => b1.classList.add('in'), () => b2.classList.add('in'), () => b0.classList.add('linked')];
    const next = () => { if (k >= steps.length) return false; steps[k++](); return true; };
    b0.addEventListener('click', next); window.__reveal = next; slideController.signal.addEventListener('abort', () => { if (window.__reveal === next) window.__reveal = null; });
  }
  if (v.stack) {                                                 // 29: the library stacks up block by block
    grid.classList.add('stack'); cards.forEach((c, i) => { if (v.stack[i]) c.querySelector('.card-head').append(node('span', 'stack-tag', v.stack[i])); });
    x.slot = node('div', 'stack-row'); grid.replaceWith(x.slot); x.slot.append(grid);
  }
  if (v.cmdCards) { main.classList.add('compact');               // 30: command cards look and type like a terminal
    v.cmdCards.forEach(ci => { const c = cards[ci]; if (!c) return; c.classList.add('cmd-card'); const p = c.querySelector('p'); const box = node('div', 'cmd-lines');
      String(s.cards[ci].body).split('\n').forEach((ln, i) => { const isCmd = !/[:.]$/.test(ln.trim()) || /^https?:/.test(ln.trim()); const row = node('div', isCmd ? 'cmd-l' : 'cmd-note');
        row.style.setProperty('--d', (0.5 + ci * 0.9 + i * 0.35) + 's'); if (isCmd) row.append(node('span', 'prompt-sign', '$ '), node('span', null, ln)); else row.textContent = ln; box.append(row); });
      p?.replaceWith(box); });
  }
  if (v.browser != null && cards[v.browser]) {                  // 30: a tiny browser with the starting state
    const b = node('div', 'mini-browser'); const bar = node('div', 'mb-bar'); bar.append(node('i'), node('i'), node('i'), node('span', 'mb-url', 'localhost:3000'));
    const tabs = node('div', 'mb-tabs'); ['Profiles', 'Glossary', 'Library', 'Game'].forEach((t, i) => { const d = node('div', 'mb-tab' + (i === 3 ? ' live' : '')); d.append(node('span', 'mb-name', t), node('span', 'mb-body')); tabs.append(d); });
    b.append(bar, tabs); cards[v.browser].append(b);
  }
  if (v.lineReveal != null && cards[v.lineReveal]) {            // 32: review questions one per →
    const c = cards[v.lineReveal]; const ul = node('ol', 'q-list'); String(s.cards[v.lineReveal].body).split('\n').forEach((t, i) => { const li = node('li', null, t); li.style.setProperty('--i', i); ul.append(li); });
    c.querySelector('p')?.replaceWith(ul);
  }
  if (v.stamps) {                                                // 32: decision stamps, click one
    const row = node('div', 'stamps'); row.append(node('span', 'stamps-label', 'Decision'));
    v.stamps.forEach((w, i) => { const wrap = node('span', 'stamp-wrap'); const b = node('button', 'stamp-btn st-' + w.toLowerCase(), w); b.style.setProperty('--i', i);
      b.addEventListener('click', () => { row.querySelectorAll('.stamp-btn').forEach(x => x.classList.toggle('picked', x === b)); row.classList.add('has-pick'); }); wrap.append(b); row.append(wrap); x.aim.push(wrap); });
    grid.after(row); x.stampRow = row; main.classList.add('has-stamps'); const stampBox = node('div', 'stamp-box'); row.before(stampBox); stampBox.append(row);
  }
  if (v.badge != null && cards[v.badge]) {                      // 33: "Include" as an empty profile badge
    const c = cards[v.badge]; c.classList.add('badge-card'); const bd = node('div', 'badge'); const av = node('div', 'badge-av', '?'); const rows = node('div', 'badge-rows');
    String(s.cards[v.badge].body).split('\n').forEach((t, i) => { const r = node('div', 'badge-row'); r.style.setProperty('--i', i); r.append(node('span', 'badge-k', t), node('span', 'badge-line')); rows.append(r); });
    bd.append(av, rows); c.querySelector('p')?.replaceWith(bd);
  }
  if (v.swap) {                                                  // 34: two AetherBOTs swap their work
    const sw = node('div', 'swap'); sw.setAttribute('aria-hidden', 'true');
    ['sw-a', 'sw-b'].forEach(c => { const im = document.createElement('img'); im.src = BOTS.head.src; im.alt = ''; im.className = c; sw.append(im); });
    sw.append(node('span', 'pkt pkt-ab'), node('span', 'pkt pkt-ba'));
    if (x.stampRow) { x.stampRow.classList.add('with-swap'); x.stampRow.querySelector('.stamps-label').after(sw); } else { main.classList.add('has-swap'); grid.after(sw); }
  }
  if (v.template != null && cards[v.template]) {                // 36/37: an empty card template (term/definition, concept card)
    const c = cards[v.template]; const lines = v.templateRows || String(s.cards[v.template].body).split('\n'); const t = node('div', 'tpl' + (lines.length > 3 ? ' tpl-grid' : ''));
    lines.forEach((l, i) => { const r = node('div', 'tpl-row'); r.style.setProperty('--i', i); r.append(node('span', 'tpl-k', l), node('span', 'tpl-line'), node('span', 'tpl-line short')); t.append(r); });
    if (v.templateRows) c.append(t); else c.querySelector('p')?.replaceWith(t);
  }
  if (v.notebook != null && cards[v.notebook]) {                // 39: the learning note as a notebook page
    const c = cards[v.notebook]; c.classList.add('notebook'); const ul = node('ul', 'nb-lines');
    String(s.cards[v.notebook].body).split('\n').forEach((t, i) => { const li = node('li', null, t); li.style.setProperty('--i', i); ul.append(li); }); c.querySelector('p')?.replaceWith(ul);
  }
  if (v.quietTimer) {                                            // 39: a quiet countdown without "Back at"
    main.classList.add('has-quiet'); const box = node('div', 'pause-box quiet'); const face = node('div', 'pause-clock'); const end = Date.now() + v.quietTimer * 60000;
    const tick = () => { const left = Math.max(0, Math.round((end - Date.now()) / 1000)); face.textContent = String(Math.floor(left / 60)).padStart(2, '0') + ':' + String(left % 60).padStart(2, '0'); box.classList.toggle('late', left <= 30 && left > 0); box.classList.toggle('done', left === 0); };
    tick(); const iv = setInterval(tick, 1000); slideController.signal.addEventListener('abort', () => clearInterval(iv));
    box.append(node('span', 'quiet-ico', '✍'), face); grid.after(box);
  }
  if (v.checklist != null && cards[v.checklist]) {             // 13: the checklist ticks itself off
    grid.classList.add('one-col'); const c = cards[v.checklist]; const ul = node('ul', 'checklist');
    String(s.cards[v.checklist].body).split('\n').forEach((t, i) => { const li = node('li'); li.style.setProperty('--i', i); li.append(node('span', 'check-box'), node('span', 'check-text', t)); ul.append(li); });
    if (v.addLine) { const li = node('li', 'check-add'); li.style.setProperty('--i', ul.children.length); const t = node('span', 'check-text', ''); t.contentEditable = 'true'; t.dataset.placeholder = v.addLine; t.addEventListener('keydown', e => e.stopPropagation()); li.append(node('span', 'check-plus', '+'), t); ul.append(li); }
    c.querySelector('p')?.replaceWith(ul);
  }
  return x;
}
const REACT = ['?', '⇄', '…?', '⌛', '!!'];
// slide 7: the steps become nested rings (each term sits inside the one before it)
function buildNest(main, s) {
  const wrap = main.querySelector('.steps-wrap'); const chain = wrap?.querySelector('.steps-chain'); if (!chain) return null;
  const items = [...chain.querySelectorAll('.step-item')]; chain.classList.add('nest-hidden');
  const R = [230, 172, 116, 68], CX = 380, B = 470;
  const g = document.createElementNS(SVGNS, 'svg'); g.setAttribute('viewBox', '0 0 760 480'); g.setAttribute('class', 'nest'); g.setAttribute('role', 'group');
  const labels = [];
  (s.items || []).forEach((it, i) => {
    const r = R[i], cy = B - r, grp = document.createElementNS(SVGNS, 'g'); grp.setAttribute('class', 'ring'); grp.style.setProperty('--i', i);
    const c = document.createElementNS(SVGNS, 'ellipse'); c.setAttribute('cx', CX); c.setAttribute('cy', cy); c.setAttribute('rx', r * 1.5); c.setAttribute('ry', r);
    const t = document.createElementNS(SVGNS, 'text'); t.setAttribute('x', CX); t.setAttribute('class', 'ring-label' + (i === R.length - 1 ? ' ring-label-core' : ''));
    const inner = i === R.length - 1; const words = inner ? it.label.split(' ') : [it.label];
    const lines = inner && words.length > 2 ? [words.slice(0, -1).join(' '), words.at(-1)] : [it.label];
    const y0 = inner ? cy - (lines.length - 1) * 11 + 6 : cy - r + 52;
    lines.forEach((ln, k) => { const ts = document.createElementNS(SVGNS, 'tspan'); ts.setAttribute('x', CX); ts.setAttribute('y', y0 + k * 20); ts.textContent = ln; t.append(ts); });
    grp.append(c, t); grp.addEventListener('click', () => items[i]?.querySelector('button')?.click());
    g.append(grp); labels.push(t);
  });
  const row = node('div', 'nest-row'); row.append(g); wrap.insertBefore(row, chain);
  const rings = [...g.querySelectorAll('.ring')];
  const api = { row, labels, onChange: null, current: () => { const a = items.map(li => li.classList.contains('active')); return a.every(Boolean) ? -1 : a.indexOf(true); } };
  const sync = () => { items.forEach((li, i) => rings[i].classList.toggle('on', li.classList.contains('active'))); g.classList.toggle('any-on', items.some(li => li.classList.contains('active'))); api.onChange?.(); };
  const mo = new MutationObserver(sync); items.forEach(li => mo.observe(li, { attributes: true, attributeFilter: ['class'] }));
  slideController.signal.addEventListener('abort', () => mo.disconnect());
  return api;
}
function rel(el, stage) { const a = el.getBoundingClientRect(), b = stage.getBoundingClientRect(); return { x: a.left - b.left + stage.scrollLeft, y: a.top - b.top, w: a.width, h: a.height }; }
function renderVisual(stage, body, main, s) {
  const v = s.visual; if (!v) return;
  if (v.art === 'timeline') main.prepend(ART.timeline());
  if (v.cardArt) { const cards = main.querySelectorAll('.card'); Object.entries(v.cardArt).forEach(([i, kind]) => { if (cards[i] && ART[kind]) cards[i].append(ART[kind]()); }); }
  if (v.pillarIcons) main.querySelectorAll('.pillar').forEach((p, i) => p.prepend(svg('0 0 24 24', PILLAR_ICONS[i % 4], 'pillar-icon')));
  if (v.stagger) main.classList.add('stagger-' + v.stagger);
  if (v.hero != null) { main.classList.add('has-hero'); main.querySelectorAll('.card')[v.hero]?.classList.add('card-hero'); }
  let popRow = null, nest = null; const ex = renderExtras(stage, main, s, v);
  if (v.art === 'nested') nest = buildNest(main, s);
  if (v.popOut != null && s.cards?.[v.popOut]) {
    const src = s.cards[v.popOut]; main.querySelectorAll('.card')[v.popOut]?.remove();
    popRow = node('div', 'pop-row'); const col = node('div', 'pop-col'); const list = node('div', 'pop-chips');
    String(src.body).split('\n').forEach((t, i) => { const c = node('span', 'pop-chip'); const inner = node('span', 'pop-chip-in', t); inner.style.setProperty('--i', i); if (v.chipIcons?.[i]) inner.prepend(node('span', 'chip-ico', v.chipIcons[i])); c.append(inner); list.append(c); });
    if (v.chipGrid) list.classList.add('grid' + v.chipGrid);
    col.append(node('p', 'pop-label', src.title), list); popRow.append(col); const tg = main.querySelector('.tagline'); if (tg) tg.before(popRow); else main.append(popRow);
  }
  highlight(stage, s);
  const bot = BOTS[v.bot]; if (!bot) return;
  const fig = node('figure', 'bot bot-' + v.bot + ' place-' + v.place); fig.setAttribute('aria-hidden', 'true');
  const live = node('div', 'bot-live'); const img = document.createElement('img'); img.src = bot.src; img.alt = ''; img.decoding = 'async';
  const hatch = node('span', 'hatch'); hatch.innerHTML = LID;
  if (bot.hatch) { hatch.style.left = bot.hatch[0] + '%'; hatch.style.top = bot.hatch[1] + '%'; live.append(img, hatch); } else live.append(img);
  fig.append(live);
  if (v.tool === 'thought') fig.append(ART.thought());
  if (v.place === 'left') { body.prepend(fig); body.classList.add('with-bot', 'bot-left'); }
  else if (v.place === 'beside') { body.append(fig); body.classList.add('with-bot', 'bot-beside'); }
  else if (v.place === 'under') { main.append(fig); }
  else if (v.place === 'popout' && popRow) { popRow.prepend(fig); }
  else if (v.place === 'nest' && nest) { nest.row.prepend(fig); }
  else if (v.place === 'key' && ex.row) { ex.row.prepend(fig); }
  else if (v.place === 'slot' && ex.slot) { ex.slot.append(fig); }
  else if (v.place === 'stamps' && ex.stampRow) { ex.stampRow.querySelector('.stamps-label')?.after(fig); }
  else if (v.place === 'stack' && ex.slot) { fig.classList.add('place-stack'); ex.slot.append(fig); }
  else if (v.place === 'pointer') {
    const target = main.querySelectorAll('.card')[v.pointAt]; fig.classList.add('pointer-bot'); stage.append(fig);
    const H = v.pointH || 230; fig.style.height = H + 'px';
    const put = () => { if (!target) return; const t = rel(target, stage); const W = H * bot.ratio;
      const tipX = W * bot.tip[0] / 100, tipY = H * bot.tip[1] / 100;
      fig.style.left = (bot.tip[0] < 50 ? t.x + t.w - 18 - tipX : t.x + 18 - tipX) + 'px';
      fig.style.top = (t.y + t.h / 2 - tipY) + 'px'; };
    requestAnimationFrame(() => requestAnimationFrame(put)); window.addEventListener('resize', put, { signal: slideController.signal });
    ex.pointer = fig;
    if (v.spotlight != null) { const tm = setTimeout(() => fig.classList.add('show'), 1600); slideController.signal.addEventListener('abort', () => clearTimeout(tm)); }
  }
  else if (v.place === 'timeline') { const tl = main.querySelector('.art-timeline'); const row = node('div', 'tl-row'); tl.replaceWith(row); row.append(tl, fig); }
  const fx = document.createElementNS(SVGNS, 'svg'); fx.setAttribute('class', 'fx'); fx.setAttribute('aria-hidden', 'true'); stage.append(fx);
  const draw = () => {
    fx.replaceChildren(); stage.querySelectorAll('.fly').forEach(f => f.remove());
    const r = stage.getBoundingClientRect(); fx.setAttribute('viewBox', '0 0 ' + r.width + ' ' + stage.scrollHeight); fx.style.height = stage.scrollHeight + 'px';
    const h = rel(hatch, stage);
    const from = { x: h.x, y: h.y };
    const target = v.target ? stage.querySelector(v.target) : null;
    if (v.tool === 'map' && target) {
      const t = rel(target, stage), to = { x: t.x + 70, y: t.y - 8 }, top = Math.min(from.y, to.y) - 110;
      const d = 'M' + from.x + ' ' + from.y + ' C' + (from.x + 30) + ' ' + top + ' ' + (to.x - 120) + ' ' + top + ' ' + to.x + ' ' + to.y;
      fx.innerHTML = '<path class="trail" pathLength="1" d="' + d + '"/><g class="map-pop" transform="translate(' + from.x + ' ' + (from.y - 36) + ')"><g class="map-inner"><path d="M-22-14 -8-18 8-12 22-16V14L8 18-8 12-22 16z"/><path class="fold" d="M-8-18V12M8-12V18"/><circle class="pin" cx="14" cy="-2" r="4"/></g></g>';
    }
    if (v.tool === 'arm' && target) {
      const t = rel(target, stage), to = { x: t.x + t.w / 2, y: t.y + t.h / 2 };
      const d = 'M' + from.x + ' ' + from.y + ' C' + (from.x - 10) + ' ' + (from.y - 150) + ' ' + (to.x + 90) + ' ' + (to.y - 170) + ' ' + to.x + ' ' + (to.y - 30);
      fx.innerHTML = '<defs><mask id="armmask" maskUnits="userSpaceOnUse"><path class="arm-reveal" pathLength="1" d="' + d + '"/></mask></defs>' +
        '<g mask="url(#armmask)"><path class="arm-tube" d="' + d + '"/><path class="arm-rings" d="' + d + '"/></g>' +
        '<g class="arm-tip" transform="translate(' + to.x + ' ' + (to.y - 30) + ')"><circle class="ripple" r="14"/><circle class="ripple r2" r="14"/><path class="claw" d="M-9 -6 -4 10M9 -6 4 10"/><circle class="knuckle" r="9"/></g>';
      target.classList.add('tapped');
    }
    if (v.tool === 'toolbox') {
      main.querySelectorAll('.pillar-icon').forEach((ic, i) => {
        const t = rel(ic, stage); const f = node('span', 'fly'); f.style.setProperty('--i', i);
        f.style.left = from.x + 'px'; f.style.top = from.y + 'px';
        f.style.setProperty('--dx', (t.x + t.w / 2 - from.x) + 'px'); f.style.setProperty('--dy', (t.y + t.h / 2 - from.y) + 'px');
        f.append(svg('0 0 24 24', PILLAR_ICONS[i % 4])); stage.append(f);
      });
    }
  };
  requestAnimationFrame(() => requestAnimationFrame(draw));
  img.addEventListener('load', () => requestAnimationFrame(draw), { once: true });
  window.addEventListener('resize', draw, { signal: slideController.signal });
  if (ex.aim.length) {
    const aim = () => { const h = rel(hatch, stage); ex.aim.forEach(el => { const t = rel(el, stage); el.firstChild.style.setProperty('--dx', (h.x - t.x - t.w / 2) + 'px'); el.firstChild.style.setProperty('--dy', (h.y - t.y - t.h / 2) + 'px'); }); };
    aim(); const tm = setTimeout(aim, 1000); slideController.signal.addEventListener('abort', () => clearTimeout(tm));
    window.addEventListener('resize', aim, { signal: slideController.signal });
  }
  if (v.reveal === 'click') {
    const faces = (v.faces || []).map(f => { const src = 'assets/aetherbot/faces/aetherbot-face-' + f + '.webp'; new Image().src = src; return src; });
    const bub = node('span', 'react'); if (!faces.length) fig.append(bub);
    ex.react = i => {
      live.classList.remove('jolt'); bub.classList.remove('show'); void live.offsetWidth; live.classList.add('jolt');
      if (faces.length) img.src = faces[i % faces.length]; else { bub.textContent = REACT[i % REACT.length]; bub.classList.add('show'); }
    };
  }
  if (nest) {
    const lens = node('span', 'lens'); lens.innerHTML = '<svg viewBox="0 0 64 64" aria-hidden="true"><circle cx="26" cy="26" r="19" class="lens-glass"/><circle cx="26" cy="26" r="19" class="lens-rim"/><path d="M40 40 58 58" class="lens-handle"/><path d="M16 19a12 12 0 0 1 8-6" class="lens-shine"/></svg>';
    stage.append(lens);
    const place = () => {
      const on = nest.current();
      let x, y;
      if (on < 0) { const h = rel(hatch, stage); x = h.x + 18; y = h.y - 46; }
      else { const t = rel(nest.labels[on], stage); x = t.x - 34; y = t.y + t.h / 2; }
      lens.style.left = x + 'px'; lens.style.top = y + 'px';
    };
    nest.onChange = place; const tm = setTimeout(() => { lens.classList.add('out'); place(); }, 1100);
    slideController.signal.addEventListener('abort', () => clearTimeout(tm));
    window.addEventListener('resize', place, { signal: slideController.signal });
  }
  if (popRow) {
    // chips start inside the hatch; measured after the bot has finished peeking up
    const aim = () => { const h = rel(hatch, stage); popRow.querySelectorAll('.pop-chip').forEach(c => { const t = rel(c, stage); const inner = c.firstChild; inner.style.setProperty('--dx', (h.x - t.x - t.w / 2) + 'px'); inner.style.setProperty('--dy', (h.y - t.y - t.h / 2) + 'px'); }); };
    aim(); const tm = setTimeout(aim, 1000); slideController.signal.addEventListener('abort', () => clearTimeout(tm));
    window.addEventListener('resize', aim, { signal: slideController.signal });
  }
}

/* ---- slide type -> colour chip, footer segment ---- */
const TYPE_LABEL = { practice: 'Assignment', concept: 'Concept', review: 'Review', recap: 'Recap', pause: 'Break', context: 'Context' };
function slideType(s) { return TYPE_LABEL[s.type] ? s.type : (s.layout === 'exercise' ? 'practice' : s.layout === 'recap' ? 'recap' : 'context'); }

const stateKey = () => 'als:' + current + ':' + slides[current].title;
function loadState() { try { return JSON.parse(sessionStorage.getItem(stateKey()) || '{}') || {}; } catch { return {}; } }
function saveState(st) { try { sessionStorage.setItem(stateKey(), JSON.stringify(st)); } catch {} }

function renderInstructions(s) {
  const box = node('section', 'exercise-instructions'); const st = loadState(); const steps = s.steps || [];
  if (steps.length) {
    const head = node('div', 'do-head'); head.append(node('h2', null, s.stepsHeading || 'Your prompt must ask Claude Code to:')); const count = node('span', 'do-count'); head.append(count); box.append(head);
    const list = node('ol', 'do-list'); const done = Array.isArray(st.done) ? st.done.slice(0, steps.length) : [];
    steps.forEach((step, i) => {
      const li = node('li', 'do-item'); const label = node('label'); const cb = document.createElement('input'); cb.type = 'checkbox'; cb.checked = !!done[i];
      label.append(cb, node('span', 'do-text', step)); li.classList.toggle('done', cb.checked);
      cb.addEventListener('change', () => { done[i] = cb.checked; li.classList.toggle('done', cb.checked); saveState({ ...loadState(), done }); paint(); if (done.filter(Boolean).length === steps.length) notify('All steps done · check the checkpoint'); });
      li.append(label); list.append(li);
    });
    const paint = () => { const n = done.filter(Boolean).length; count.textContent = n + ' / ' + steps.length; box.classList.toggle('all-done', n === steps.length); };
    paint(); box.append(list);
  }
  if (s.expected) { const p = node('p', 'expected'); p.append(node('span', 'field-label', 'Expected result'), node('span', null, s.expected)); box.append(p); }
  if (s.check) {
    const cp = node('div', 'checkpoint'); const passed = !!st.passed; cp.classList.toggle('passed', passed);
    const top = node('div', 'checkpoint-top'); top.append(node('span', 'field-label', 'Checkpoint'));
    const toggle = node('button', 'checkpoint-toggle', passed ? 'Passed ✓' : 'Mark passed'); toggle.setAttribute('aria-pressed', String(passed));
    toggle.addEventListener('click', () => { const next = !(loadState().passed); saveState({ ...loadState(), passed: next }); cp.classList.toggle('passed', next); toggle.textContent = next ? 'Passed ✓' : 'Mark passed'; toggle.setAttribute('aria-pressed', String(next)); announce(next ? 'Checkpoint marked as passed' : 'Checkpoint reopened'); });
    top.append(toggle); cp.append(top, node('p', null, s.check)); box.append(cp);
  }
  return box.childNodes.length ? box : null;
}
function sideBySide(s, instructions) { if (!instructions) return false; return s.layout !== 'steps'; }

function renderProgress() {
  const bar = $('progress'); const hadFocus = bar.contains(document.activeElement); bar.replaceChildren();
  slides.forEach((s, i) => {
    const seg = node('button', 'seg'); seg.dataset.type = slideType(s); seg.classList.toggle('done', i < current); seg.classList.toggle('current', i === current);
    seg.tabIndex = i === current ? 0 : -1; if (i === current) seg.setAttribute('aria-current', 'step');
    seg.setAttribute('aria-label', String(i + 1) + '. ' + s.title); seg.title = s.title;
    seg.addEventListener('click', () => go(i)); bar.append(seg);
  });
  if (hadFocus) bar.querySelector('.seg.current')?.focus();
}

/* ---- presenter-view sync: BroadcastChannel, localStorage fallback ---- */
const PRESENTER_CHANNEL = 'aetherlink-classroom-slides';
const PRESENTER_KEY = 'als:presenter:index';
let presenterChannel = null;
try { if ('BroadcastChannel' in window) presenterChannel = new BroadcastChannel(PRESENTER_CHANNEL); } catch {}
function broadcastSlide(index) {
  if (presenterChannel) { try { presenterChannel.postMessage({ type: 'slide', index }); } catch {} }
  try { localStorage.setItem(PRESENTER_KEY, JSON.stringify({ index, at: Date.now() })); } catch {}
}
function openPresenterView() {
  const w = window.open('presenter.html?i=' + current, 'aetherlink-presenter', 'width=1000,height,680,noopener');
  if (!w) notify('Allow pop-ups to open the presenter view.');
}

function render() {
  slideController?.abort(); slideController = new AbortController();
  const s = slides[current]; const type = slideType(s);
  document.body.classList.toggle('dark', !!s.dark);
  document.body.classList.toggle('is-assignment', type === 'practice');
  document.body.dataset.type = type;
  document.title = s.title + ' · Aetherlink classroom';
  const stage = $('stage'); stage.replaceChildren();
  if (type === 'practice') {
    const banner = node('div', 'assignment-banner');
    banner.append(node('span', 'dot'), document.createTextNode('Assignment in progress'));
    stage.append(banner);
  }
  const head = node('section', 'heading'); const top = node('div', 'heading-top'); const eyebrow = node('p', 'eyebrow');
  const parts = (s.kicker || '').split('·').map(x => x.trim());
  eyebrow.append(node('span', 'type-chip', TYPE_LABEL[type]), node('span', 'kicker-text', parts.join(' · ')));
  top.append(eyebrow, node('p', 'slide-count', String(current + 1) + ' / ' + slides.length));
  head.append(top, node('h1', null, s.title), node('p', 'subtitle', s.subtitle));
  stage.append(head);
  const body = node('div', 'slide-body'); const main = node('div', 'slide-main'); body.append(main); stage.append(body);
  stopTimer();
  renderLayout(main, s);
  renderTagline(main, s);
  renderVisual(stage, body, main, s);
  const instructions = (s.visual?.quiz || s.visual?.stamps) ? null : renderInstructions(s);
  if (instructions) {
    const side = sideBySide(s, instructions);
    body.classList.toggle('with-side', side);
    if (side) body.append(instructions); else stage.append(instructions);
  }
  $('count').textContent = String(current + 1).padStart(2, '0') + ' / ' + slides.length;
  renderProgress();
  $('prev').disabled = current === 0; $('next').disabled = current === slides.length - 1;
  announce('Slide ' + (current + 1) + ' of ' + slides.length + ': ' + s.title);
  broadcastSlide(current);
}
function go(n) { if (n < 0 || n >= slides.length) return; location.hash = String(n + 1); }
function fromHash() { if (location.hash === '#stage') { $('stage').focus(); return; } const n = Number(location.hash.slice(1)); current = Number.isInteger(n) && n >= 1 && n <= slides.length ? n - 1 : 0; render(); window.scrollTo({ top: 0, behavior: 'instant' }); }

$('prev').addEventListener('click', () => go(current - 1));
$('next').addEventListener('click', () => go(current + 1));
$('prompt').addEventListener('click', () => showPrompt());
$('presenter').addEventListener('click', openPresenterView);
$('chapters').addEventListener('click', () => {
  const list = node('nav', 'chapter-list'); list.setAttribute('aria-label', 'All ' + slides.length + ' slides');
  slides.forEach((s, i) => { const b = node('button', 'chapter-link'); b.append(node('span', null, String(i + 1).padStart(2, '0')), node('strong', null, s.title)); b.setAttribute('aria-current', String(i === current)); b.addEventListener('click', () => { closePanel(); go(i); }); list.append(b); });
  openPanel('Chapters', list);
});
$('fullscreen').addEventListener('click', async () => { try { if (document.fullscreenElement) await document.exitFullscreen(); else await document.documentElement.requestFullscreen(); } catch { notify('Fullscreen is unavailable in this browser.'); } });
document.addEventListener('fullscreenchange', () => $('fullscreen').setAttribute('aria-label', document.fullscreenElement ? 'Exit fullscreen' : 'Enter fullscreen'));
document.addEventListener('keydown', e => {
  if (panel.open || e.altKey || e.ctrlKey || e.metaKey || /INPUT|TEXTAREA|SELECT/.test(e.target.tagName) || e.target.closest('[role=tablist]')) return;
  if (e.key === 'ArrowRight' || e.key === 'PageDown') { e.preventDefault(); if (window.__reveal?.()) return; go(current + 1); }
  if (e.key === 'ArrowLeft' || e.key === 'PageUp') { e.preventDefault(); go(current - 1); }
  if (e.key === 'Home') { e.preventDefault(); go(0); }
  if (e.key === 'End') { e.preventDefault(); go(slides.length - 1); }
  if ((e.key === 'b' || e.key === 'B') && window.__planB) { e.preventDefault(); window.__planB(); return; }
  if (e.key === 's' || e.key === 'S') { e.preventDefault(); openPresenterView(); }
});
window.addEventListener('pagehide', () => { slideController?.abort(); stopTimer(); });
window.addEventListener('hashchange', fromHash);
fromHash();
