import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import * as k from "../vendor/kit/iso-kit.mjs";
import { RESPONSIVE_FIGURE_STYLE } from "../responsive.mjs";
import * as A from "../vendor/kit/audit.mjs";
import { STAGES, PARTS, partCount } from "./parts.mjs";
import { runModelAssertions } from "./model.mjs";

const HERE = dirname(fileURLToPath(import.meta.url));
const OUT = resolve(HERE, "../../../assets/anatomy");
const BOT_DATA = `data:image/webp;base64,${readFileSync(resolve(HERE, "../../../assets/aetherbot/aetherbot-head.webp")).toString("base64")}`;
const WIDTH = 720;
const HEIGHT = 470;
const BASE = { x: -142, y: -104, w: 284, d: 208, r: 14 };
const P = k.fitProjection(
  [...k.boxCorners(BASE, -12, 0), [-124, -78, 94], [120, -92, 94], [112, 82, 94]],
  WIDTH,
  HEIGHT,
  { pad: 38, azimuth: 45, elevation: 34 },
);
const at = (point) => k.iso(point, P);
const S = (paths, style) => k.solidSvg(paths, style);
const L = (d, style) => k.lineSvg(d, style);
const tag = (name, body, attrs = "") => `<g data-part="${name}"${attrs}>${body}</g>`;

