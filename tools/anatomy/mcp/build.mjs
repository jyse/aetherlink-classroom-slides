import { execFileSync } from "node:child_process";
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import * as k from "../vendor/kit/iso-kit.mjs";
import { RESPONSIVE_FIGURE_STYLE } from "../responsive.mjs";
import { kitScript } from "../vendor/scripts/inline-kit.mjs";
import { LAB_PROPERTIES, PARTS, TOOLS, assertModel, stateAt } from "./model.mjs";

assertModel();
const HERE = dirname(fileURLToPath(import.meta.url));
const OUT = join(HERE, "../../../assets/anatomy");
const theme = process.argv.includes("--light") ? "light" : "dark";
const WIDTH = 680, HEIGHT = 390;
const BASE = { x: -130, y: -70, w: 270, d: 140, r: 9 };
const KEY_X = TOOLS.map((_, i) => -34 + i * 24);
const P = k.fitProjection([...k.boxCorners(BASE, -13, 92), [142, 72, 92]], WIDTH, HEIGHT, { pad: 30, azimuth: 44, elevation: 32 });
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
  out.push(slab(BASE, -9, 9, "mid"));
  out.push(L(k.planOutline(k.insetPlan(BASE, 5), 0, P), { tone: "lo" }));
  const screws = k.corners(BASE, 10);
  out.push(L(screws.map(([x, y]) => k.ring(x, y, 2, 0, P, 14)).join(""), { tone: "lo" }));
  out.push(D(screws.map(([x, y]) => at([x, y, 0])), { size: 0.48 }));
  const ruler = { x: -112, y: 55, w: 228, d: 7, r: 1 };
  out.push(slab(ruler, 0, 0.7, "lo"));
  const ticks = k.topTicks(ruler.x + 4, ruler.x + ruler.w - 4, 6, 4, ruler.y + 0.6, 0.8, [2, 3.5], P);
  out.push(L(ticks.minor, { tone: "lo" }), L(ticks.major, { tone: "mid" }));
  return out.join("");
}

function archive() {
  const out = [];
  out.push(slab({ x: -112, y: -43, w: 48, d: 74, r: 4 }, 0, 72, "mid"));
  out.push(slab({ x: -114, y: -45, w: 52, d: 78, r: 4 }, 72, 4, "hi"));
  for (let i = 0; i < 5; i++) {
    const z = 7 + i * 13;
    const front = { x: -108, y: 27, w: 39, d: 4, r: 1.2 };
    out.push(slab(front, z, 9, i === 0 ? "hi" : "mid", i === 0));
    const cx = -88.5;
    out.push(slab({ x: cx - 7, y: 31, w: 2, d: 3, r: 0.6 }, z + 3, 2, "mid"));
    out.push(slab({ x: cx + 5, y: 31, w: 2, d: 3, r: 0.6 }, z + 3, 2, "mid"));
    out.push(slab({ x: cx - 7, y: 33, w: 14, d: 2, r: 0.8 }, z + 4, 2, "hi"));
    out.push(D([at([-104, 29, z + 9]), at([-73, 29, z + 9])], { size: 0.42 }));
  }
  return out.join("");
}

function consoleRig() {
  const out = [];
  out.push(slab({ x: -48, y: -39, w: 118, d: 8, r: 2 }, 0, 4, "mid"));
  out.push(slab({ x: -48, y: 22, w: 118, d: 8, r: 2 }, 0, 4, "mid"));
  out.push(slab({ x: -54, y: -43, w: 6, d: 76, r: 1.5 }, 0, 9, "mid"));
  out.push(slab({ x: 70, y: -43, w: 6, d: 76, r: 1.5 }, 0, 9, "mid"));
  out.push(slab({ x: -48, y: -23, w: 118, d: 41, r: 4 }, 7, 10, "mid"));
  out.push(L(k.planOutline({ x: -43, y: -18, w: 108, d: 31, r: 2 }, 17, P, 4), { tone: "faint" }));
  KEY_X.forEach((x, i) => {
    out.push(slab({ x: x - 7, y: -8, w: 14, d: 14, r: 2 }, 17, 3.2, i === 0 ? "hi" : "mid", i === 0));
    out.push(slab({ x: x - 2, y: -3, w: 4, d: 4, r: 1 }, 20.2, 4.5, "hi", i === 0));
  });
  out.push(slab({ x: -20, y: -41, w: 62, d: 22, r: 4 }, 17, 44, "mid"));
  out.push(slab({ x: -14, y: -43, w: 50, d: 4, r: 1 }, 27, 26, "hi"));
  out.push(L(k.planOutline({ x: -10, y: -44, w: 42, d: 2.2, r: 0.6 }, 49, P, 3), { tone: "lo" }));
  for (let row = 0; row < 3; row++) out.push(L(k.lineOnTop([-8, -41 + row * 0.35], [29 - row * 5, -41 + row * 0.35], 51 - row * 5, P), { tone: "faint", free: true }));
  LAB_PROPERTIES.forEach((_, i) => {
    const x = 52 + i * 15;
    out.push(slab({ x: x - 4, y: 6, w: 8, d: 8, r: 1.5 }, 17, 2, "mid"));
    out.push(slab({ x: x - 2, y: 8, w: 4, d: 4, r: 1 }, 19, 1.2, i === 1 ? "hi" : "lo", i === 1));
  });
  out.push(slab({ x: 50, y: -34, w: 14, d: 14, r: 2 }, 17, 4, "mid"));
  out.push(L(k.planOutline({ x: 52, y: -32, w: 10, d: 10, r: 1.5 }, 21, P, 4), { tone: "lo" }));
  out.push(L(k.lineOnTop([57, -27], [63, -27], 21, P), { tone: "hi", free: "end" }));
  return out.join("");
}

