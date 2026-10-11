import { execFileSync } from "node:child_process";
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import * as k from "../vendor/kit/iso-kit.mjs";
import { RESPONSIVE_FIGURE_STYLE } from "../responsive.mjs";
import { kitScript } from "../vendor/scripts/inline-kit.mjs";
import { PARTS, PHASES, assertModel, stateAt } from "./model.mjs";

assertModel();
const HERE = dirname(fileURLToPath(import.meta.url));
const OUT = join(HERE, "../../../assets/anatomy");
const theme = process.argv.includes("--light") ? "light" : "dark";
const WIDTH = 680, HEIGHT = 390;
const BASE = { x: -136, y: -72, w: 278, d: 144, r: 9 };
const P = k.fitProjection([...k.boxCorners(BASE, -13, 96), [145, 74, 96]], WIDTH, HEIGHT, { pad: 30, azimuth: 43, elevation: 32 });
const at = (p) => k.iso(p, P);
const S = (p, o = {}) => k.solidSvg(p, o);
const L = (d, o = {}) => k.lineSvg(d, o);
const D = (p, o = {}) => k.dotsSvg(p, o);
const slab = (plan, z, h, tone = "mid", lit = false) => S(k.slabOf(plan, z, h, P, 5, 0.6), { tone, lit });

function base() {
  const out = [`<path class="iso-halo" d="${k.haloOf(BASE, -13, 12, P)}"/>`];
  for (const [x, y] of [...k.corners(BASE, 18)].sort((a, b) => k.depthOf([a[0], a[1], 0], P) - k.depthOf([b[0], b[1], 0], P))) {
    out.push(slab({ x: x - 5, y: y - 5, w: 10, d: 10, r: 2 }, -13, 4, "lo"));
  }
  out.push(slab(BASE, -9, 9));
  out.push(L(k.planOutline(k.insetPlan(BASE, 5), 0, P), { tone: "lo" }));
  const screws = k.corners(BASE, 10);
  out.push(L(screws.map(([x, y]) => k.ring(x, y, 2, 0, P, 14)).join(""), { tone: "lo" }));
  out.push(D(screws.map(([x, y]) => at([x, y, 0])), { size: 0.48 }));
  const ruler = { x: -112, y: 57, w: 226, d: 7, r: 1 };
  out.push(slab(ruler, 0, 0.7, "lo"));
  const ticks = k.topTicks(ruler.x + 4, ruler.x + ruler.w - 4, 5, 5, ruler.y + 0.6, 0.8, [2, 3.5], P);
  out.push(L(ticks.minor, { tone: "lo" }), L(ticks.major, { tone: "mid" }));
  return out.join("");
}

function bench(x, title, review = false) {
  const out = [];
  const top = { x, y: -39, w: 77, d: 62, r: 4 };
  for (const [lx, ly] of k.corners(top, 7)) out.push(slab({ x: lx - 2, y: ly - 2, w: 4, d: 4, r: 1 }, 0, 30, "mid"));
  out.push(slab(top, 30, 6, review ? "hi" : "mid"));
  out.push(L(k.planOutline(k.insetPlan(top, 4), 36, P), { tone: "faint" }));
  const screen = { x: x + 12, y: -34, w: 48, d: 5, r: 2 };
  out.push(slab({ x: x + 34, y: -31, w: 5, d: 7, r: 1 }, 36, 22, "mid"));
  out.push(slab(screen, 54, 32, "hi", review));
  out.push(L(k.planOutline(k.insetPlan(screen, 3), 84, P), { tone: "lo" }));
  for (let i = 0; i < 3; i++) out.push(L(k.lineOnTop([x + 18, -30 + i * 0.4], [x + 52 - i * 6, -30 + i * 0.4], 78 - i * 7, P), { tone: "faint", free: true }));
  const keyboard = { x: x + 14, y: -10, w: 45, d: 18, r: 2 };
  out.push(slab(keyboard, 36, 2.5, "mid"));
  for (let i = 0; i < 6; i++) out.push(slab({ x: x + 18 + (i % 3) * 11, y: -6 + Math.floor(i / 3) * 7, w: 8, d: 4, r: 0.6 }, 38.5, 0.8, "lo"));
  const lampX = review ? x + 68 : x + 7;
  out.push(slab({ x: lampX - 5, y: 12, w: 10, d: 10, r: 2 }, 36, 3, "mid"));
  out.push(slab({ x: lampX - 2, y: 15, w: 4, d: 4, r: 1 }, 39, 38, "mid"));
  out.push(slab({ x: lampX - 7, y: 10, w: 14, d: 14, r: 3 }, 77, 5, review ? "hi" : "mid", review));
  const paper = review ? { x: x + 5, y: 5, w: 28, d: 15, r: 1 } : { x: x + 42, y: 5, w: 27, d: 15, r: 1 };
  out.push(slab(paper, 36, 0.8, "hi"));
  out.push(L(k.planOutline(k.insetPlan(paper, 2), 36.8, P, 3), { tone: "lo" }));
  if (review) out.push(slab({ x: x + 14, y: 9, w: 8, d: 8, r: 2 }, 37, 4, "hi", true));
  else out.push(slab({ x: x + 35, y: 10, w: 32, d: 2, r: 0.8 }, 37, 1.4, "mid"));
  out.push(k.faceTextSvg(k.topMatrix([x + 38, -36], 86, P, "x"), title, { size: 3, tone: "lo", anchor: "middle" }));
  return out.join("");
}

