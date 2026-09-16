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
  head:  { src: 'assets/aetherbot/aetherbot-head.webp',  hatch: [49.6, 25.8] }
};
const PILLAR_ICONS = [
  '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1.3"/>',
  '<path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z"/><path d="M8.5 12l2.5 2.5 4.5-5"/>',
  '<circle cx="10.5" cy="10.5" r="6.5"/><path d="M20 20l-4.8-4.8"/><path d="M7.5 10.5l2 2 3.5-4"/>',
  '<path d="M4 12a8 8 0 0 1 14-5l2 2"/><path d="M20 4v5h-5"/><path d="M20 12a8 8 0 0 1-14 5l-2-2"/><path d="M4 20v-5h5"/>'];
const ART = {
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
function rel(el, stage) { const a = el.getBoundingClientRect(), b = stage.getBoundingClientRect(); return { x: a.left - b.left + stage.scrollLeft, y: a.top - b.top, w: a.width, h: a.height }; }
function renderVisual(stage, body, main, s) {
  const v = s.visual; if (!v) return;
  if (v.art === 'timeline') main.prepend(ART.timeline());
  if (v.cardArt) { const cards = main.querySelectorAll('.card'); Object.entries(v.cardArt).forEach(([i, kind]) => { if (cards[i] && ART[kind]) cards[i].append(ART[kind]()); }); }
  if (v.pillarIcons) main.querySelectorAll('.pillar').forEach((p, i) => p.prepend(svg('0 0 24 24', PILLAR_ICONS[i % 4], 'pillar-icon')));
  highlight(stage, s);
  const bot = BOTS[v.bot]; if (!bot) return;
  const fig = node('figure', 'bot bot-' + v.bot + ' place-' + v.place); fig.setAttribute('aria-hidden', 'true');
  const live = node('div', 'bot-live'); const img = document.createElement('img'); img.src = bot.src; img.alt = ''; img.decoding = 'async';
  const hatch = node('span', 'hatch'); hatch.style.left = bot.hatch[0] + '%'; hatch.style.top = bot.hatch[1] + '%'; hatch.innerHTML = LID;
  live.append(img, hatch); fig.append(live);
  if (v.tool === 'thought') fig.append(ART.thought());
  if (v.place === 'left') { body.prepend(fig); body.classList.add('with-bot', 'bot-left'); }
  else if (v.place === 'beside') { body.append(fig); body.classList.add('with-bot', 'bot-beside'); }
  else if (v.place === 'under') { main.append(fig); }
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
    const head = node('div', 'do-head'); head.append(node('h2', null, 'Do this now')); const count = node('span', 'do-count'); head.append(count); box.append(head);
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
  const instructions = renderInstructions(s);
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
  if (e.key === 'ArrowRight' || e.key === 'PageDown') { e.preventDefault(); go(current + 1); }
  if (e.key === 'ArrowLeft' || e.key === 'PageUp') { e.preventDefault(); go(current - 1); }
  if (e.key === 'Home') { e.preventDefault(); go(0); }
  if (e.key === 'End') { e.preventDefault(); go(slides.length - 1); }
  if (e.key === 's' || e.key === 'S') { e.preventDefault(); openPresenterView(); }
});
window.addEventListener('pagehide', () => { slideController?.abort(); stopTimer(); });
window.addEventListener('hashchange', fromHash);
fromHash();