function makeScene() {
  const R = A.recorder(P);
  const overlays = [];
  const owner = "loop-machine";
  const put = (name, at3, svg, shape, attrs = "", bias = 0) => {
    R.put({ name, piece: "machine", at: at3, bias, svg: tag(name, svg, attrs), shapes: [R.solid(shape)] });
  };
  const slab = (name, plan, z, h, tone, attrs = "", options = {}) => {
    put(
      name,
      [plan.x + plan.w / 2, plan.y + plan.d / 2, z + h / 2],
      S(k.slabOf(plan, z, h, P, options.steps ?? 6, options.bevel ?? 0.7), { tone, crease: options.crease }),
      A.slab(plan, z, h, { name: options.shapeName ?? name, owner, ground: options.ground }),
      attrs,
      options.bias,
    );
  };
  const cylinder = (name, x, y, r, z, h, tone, attrs = "", options = {}) => {
    put(
      name,
      [x, y, z + h / 2],
      S(k.cylinder(x, y, r, z, h, P, options.steps ?? 28, options.bevel ?? 0.4), { tone, crease: options.crease, lit: options.lit }),
      A.cylinder(x, y, r, z, h, { name, owner }),
      attrs,
      options.bias,
    );
  };

  const feet = [
    [BASE.x + 22, BASE.y + 22],
    [BASE.x + BASE.w - 22, BASE.y + 22],
    [BASE.x + 22, BASE.y + BASE.d - 22],
    [BASE.x + BASE.w - 22, BASE.y + BASE.d - 22],
  ];
  feet.forEach(([x, y], index) => cylinder(PARTS[index].id, x, y, 8, -12, 4, "lo"));
  slab("base-plate", BASE, -8, 8, "mid", "", { steps: 10, bevel: 1.8, ground: true, shapeName: "stand.base-plate" });
  cylinder("turntable-lower", 0, 0, 104, 0, 5, "lo", "", { steps: 96, bevel: 0.8 });
  cylinder("turntable-upper", 0, 0, 97, 5, 4, "mid", "", { steps: 96, bevel: 0.6 });
  cylinder("turntable-hub", 0, 0, 30, 9, 5, "hi", "", { steps: 48, bevel: 0.6 });
  overlays.push(tag("base-groove", L(k.planOutline(k.insetPlan(BASE, 8), 0, P, 10), { tone: "lo" })));
  const ticks = k.radialTicks(0, 0, 97, 60, 10, 9, [2, 4], P);
  overlays.push(tag("turntable-index", L(ticks.minor + ticks.major, { tone: "faint" })));

  STAGES.forEach((stage, stageIndex) => {
    const [x, y] = stage.position;
    const attrs = ` data-stage="${stage.id}" aria-label="${stage.label} station"`;
    const angle = stageIndex * Math.PI / 3;
    slab(`${stage.id}-deck`, { x: x - 18, y: y - 14, w: 36, d: 28, r: 4 }, 9, 5, "mid", attrs, { steps: 5 });
    slab(`${stage.id}-riser`, { x: x - 10, y: y - 8, w: 20, d: 16, r: 3 }, 14, 10, "hi", attrs, { steps: 4 });
    cylinder(`${stage.id}-tool`, x + Math.cos(angle) * 3, y + Math.sin(angle) * 3, 6, 24, 8 + (stageIndex % 3) * 2, "hi", attrs);
    cylinder(`${stage.id}-dial`, x - 13, y + 10, 3.5, 14, 2.2, "mid", attrs, { steps: 24, bevel: 0.2 });
    cylinder(`${stage.id}-lamp`, x + 13, y - 10, 2.5, 14, 6, "hi", attrs, { steps: 20, lit: true });
    cylinder(`${stage.id}-terminal`, x + 13, y + 10, 1.8, 14, 2.2, "mid", attrs, { steps: 18, bevel: 0.2 });
  });

  cylinder("operator-pedestal", 0, 0, 24, 14, 16, "mid", "", { steps: 48, bevel: 0.8 });
  slab("operator-console", { x: -18, y: -15, w: 36, d: 30, r: 6 }, 30, 12, "hi", "", { bevel: 0.8 });
  const centre = at([0, 0, 42]);
  overlays.push(tag("operator-screen", `<circle cx="${centre[0]}" cy="${centre[1] - 26}" r="31" fill="var(--anatomy-paper)" stroke="var(--anatomy-mid)" stroke-width="1.2"/>`));
  overlays.push(tag("aetherbot", `<defs><clipPath id="bot-clip"><circle cx="${centre[0]}" cy="${centre[1] - 26}" r="28"/></clipPath></defs><image href="${BOT_DATA}" x="${centre[0] - 27}" y="${centre[1] - 58}" width="54" height="64" preserveAspectRatio="xMidYMid slice" clip-path="url(#bot-clip)"/>`));

  const railA = { x: -120, y: 2, w: 28, d: 4, r: 1 };
  const railB = { x: -124, y: -72, w: 4, d: 78, r: 1 };
  const railC = { x: -120, y: -74, w: 100, d: 4, r: 1 };
  slab("return-rail-a", railA, 32, 3, "hi", "", { steps: 3, bevel: 0.3 });
  slab("return-rail-b", railB, 32, 3, "hi", "", { steps: 3, bevel: 0.3 });
  slab("return-rail-c", railC, 32, 3, "hi", "", { steps: 3, bevel: 0.3 });
  cylinder("return-post-a", -122, 4, 2.4, 0, 32, "mid", "", { steps: 20, crease: "none" });
  cylinder("return-post-b", -22, -72, 2.4, 9, 23, "mid", "", { steps: 20, crease: "none" });
  cylinder("return-sensor", -104, 4, 3.4, 35, 4, "mid", "", { steps: 22 });
  cylinder("return-receiver", -24, -72, 3.4, 35, 4, "mid", "", { steps: 22 });
  const flow = [
    k.lineOnTop([-104, 4], [-122, 4], 35.1, P),
    k.lineOnTop([-122, 4], [-122, -72], 35.1, P),
    k.lineOnTop([-122, -72], [-24, -72], 35.1, P),
  ].join("");
  overlays.push(`<g class="feedback-flow">${L(flow, { tone: "lit", flow: true })}</g>`);

  const approval = ' data-approval=""';
  cylinder("approval-post-left", 72, -92, 3.5, 0, 72, "mid", approval, { steps: 24, crease: "none" });
  cylinder("approval-post-right", 116, -92, 3.5, 0, 72, "mid", approval, { steps: 24, crease: "none" });
  slab("approval-beam", { x: 72, y: -95, w: 44, d: 6, r: 2 }, 72, 6, "mid", approval, { steps: 4, bevel: 0.5 });
  slab("approval-housing", { x: 86, y: -98, w: 16, d: 12, r: 3 }, 78, 8, "hi", approval, { steps: 4, bevel: 0.6 });
  const leverPoints = [[102, -92, 86], [108, -92, 86]];
  put("approval-lever", [105, -92, 86], L(k.lineOnTop([102, -92], [108, -92], 86, P), { tone: "hi" }), A.tube(leverPoints, 0.7, { name: "approval-lever", owner }), approval);
  cylinder("approval-grip", 108, -92, 3, 83, 6, "hi", approval, { steps: 20 });
  cylinder("approval-lamp", 90, -92, 2.8, 86, 5, "hi", approval, { steps: 20, lit: true });
  cylinder("approval-key", 98, -92, 2, 86, 1.2, "lo", approval, { steps: 18, bevel: 0.1 });

  A.settle(R, P);
  R.items.sort((a, b) => a.key - b.key);
  return { R, markup: R.items.map((item) => item.svg).join("") + overlays.join("") };
}