function railsAndGate() {
  const out = [];
  for (const y of [31, 45]) out.push(slab({ x: -73, y, w: 170, d: 4, r: 1 }, 0, 4, "mid"));
  for (const x of [-79, 97]) out.push(slab({ x, y: 27, w: 6, d: 26, r: 1.5 }, 0, 9, "mid"));
  out.push(slab({ x: 103, y: 20, w: 24, d: 40, r: 3 }, 0, 9, "mid"));
  out.push(slab({ x: 112, y: 37, w: 6, d: 6, r: 1 }, 9, 52, "mid"));
  out.push(slab({ x: 110, y: 35, w: 10, d: 10, r: 2 }, 61, 3, "mid"));
  out.push(slab({ x: 104, y: 37, w: 22, d: 6, r: 2 }, 44, 6, "hi"));
  out.push(`<g data-part="gate">${slab({ x: 101, y: 34, w: 5, d: 16, r: 1 }, 12, 46, "hi", true)}${slab({ x: 101, y: 34, w: 24, d: 5, r: 1 }, 53, 5, "hi", true)}${slab({ x: 121, y: 34, w: 5, d: 16, r: 1 }, 12, 46, "hi", true)}</g>`);
  out.push(slab({ x: 111, y: 51, w: 8, d: 8, r: 2 }, 9, 3, "mid"));
  out.push(slab({ x: 113, y: 53, w: 4, d: 5, r: 1 }, 12, 26, "mid"));
  out.push(slab({ x: 110, y: 52, w: 10, d: 10, r: 2 }, 38, 4, "hi", true));
  return out.join("");
}

function documentCarriage() {
  const out = [];
  out.push(slab({ x: -72, y: 26, w: 30, d: 28, r: 3 }, 7, 5, "hi", true));
  for (const [x, y] of k.corners({ x: -72, y: 26, w: 30, d: 28, r: 3 }, 5)) out.push(slab({ x: x - 3, y: y - 3, w: 6, d: 6, r: 1 }, 3, 4, "mid"));
  out.push(slab({ x: -68, y: 30, w: 22, d: 20, r: 1 }, 12, 1, "hi", true));
  out.push(L(k.planOutline({ x: -65, y: 33, w: 16, d: 14, r: 1 }, 13, P, 3), { tone: "lo" }));
  out.push(slab({ x: -58, y: 48, w: 4, d: 4, r: 1 }, 13, 6, "mid"));
  return `<g data-part="document">${out.join("")}</g>`;
}

const label = "Two separate agent workbenches share no hidden state. A document carriage makes the handoff explicit, a fresh-context reviewer checks it, and a separate human lever opens the acceptance gate. Separate context reduces coupling but does not guarantee correctness.";
const art = () => [base(), bench(-123, "AUTHOR"), bench(16, "REVIEW", true), railsAndGate(), documentCarriage()].join("");
const initial = stateAt(0);
const svg = k.figureSvg({ width: WIDTH, height: HEIGHT, label, body: art() });
const poster = k.figureSvg({ width: WIDTH, height: HEIGHT, label, body: art(), standalone: theme });

