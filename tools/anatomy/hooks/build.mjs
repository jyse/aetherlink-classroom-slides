import { mkdirSync, writeFileSync, readFileSync, existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import * as k from "../vendor/kit/iso-kit.mjs";
import { RESPONSIVE_FIGURE_STYLE } from "../responsive.mjs";
import * as A from "../vendor/kit/audit.mjs";
import { kitScript } from "../vendor/scripts/inline-kit.mjs";
import { HOOK_PARTS } from "./parts.mjs";
import { HOOK_PRESETS, assertHookModel, evaluateHook } from "./model.mjs";

const HERE = dirname(fileURLToPath(import.meta.url));
const OUT = join(HERE, "../../../assets/anatomy");
const W = 640, H = 390;
const BASE = { x: -145, y: -68, w: 290, d: 136, r: 8 };
const P = k.fitProjection([...k.boxCorners(BASE, -8, 70)], W, H, { pad: 30, azimuth: 43 });
const at = (p) => k.iso(p, P);
const solid = (plan, z, h, tone = "mid", lit = false) => k.solidSvg(k.slabOf(plan, z, h, P, 4, .7), { tone, lit });
const cyl = (x, y, r, z, h, tone = "mid", lit = false) => k.solidSvg(k.cylinder(x, y, r, z, h, P, 24, .3), { tone, lit });

const relayDefs = [
  ["parse", "PARSE", -104, -34], ["shell", "SHELL", -66, -34], ["network", "NET", -28, -34],
  ["secret", "SECRET", 10, -34], ["approval", "APPROVAL", 48, -34], ["human", "HUMAN", 86, -34],
  ["gate", "BRANCH", -66, 12], ["read-filter", "READ", -28, 12], ["write-filter", "WRITE", 10, 12],
  ["path-router", "PATH", 48, 12], ["docs", "DOCS", 86, 12],
];

function relay([id, label, x, y], active = false) {
  const plan = { x, y, w: 28, d: 25, r: 3 };
  const screws = k.corners(plan, 4).map((p) => at([p[0], p[1], 13]));
  return `<g data-part="relay-${id}" data-station="${id}"${active ? " data-active=\"\"" : ""}>${solid(plan, 3, 10, "mid")}${cyl(x + 14, y + 12, 5.4, 13, 4, "hi")}${k.dotsSvg(screws, { size: .45 })}${k.faceTextSvg(k.topMatrix([x + 14, y + 20], 13.2, P, "x"), label, { size: 2.2, tone: "lo", anchor: "middle" })}</g>`;
}

function terminal(name, x, y) {
  return `<g data-part="${name}">${cyl(x, y, 3.2, 3, 4, "mid")}${k.lineSvg(k.ring(x, y, 1.3, 7, P, 16), { tone: "lo" })}</g>`;
}

function gate(name, label, x, tone, active = false) {
  const plan = { x, y: 48, w: 34, d: 15, r: 2 };
  return `<g data-part="${name}" data-exit="${label.toLowerCase()}"${active ? " data-active=\"\"" : ""}>${solid(plan, 3, 16, "mid")}${k.faceTextSvg(k.topMatrix([x + 17, 55], 19.2, P, "x"), label, { size: 3, tone, anchor: "middle" })}${cyl(x + 17, 55, 3.2, 19, 4, tone === "hi" ? "hi" : "mid", tone === "hi")}</g>`;
}

function machine(presetIndex = 6) {
  const result = evaluateHook(HOOK_PRESETS[presetIndex].input);
  const body = [];
  body.push(`<style>[data-active]>.iso-edge,[data-active] .iso-edge,[data-active] .iso-line{stroke:var(--anatomy-lit)!important;stroke-width:1.2}</style>`);
  body.push(`<path class="iso-halo" d="${k.haloOf(BASE, -8, 8, P)}"/>`);
  body.push(`<g data-part="cabinet-shell">${solid(BASE, -8, 8, "mid")}</g>`);
  body.push(`<g data-part="backplate">${solid(k.insetPlan(BASE, 8), 0, 3, "lo")}</g>`);
  body.push(`<g data-part="top-rail">${solid({ x: -130, y: -51, w: 260, d: 6, r: 1 }, 3, 3, "mid")}</g>`);
  body.push(`<g data-part="bottom-rail">${solid({ x: -130, y: 42, w: 260, d: 6, r: 1 }, 3, 3, "mid")}</g>`);
  body.push(`<g data-part="input-chute">${solid({ x: -139, y: -15, w: 20, d: 35, r: 3 }, 3, 17, "mid")}</g>`);
  body.push(`<g data-part="input-token" data-token="">${cyl(-129, 2, 7, 20, 3, "hi", true)}</g>`);
  relayDefs.forEach((def) => body.push(relay(def, result.visited.includes(def[0]))));
  [-118, -98, -78, -58, -38, -18, 2, 22, 42, 62, 82, 102].forEach((x, i) => body.push(terminal(`terminal-${String(i + 1).padStart(2, "0")}`, x, -39.5)));
  body.push(gate("allow-gate", "ALLOW", 12, "green", result.decision === "allow"), gate("ask-gate", "ASK", 56, "blue", result.decision === "ask"), gate("deny-gate", "DENY", 100, "red", result.decision === "deny"));
  body.push(`<g data-part="allow-bin">${solid({ x: 8, y: 65, w: 40, d: 18, r: 2 }, 0, 6, "lo")}</g>`);
  body.push(`<g data-part="ask-bin">${solid({ x: 52, y: 65, w: 40, d: 18, r: 2 }, 0, 6, "lo")}</g>`);
  body.push(`<g data-part="deny-bin">${solid({ x: 96, y: 65, w: 40, d: 18, r: 2 }, 0, 6, "lo")}</g>`);
  const fasteners = [-138,138].flatMap((x) => [-55,-40,40,55].map((y) => [x,y]));
  fasteners.forEach(([x, y], i) => body.push(`<g data-part="fastener-${String(i + 1).padStart(2, "0")}">${cyl(x, y, 2.2, 3, 2, "lo")}</g>`));
  body.push(`<g data-part="approval-key">${cyl(-132, 28, 5, 3, 3, "hi")}${k.lineSvg(k.pathOf([k.iso([-127.7, 25.5, 6], P), k.iso([-121, 20, 3], P)]), { tone: "hi" })}</g>`);
  body.push(`<g data-part="decision-lamp">${cyl(127, -36, 5, 3, 7, "hi", true)}</g>`);
  body.push(`<g data-part="audit-recorder">${solid({ x: 116, y: 12, w: 16, d: 25, r: 2 }, 3, 16, "mid")}</g>`);
  return body.join("");
}

const poster = (theme) => k.figureSvg({ width: W, height: H, standalone: theme, label: "Guard interlock cabinet with detector relays and allow, ask and deny exit gates.", body: machine() });

function html(theme) {
  const initial = 6;
  const results = HOOK_PRESETS.map((preset) => ({ ...preset, result: evaluateHook(preset.input) }));
  const svg = k.figureSvg({ width: W, height: H, label: "Interactive guard interlock cabinet. Select an input to trace the actual hook decision order.", body: machine() });
  const plate = k.plateHtml({ fig: "Fig 1", title: "Guard interlock", hint: "Drag or use arrow keys", readout: `${results[initial].label} · ${results[initial].result.decision.toUpperCase()}`, keys: [
    { mark: "lit", label: "Token and relay path" }, { mark: "green", label: "allow" }, { mark: "blue", label: "ask" }, { mark: "red", label: "deny" },
  ], caption: "A hook input moves through detector relays in source order. Named approval changes a gated command from deny to ask; it never turns the command into allow.", body: `<div class="iso-stage" tabindex="0" role="slider" aria-label="Guard input preset" aria-valuemin="0" aria-valuemax="${results.length - 1}" aria-valuenow="${initial}">${svg}</div>` });
  const live = `
const presets=${JSON.stringify(results)};const stage=document.querySelector('.iso-stage'),svg=stage.querySelector('svg'),readout=document.querySelector('[data-readout]');
const reduce=matchMedia('(prefers-reduced-motion: reduce)'),tourOrder=[...presets.keys(),...[...presets.keys()].slice(1,-1).reverse()],IDLE_START=1400,IDLE_RESUME=3600,TOUR_STEP=2200;let index=${initial},target=index,current=index,frame=0,last=0,visible=false,touring=false,tourStartedAt=0,idleTimer=0,hovered=false,focused=false,pressed=false;
function draw(value){const p=presets[Math.round(value)],r=p.result;svg.querySelectorAll('[data-station]').forEach(n=>n.toggleAttribute('data-active',r.visited.includes(n.dataset.station)));svg.querySelectorAll('[data-exit]').forEach(n=>n.toggleAttribute('data-active',n.dataset.exit===r.decision));const token=svg.querySelector('[data-token]');token.setAttribute('transform',translateAlong(${JSON.stringify(P)},[(value-${initial})*5,0,0]));readout.textContent=p.label+' · '+r.decision.toUpperCase();stage.setAttribute('aria-valuenow',String(Math.round(value)));stage.setAttribute('aria-valuetext',readout.textContent)}
function engaged(){return hovered||focused||pressed}function clearIdle(){if(idleTimer){clearTimeout(idleTimer);idleTimer=0}}function stopTour(){touring=false;clearIdle()}
function tick(){const now=performance.now(),dt=last?Math.min((now-last)/1000,1/30):1/60;last=now;if(touring)target=tourOrder[Math.floor((now-tourStartedAt)/TOUR_STEP)%tourOrder.length];current=current+(target-current)*(1-Math.exp(-dt/.18));if(Math.abs(target-current)<.005)current=target;draw(current);frame=visible&&(touring||current!==target)?requestAnimationFrame(tick):0}function run(){if(!frame&&visible&&!reduce.matches){last=0;frame=requestAnimationFrame(tick)}}function set(n){target=Math.max(0,Math.min(presets.length-1,n));if(reduce.matches){current=target;draw(current)}else run()}
function scheduleTour(delay=IDLE_RESUME){stopTour();if(!visible||reduce.matches||engaged())return;idleTimer=setTimeout(()=>{idleTimer=0;if(!visible||reduce.matches||engaged())return;touring=true;tourStartedAt=performance.now()-tourOrder.indexOf(Math.round(current))*TOUR_STEP;run()},delay)}function hold(){stopTour();target=current}function release(){if(!engaged())scheduleTour()}
new IntersectionObserver(es=>{visible=es[es.length-1].isIntersecting;if(!visible){stopTour();if(frame)cancelAnimationFrame(frame);frame=0;last=0;return}run();scheduleTour(IDLE_START)},{rootMargin:'100px 0px'}).observe(stage);
stage.addEventListener('pointerenter',e=>{if(e.pointerType==='mouse'){hovered=true;hold()}});stage.addEventListener('pointerleave',e=>{if(e.pointerType==='mouse')hovered=false;release()});stage.addEventListener('pointerdown',e=>{pressed=true;hold();stage.setPointerCapture?.(e.pointerId)});stage.addEventListener('pointerup',()=>{pressed=false;release()});stage.addEventListener('pointercancel',()=>{pressed=false;release()});stage.addEventListener('pointermove',e=>{if(e.pointerType!=='mouse'&&!pressed)return;hold();const b=svg.getBoundingClientRect();set(Math.round((e.clientX-b.left)/b.width*(presets.length-1)))});stage.addEventListener('focus',()=>{focused=true;hold()});stage.addEventListener('blur',()=>{focused=false;release()});stage.addEventListener('keydown',e=>{let n=null;if(e.key==='ArrowRight'||e.key==='ArrowUp')n=Math.round(current)+1;if(e.key==='ArrowLeft'||e.key==='ArrowDown')n=Math.round(current)-1;if(e.key==='Home')n=0;if(e.key==='End')n=presets.length-1;if(n===null)return;e.preventDefault();hold();set(n)});reduce.addEventListener('change',()=>{stopTour();if(reduce.matches){if(frame)cancelAnimationFrame(frame);frame=0;current=target;draw(current)}else{run();scheduleTour(IDLE_START)}});draw(index);`;
  const extra = `<style>.iso-stage{outline:none;touch-action:pan-y}.iso-stage:focus-visible{box-shadow:0 0 0 2px var(--anatomy-blue)}[data-active]>.iso-edge,[data-active] .iso-edge,[data-active] .iso-line{stroke:var(--anatomy-lit)!important;stroke-width:1.2}.iso-solid[data-lit]{filter:drop-shadow(0 0 5px var(--anatomy-lit))}@media(prefers-reduced-motion:reduce){[data-flow]{animation:none!important}}</style>`;
  return k.pageHtml({ title: "Guard interlock", theme, body: RESPONSIVE_FIGURE_STYLE + extra + plate, script: kitScript() + live, width: 700 });
}

function audit() {
  assertHookModel();
  if (HOOK_PARTS.length < 40) throw new Error("hooks parts manifest has fewer than 40 parts");
  if (new Set(HOOK_PARTS.map((p) => p.name)).size !== HOOK_PARTS.length) throw new Error("duplicate hooks part name");
  const required = ["hooks.html", "hooks-light.html", "hooks.svg", "hooks-light.svg"];
  for (const file of required) if (!existsSync(join(OUT, file))) throw new Error(`missing ${file}`);
  for (const file of required.filter((x) => x.endsWith(".html"))) {
    const text = readFileSync(join(OUT, file), "utf8");
    if (/<(script|link)[^>]+(?:src|href)=/i.test(text)) throw new Error(`${file} has an external dependency`);
    for (const needle of ["pointermove", "keydown", "prefers-reduced-motion", "IntersectionObserver"]) if (!text.includes(needle)) throw new Error(`${file} lacks ${needle}`);
  }
  const R = A.recorder(P);
  const add = (name, plan, z, h, ground = false) => {
    const shape = R.solid(A.slab(plan, z, h, { name, ground }, 4));
    R.put({ name, at: [plan.x + plan.w / 2, plan.y + plan.d / 2, z + h / 2], svg: solid(plan, z, h), shapes: [shape] });
  };
  const addCyl = (name, x, y, r, z, h) => {
    const shape = R.solid(A.cylinder(x, y, r, z, h, { name }));
    R.put({ name, at: [x, y, z + h / 2], svg: cyl(x, y, r, z, h), shapes: [shape] });
  };
  add("cabinet-shell", BASE, -8, 8, true);
  add("backplate", k.insetPlan(BASE, 8), 0, 3);
  add("top-rail", { x: -130, y: -51, w: 260, d: 6, r: 1 }, 3, 3);
  add("bottom-rail", { x: -130, y: 42, w: 260, d: 6, r: 1 }, 3, 3);
  add("input-chute", { x: -139, y: -15, w: 20, d: 35, r: 3 }, 3, 17);
  addCyl("input-token", -129, 2, 7, 20, 3);
  relayDefs.forEach(([id,, x, y]) => { add(`relay-${id}`, { x, y, w: 28, d: 25, r: 3 }, 3, 10); addCyl(`relay-${id}.lamp`, x + 14, y + 12, 5.4, 13, 4); });
  [-118, -98, -78, -58, -38, -18, 2, 22, 42, 62, 82, 102].forEach((x, i) => addCyl(`terminal-${String(i + 1).padStart(2, "0")}`, x, -39.5, 3.2, 3, 4));
  [["allow",12],["ask",56],["deny",100]].forEach(([name,x]) => { add(`${name}-gate`, { x, y: 48, w: 34, d: 15, r: 2 }, 3, 16); addCyl(`${name}-gate.lamp`, x + 17, 55, 3.2, 19, 4); });
  [["allow",8],["ask",52],["deny",96]].forEach(([name,x]) => add(`${name}-bin`, { x, y: 65, w: 40, d: 18, r: 2 }, 0, 6));
  [-138,138].flatMap((x) => [-55,-40,40,55].map((y) => [x,y])).forEach(([x,y],i) => addCyl(`fastener-${String(i+1).padStart(2,"0")}`,x,y,2.2,3,2));
  addCyl("approval-key", -132, 28, 5, 3, 3);
  addCyl("decision-lamp", 127, -36, 5, 3, 7);
  add("audit-recorder", { x: 116, y: 12, w: 16, d: 25, r: 2 }, 3, 16);
  A.settle(R, P);
  A.auditOrExit(R, P, { argv: ["--audit"] });
  console.log(`hooks audit: ${HOOK_PARTS.length} unique parts, ${required.length} outputs ok`);
}

mkdirSync(OUT, { recursive: true });
for (const theme of ["dark", "light"]) {
  writeFileSync(join(OUT, theme === "dark" ? "hooks.html" : "hooks-light.html"), html(theme));
  writeFileSync(join(OUT, theme === "dark" ? "hooks.svg" : "hooks-light.svg"), poster(theme));
}
console.log("hooks build: wrote dark/light HTML and SVG");
if (process.argv.includes("--audit")) audit();
