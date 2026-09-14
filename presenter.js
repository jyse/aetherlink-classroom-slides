'use strict';
/* ==========================================================================
   Presenter view — a separate window/tab kept in sync with the main deck.
   Sync channel: BroadcastChannel('aetherlink-classroom-slides'), same name
   the main app.js broadcasts on. Falls back to a localStorage 'storage'
   event for browsers without BroadcastChannel (older Safari/WebViews).
   ========================================================================== */
const slides = window.SLIDES || [];
const PRESENTER_CHANNEL = 'aetherlink-classroom-slides';
const PRESENTER_KEY = 'als:presenter:index';
const $ = id => document.getElementById(id);

let current = 0;
const startedAt = Date.now();
let assignmentSeconds = 0, assignmentHandle = null, assignmentRunning = false;

function setSyncStatus(live) {
  $('sync-status').classList.toggle('live', live);
  $('sync-label').textContent = live ? 'Live — following the main window' : 'Waiting for the main window…';
}

function fmt(totalSeconds) {
  const m = Math.floor(totalSeconds / 60), s = totalSeconds % 60;
  return String(m).padStart(2, '0') + ':' + String(s).padStart(2, '0');
}

function renderElapsed() { $('elapsed').textContent = fmt(Math.floor((Date.now() - startedAt) / 1000)); }
setInterval(renderElapsed, 1000);
renderElapsed();

function stopAssignmentTimer() { if (assignmentHandle) { clearInterval(assignmentHandle); assignmentHandle = null; } assignmentRunning = false; }

function setupAssignmentTimer(minutes) {
  stopAssignmentTimer();
  const box = $('p-timer');
  if (!minutes) { box.hidden = true; return; }
  box.hidden = false;
  assignmentSeconds = minutes * 60;
  paintAssignmentTimer();
  $('p-timer-start').textContent = 'Start';
}
function paintAssignmentTimer() {
  const box = $('p-timer');
  $('p-timer-face').textContent = fmt(Math.max(assignmentSeconds, 0));
  box.classList.toggle('late', assignmentSeconds <= 60);
}
$('p-timer-start').addEventListener('click', () => {
  if (assignmentRunning) { stopAssignmentTimer(); $('p-timer-start').textContent = 'Resume'; return; }
  assignmentRunning = true; $('p-timer-start').textContent = 'Pause';
  assignmentHandle = setInterval(() => {
    if (assignmentSeconds > 0) { assignmentSeconds--; paintAssignmentTimer(); }
    else { stopAssignmentTimer(); $('p-timer-face').textContent = 'TIME'; }
  }, 1000);
});
$('p-timer-reset').addEventListener('click', () => {
  const s = slides[current]; stopAssignmentTimer();
  assignmentSeconds = (s?.timer || 0) * 60; paintAssignmentTimer(); $('p-timer-start').textContent = 'Start';
});

function renderSlide(index) {
  if (!Number.isInteger(index) || index < 0 || index >= slides.length) return;
  current = index;
  const s = slides[current];
  const type = s.type || (s.layout === 'exercise' ? 'practice' : s.layout === 'recap' ? 'recap' : 'context');
  const TYPE_LABEL = { practice: 'Assignment', concept: 'Concept', review: 'Review', recap: 'Recap', pause: 'Break', context: 'Context' };
  $('ptype-wrap').dataset.ptype = type;
  $('p-type-label').textContent = TYPE_LABEL[type] || 'Context';
  $('p-kicker-text').textContent = s.kicker || '';
  $('p-progress').textContent = (current + 1) + ' / ' + slides.length;
  $('p-title').textContent = s.title;
  $('p-notes').textContent = s.notes || 'No facilitator notes on this slide.';
  $('p-notes').classList.toggle('p-empty', !s.notes);
  const promptBlock = $('p-prompt-block');
  if (s.prompt) { promptBlock.hidden = false; $('p-prompt').textContent = s.prompt; } else { promptBlock.hidden = true; }
  const next = slides[current + 1];
  $('p-next-title').textContent = next ? (current + 2) + '. ' + next.title : 'This is the last slide.';
  setupAssignmentTimer(s.timer);
}

/* ---- sync ---- */
let channel = null;
try { if ('BroadcastChannel' in window) channel = new BroadcastChannel(PRESENTER_CHANNEL); } catch {}
if (channel) {
  channel.addEventListener('message', e => { if (e.data && e.data.type === 'slide') { setSyncStatus(true); renderSlide(e.data.index); } });
}
window.addEventListener('storage', e => {
  if (e.key !== PRESENTER_KEY || !e.newValue) return;
  try { const data = JSON.parse(e.newValue); setSyncStatus(true); renderSlide(data.index); } catch {}
});

/* ---- initial paint: URL param, then whatever localStorage already has ---- */
(function init() {
  const params = new URLSearchParams(location.search);
  const fromUrl = Number(params.get('i'));
  if (Number.isInteger(fromUrl) && fromUrl >= 0 && fromUrl < slides.length) { renderSlide(fromUrl); }
  try {
    const stored = JSON.parse(localStorage.getItem(PRESENTER_KEY) || 'null');
    if (stored && Number.isInteger(stored.index)) { renderSlide(stored.index); if (Date.now() - (stored.at || 0) < 15000) setSyncStatus(true); }
  } catch {}
  if (!slides.length) { $('p-title').textContent = 'slides.js did not load.'; }
})();