const live = `
const P = ${JSON.stringify(P)};
const PHASES = ${JSON.stringify(PHASES)};
const stateAt = ${stateAt.toString()};
const stage = document.querySelector('.iso-stage');
const svg = stage.querySelector('svg');
const documentPart = svg.querySelector('[data-part="document"]');
const gate = svg.querySelector('[data-part="gate"]');
const readout = document.querySelector('[data-readout]');
const still = matchMedia('(prefers-reduced-motion: reduce)');
let value = 0, target = 0, visible = false, frame = 0, last = 0, clock = 0, touring = !still.matches, idle = 0;
const clamp = (v) => Math.max(0, Math.min(PHASES.length - 1, Math.round(v)));
function draw() {
  const state = stateAt(value), nearest = state.index, phase = state.phase;
  const lo = Math.floor(value), hi = Math.min(PHASES.length - 1, Math.ceil(value)), share = value - lo;
  const x = PHASES[lo].x + (PHASES[hi].x - PHASES[lo].x) * share;
  documentPart.setAttribute('transform', translateAlong(P, [x - PHASES[0].x, 0, 0]));
  gate.setAttribute('transform', translateAlong(P, [0, 0, phase.accepted ? 34 : 0]));
  readout.textContent = state.readout;
  stage.setAttribute('aria-valuenow', String(nearest));
  stage.setAttribute('aria-valuetext', phase.label + (phase.accepted ? ', gate open' : ', human acceptance still required'));
}
function tick(now) {
  const dt = last ? Math.min((now - last) / 1000, 1 / 30) : 1 / 60; last = now;
  if (touring) { clock += dt; target = Math.floor(clock / 2.1) % PHASES.length; }
  const next = still.matches ? target : value + (target - value) * (1 - Math.exp(-dt / 0.28));
  value = Math.abs(next - target) < 0.01 ? target : next; draw();
  frame = visible && (touring || value !== target) ? requestAnimationFrame(tick) : 0;
}
const run = () => { if (!frame && visible) { last = 0; frame = requestAnimationFrame(tick); } };
const steer = (to) => { touring = false; target = clamp(to); clearTimeout(idle); idle = setTimeout(() => { touring = !still.matches; clock = target * 2.1; run(); }, 3600); run(); };
new IntersectionObserver((entries) => { visible = entries[entries.length - 1].isIntersecting; if (visible) run(); }, { rootMargin: '120px 0px' }).observe(stage);
still.addEventListener('change', () => { touring = !still.matches; if (touring) clock = target * 2.1; else target = clamp(value); run(); });
stage.addEventListener('pointerdown', (event) => { const box = svg.getBoundingClientRect(); steer(((event.clientX - box.left) / box.width) * PHASES.length); });
stage.addEventListener('keydown', (event) => { let to = null; if (event.key === 'ArrowRight' || event.key === 'ArrowDown') to = target + 1; if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') to = target - 1; if (event.key === 'Home') to = 0; if (event.key === 'End') to = PHASES.length - 1; if (event.key === 'Enter' || event.key === ' ') to = target === PHASES.length - 1 ? 0 : target + 1; if (to === null) return; event.preventDefault(); steer(to); });
draw();
`;

const body = k.plateHtml({
  fig: "Fig 4", title: "Subagent handoff bench", hint: "Tap or use arrow keys to move the work", readout: initial.readout,
  keys: [
    { mark: "lit", label: "Document carriage: the explicit handoff artifact" },
    { mark: "raised", label: "Fresh review and human acceptance are separate gates" },
  ],
  caption: "An author produces an artifact, hands it over explicitly, and a fresh-context reviewer checks it. A human then decides acceptance. Separate context can expose assumptions, but it does not make either agent independent or automatically correct.",
  body: `<div class="iso-stage" tabindex="0" role="slider" aria-label="Subagent handoff bench. Arrow keys move work from author through review to human acceptance." aria-valuemin="0" aria-valuemax="3" aria-valuenow="0">${svg}</div>`,
});

mkdirSync(OUT, { recursive: true });
const suffix = theme === "light" ? "-light" : "";
writeFileSync(join(OUT, `subagents${suffix}.html`), k.pageHtml({ title: "Subagent handoff bench", theme, body: RESPONSIVE_FIGURE_STYLE + body, script: kitScript() + live }));
writeFileSync(join(OUT, `subagents${suffix}.svg`), poster);
console.log(`wrote subagents${suffix}.html and subagents${suffix}.svg · ${PARTS.length} manifested parts`);
if (theme === "dark" && !process.argv.includes("--dark-only")) {
  execFileSync(process.execPath, [fileURLToPath(import.meta.url), "--light"], { stdio: "inherit" });
}