const customCss = `
.loop-stage{outline:none;touch-action:pan-y}.loop-stage [data-stage]{opacity:.46;transition:opacity .28s var(--anatomy-ease),transform .28s var(--anatomy-ease);transform-box:fill-box;transform-origin:center}.loop-stage [data-stage][data-selected]{opacity:1;transform:translateY(-6px)}.loop-stage [data-approval][data-part="approval-lamp"]{opacity:.35}.loop-stage [data-approval][data-approved][data-part="approval-lamp"]{opacity:1}.loop-controls{display:grid;grid-template-columns:repeat(6,minmax(0,1fr));gap:6px;margin:14px 0 0}.loop-controls button,.approval-control{border:1px solid var(--anatomy-lo);background:var(--anatomy-card);color:var(--anatomy-text);font:11px/1.2 var(--anatomy-mono);padding:9px 7px;cursor:pointer}.loop-controls button[aria-pressed="true"]{border-color:var(--anatomy-hi);color:var(--anatomy-strong)}.approval-control{display:block;width:100%;margin-top:6px}.approval-control[aria-pressed="true"]{border-color:var(--anatomy-green);color:var(--anatomy-strong)}@media(max-width:560px){.loop-controls{grid-template-columns:repeat(3,1fr)}}@media(prefers-reduced-motion:reduce){.loop-stage [data-stage]{transition:none}}
`;

function figure(theme, standalone, audit = false) {
  const scene = makeScene();
  if (audit) A.auditOrExit(scene.R, P);
  return k.figureSvg({
    width: WIDTH,
    height: HEIGHT,
    standalone: standalone ? theme : false,
    className: "loop-figure",
    label: "A six-station rotary AI-native workbench with Plan, Design, Build, Test, Deploy and Maintain stations. Maintain returns feedback to Plan. An AetherLink bot operates from the centre while a separate human approval lever sits above the machine.",
    body: `<style>${customCss}</style><path class="iso-halo" d="${k.haloOf(BASE, -12, 10, P)}"/>${scene.markup}`,
  });
}

function controls() {
  return `<div class="loop-controls" role="group" aria-label="Select a stage">${STAGES.map((stage, index) => `<button type="button" data-stage-button="${stage.id}" aria-pressed="${index === 0}" tabindex="${index === 0 ? 0 : -1}">${index + 1}. ${stage.label}</button>`).join("")}</div><button type="button" class="approval-control" data-approval-button aria-pressed="false">Human approval: pending</button>`;
}

function html(theme) {
  const body = k.plateHtml({
    fig: "Fig 1",
    title: "AI-native loop",
    hint: "Select any station · arrows or 1–6",
    readout: "Plan · Frame the outcome · approval pending",
    keys: [
      { mark: "lit", label: "Selected station" },
      { mark: "dashed", label: "Maintain feeds learning back to Plan" },
      { mark: "raised", label: "Human approval stays above the loop" },
    ],
    caption: "AetherLink works across six connected stations. Pick any station directly. The moving focus explains the loop without enforcing a rigid sequence, while the separate lever keeps human direction visible.",
    body: `<div class="loop-stage" tabindex="0" role="application">${figure(theme, false)}</div>${controls()}`,
  });
  const stateModel = readFileSync(join(HERE, "state.mjs"), "utf8").replace(/^export /gm, "");
  const live = readFileSync(join(HERE, "live.js"), "utf8").replace("__STAGES__", JSON.stringify(STAGES.map(({ id, label, note }) => ({ id, label, note }))));
  return k.pageHtml({ title: "AetherLink AI-native loop", theme, body: RESPONSIVE_FIGURE_STYLE + body, script: `${stateModel}\n${live}`, width: 760 }).replace("</style>", `${customCss}</style>`);
}

runModelAssertions();
mkdirSync(OUT, { recursive: true });
for (const theme of ["dark", "light"]) {
  const suffix = theme === "light" ? "-light" : "";
  writeFileSync(join(OUT, `loop${suffix}.html`), html(theme));
  writeFileSync(join(OUT, `loop${suffix}.svg`), figure(theme, true));
}

if (process.argv.includes("--audit")) {
  const ids = new Set(PARTS.map((part) => part.id));
  if (ids.size !== PARTS.length) throw new Error("Part ids must be unique");
  const svg = figure("light", true, true);
  for (const part of PARTS) {
    if (!svg.includes(`data-part="${part.id}"`)) throw new Error(`Part is missing from the figure: ${part.id}`);
  }
  console.log(`loop manifest passed · ${partCount} purposeful parts · ${STAGES.length} selectable stages`);
}

console.log(`wrote loop.html, loop-light.html, loop.svg and loop-light.svg · ${partCount} parts`);