const selector = () => {
  const x = KEY_X[0];
  return `<g data-part="selector">${slab({ x: x - 9, y: -12, w: 18, d: 22, r: 3 }, 24.5, 3.4, "hi", true)}${slab({ x: x - 3, y: -4, w: 6, d: 6, r: 1 }, 28, 3, "hi", true)}</g>`;
};

const cables = () => [
  slab({ x: -65, y: -15, w: 18, d: 4, r: 1 }, 14, 3, "lo"),
  slab({ x: 42, y: -39, w: 28, d: 4, r: 1 }, 14, 3, "lo"),
].join("");

const label = "A physical MCP archive console. Five tool keys select bounded evidence drawers. The local SRE lab adds its own read-only, local and no-network guard lamps; those limits are properties of this server, not guarantees of MCP itself.";
const art = () => [base(), archive(), consoleRig(), cables(), selector()].join("");
const initial = stateAt(0);
const svg = k.figureSvg({ width: WIDTH, height: HEIGHT, label, body: art() });
const poster = k.figureSvg({ width: WIDTH, height: HEIGHT, label, body: art(), standalone: theme });

const live = `
const P = ${JSON.stringify(P)};
const KEY_X = ${JSON.stringify(KEY_X)};
const TOOLS = ${JSON.stringify(TOOLS)};
const LAB_PROPERTIES = ${JSON.stringify(LAB_PROPERTIES)};
const stateAt = ${stateAt.toString()};
const stage = document.querySelector('.iso-stage');
const svg = stage.querySelector('svg');
const selector = svg.querySelector('[data-part="selector"]');
const readout = document.querySelector('[data-readout]');
const still = matchMedia('(prefers-reduced-motion: reduce)');
let current = 0, target = 0, visible = false, frame = 0, last = 0, clock = 0, touring = !still.matches, idle = 0;
const clamp = (v) => Math.max(0, Math.min(TOOLS.length - 1, Math.round(v)));
function draw() {
  selector.setAttribute('transform', translateAlong(P, [current * 24, 0, 0]));
  const state = stateAt(current);
  readout.textContent = state.readout;
  stage.setAttribute('aria-valuenow', String(state.index));
  stage.setAttribute('aria-valuetext', state.tool.id + ', ' + state.tool.source + '. Lab guard: ' + state.labProperties.join(', ') + '.');
}
function tick(now) {
  const dt = last ? Math.min((now - last) / 1000, 1 / 30) : 1 / 60; last = now;
  if (touring) { clock += dt; target = Math.floor(clock / 1.8) % TOOLS.length; }
  const next = still.matches ? target : current + (target - current) * (1 - Math.exp(-dt / 0.22));
  current = Math.abs(next - target) < 0.01 ? target : next; draw();
  frame = visible && (touring || current !== target) ? requestAnimationFrame(tick) : 0;
}
const run = () => { if (!frame && visible) { last = 0; frame = requestAnimationFrame(tick); } };
const steer = (to) => { touring = false; target = clamp(to); clearTimeout(idle); idle = setTimeout(() => { touring = !still.matches; clock = target * 1.8; run(); }, 3600); run(); };
new IntersectionObserver((entries) => { visible = entries[entries.length - 1].isIntersecting; if (visible) run(); }, { rootMargin: '120px 0px' }).observe(stage);
still.addEventListener('change', () => { touring = !still.matches; if (touring) clock = target * 1.8; else target = clamp(current); run(); });
stage.addEventListener('pointerdown', (event) => { const box = svg.getBoundingClientRect(); steer(((event.clientX - box.left) / box.width) * TOOLS.length); });
stage.addEventListener('keydown', (event) => { let to = null; if (event.key === 'ArrowRight' || event.key === 'ArrowDown') to = target + 1; if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') to = target - 1; if (event.key === 'Home') to = 0; if (event.key === 'End') to = TOOLS.length - 1; if (to === null) return; event.preventDefault(); steer(to); });
draw();
`;

const body = k.plateHtml({
  fig: "Fig 3", title: "MCP evidence console", hint: "Tap or use arrow keys to select a tool", readout: initial.readout,
  keys: [
    { mark: "lit", label: "Selected tool: one bounded request into the archive" },
    { mark: "raised", label: "Local · read-only · no network: this lab's server policy" },
  ],
  caption: "MCP gives the agent named tools and structured inputs. This lab exposes exactly five read-only evidence tools over local stdio; its local, read-only and no-network limits come from this implementation and deployment, not from MCP alone.",
  body: `<div class="iso-stage" tabindex="0" role="slider" aria-label="MCP console. Arrow keys select one of five SRE evidence tools." aria-valuemin="0" aria-valuemax="4" aria-valuenow="0">${svg}</div>`,
});

mkdirSync(OUT, { recursive: true });
const suffix = theme === "light" ? "-light" : "";
writeFileSync(join(OUT, `mcp${suffix}.html`), k.pageHtml({ title: "MCP evidence console", theme, body: RESPONSIVE_FIGURE_STYLE + body, script: kitScript() + live }));
writeFileSync(join(OUT, `mcp${suffix}.svg`), poster);
console.log(`wrote mcp${suffix}.html and mcp${suffix}.svg · ${PARTS.length} manifested parts`);
if (theme === "dark" && !process.argv.includes("--dark-only")) {
  execFileSync(process.execPath, [fileURLToPath(import.meta.url), "--light"], { stdio: "inherit" });
}
