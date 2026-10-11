import { mkdirSync, writeFileSync, readFileSync, existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import * as k from "../vendor/kit/iso-kit.mjs";
import { RESPONSIVE_FIGURE_STYLE } from "../responsive.mjs";
import * as A from "../vendor/kit/audit.mjs";
import { kitScript } from "../vendor/scripts/inline-kit.mjs";
import { EVAL_PARTS } from "./parts.mjs";
import { EVAL_PRESETS, EVAL_STATIONS, assertEvalModel, scoreDiagnosis } from "./model.mjs";

const HERE = dirname(fileURLToPath(import.meta.url));
const OUT = join(HERE, "../../../assets/anatomy");
const W = 640, H = 390;
const BASE = { x: -150, y: -65, w: 300, d: 130, r: 7 };
const P = k.fitProjection([...k.boxCorners(BASE, -9, 55)], W, H, { pad: 28, azimuth: 42 });
const at = (p) => k.iso(p, P);
const solid = (plan, z, h, tone = "mid", lit = false) => k.solidSvg(k.slabOf(plan, z, h, P, 4, .6), { tone, lit });
const cyl = (x, y, r, z, h, tone = "mid", lit = false) => k.solidSvg(k.cylinder(x, y, r, z, h, P, 24, .3), { tone, lit });
const short = { schema: "SCHEMA", case: "CASE", incident: "ID", category: "CAUSE", service: "SERVICE", deploy: "DEPLOY", keywords: "WORDS", "evidence-ids": "EVIDENCE", quotes: "QUOTES", citations: "CITES", "rule-outs": "RULEOUT", runbook: "RUNBOOK", forbidden: "FORBID", verdict: "VERDICT" };

const stationPositions = EVAL_STATIONS.map((id, i) => ({ id, x: -124 + (i % 7) * 39, y: i < 7 ? -35 : 10 }));
function station({ id, x, y }, status) {
  const plan = { x, y, w: 29, d: 25, r: 2.5 };
  const flag = status === true ? " data-pass=\"\"" : status === false ? " data-fail=\"\"" : "";
  return `<g data-part="station-${id}" data-station="${id}"${flag}>${solid(plan, 4, 13, "mid")}${cyl(x + 14.5, y + 12.5, 5.2, 17, 3, "hi")}${k.faceTextSvg(k.topMatrix([x + 14.5, y + 20], 17.2, P, "x"), short[id], { size: 2, tone: "lo", anchor: "middle" })}</g>`;
}

function machine(presetId = "pass") {
  const result = scoreDiagnosis(EVAL_PRESETS.find((p) => p.id === presetId) || EVAL_PRESETS[0]);
  const status = new Map(result.checks.map((check) => [check.station, check.pass]));
  const body = [];
  body.push(`<style>[data-pass] .iso-edge,[data-bin="pass"][data-active] .iso-edge{stroke:var(--anatomy-green)!important;stroke-width:1.2}[data-fail] .iso-edge,[data-bin="rejected"][data-active] .iso-edge{stroke:var(--anatomy-red)!important;stroke-width:1.2}</style>`);
  body.push(`<path class="iso-halo" d="${k.haloOf(BASE, -9, 9, P)}"/>`);
  body.push(`<g data-part="bench-frame">${solid(BASE, -9, 9, "mid")}</g>`);
  body.push(`<g data-part="bed-plate">${solid(k.insetPlan(BASE, 7), 0, 4, "lo")}</g>`);
  body.push(`<g data-part="feed-tray">${solid({ x: -148, y: -8, w: 18, d: 42, r: 2 }, 4, 8, "mid")}</g>`);
  body.push(`<g data-part="diagnosis-card" data-card="">${solid({ x: -146, y: -3, w: 14, d: 31, r: 2 }, 12, 2, "hi", true)}</g>`);
  body.push(`<g data-part="drive-belt">${solid({ x: -130, y: 42, w: 260, d: 9, r: 4 }, 4, 3, "lo")}</g>`);
  stationPositions.forEach((position) => body.push(station(position, status.get(position.id))));
  for (let i = 0; i < 14; i++) {
    const x = -121 + i * 18.5;
    body.push(`<g data-part="roller-${String(i + 1).padStart(2, "0")}">${cyl(x, 47, 4, 7, 4, "mid")}${k.lineSvg(k.ring(x, 47, 2, 11, P, 16), { tone: "lo" })}</g>`);
  }
  body.push(`<g data-part="pass-chute">${solid({ x: 102, y: 52, w: 18, d: 11, r: 2 }, 4, 9, "mid")}</g>`);
  body.push(`<g data-part="reject-chute">${solid({ x: 124, y: 52, w: 18, d: 11, r: 2 }, 4, 9, "mid")}</g>`);
  body.push(`<g data-part="pass-bin" data-bin="pass"${result.pass ? " data-active=\"\"" : ""}>${solid({ x: 72, y: -62, w: 32, d: 18, r: 2 }, 4, 7, "lo")}</g>`);
  body.push(`<g data-part="reject-bin" data-bin="rejected"${!result.pass ? " data-active=\"\"" : ""}>${solid({ x: 112, y: -62, w: 32, d: 18, r: 2 }, 4, 7, "lo")}</g>`);
  body.push(`<g data-part="status-lamp">${cyl(45, -55, 5, 4, 8, "hi", true)}</g>`);
  body.push(`<g data-part="control-wheel">${cyl(-136, -47, 8, 4, 5, "mid")}${k.lineSvg(k.ring(-136, -47, 5, 9, P, 24), { tone: "hi" })}</g>`);
  body.push(`<g data-part="emergency-stop">${cyl(-113, 57, 6, 4, 6, "hi")}</g>`);
  body.push(`<g data-part="power-switch">${solid({ x: -96, y: 52, w: 11, d: 10, r: 2 }, 4, 6, "mid")}</g>`);
  return { body: body.join(""), result };
}

function poster(theme, preset = "pass") {
  const { body, result } = machine(preset);
  return k.figureSvg({ width: W, height: H, standalone: theme, className: `preset-${preset}`, label: `Evidence inspection line showing ${result.pass ? "PASS" : "REJECTED"}.`, body });
}

function html(theme) {
  const initial = 0;
  const rendered = EVAL_PRESETS.map((preset) => ({ ...preset, result: scoreDiagnosis(preset) }));
  const { body } = machine(rendered[initial].id);
  const svg = k.figureSvg({ width: W, height: H, label: "Interactive deterministic evidence inspection line.", body });
  const first = rendered[initial];
  const plate = k.plateHtml({ fig: "Fig 2", title: "Evidence assay bench", hint: "Drag or use arrow keys", readout: `${first.label} · ${first.result.pass ? "PASS" : "REJECTED"}`, keys: [
    { mark: "lit", label: "Diagnosis card" }, { mark: "green", label: "passed station" }, { mark: "red", label: "failed station" },
  ], caption: "The diagnosis card advances through the checks in check.ts. A result passes only when every recorded failure is absent; unknown cases stop at case lookup.", body: `<div class="iso-stage" tabindex="0" role="slider" aria-label="Evaluation preset" aria-valuemin="0" aria-valuemax="${rendered.length - 1}" aria-valuenow="${initial}">${svg}</div>` });
  const live = `
const presets=${JSON.stringify(rendered)},stage=document.querySelector('.iso-stage'),svg=stage.querySelector('svg'),readout=document.querySelector('[data-readout]'),reduce=matchMedia('(prefers-reduced-motion: reduce)'),tourOrder=[...presets.keys(),...[...presets.keys()].slice(1,-1).reverse()],IDLE_START=1400,IDLE_RESUME=3600,TOUR_STEP=2200;const requested=new URLSearchParams(location.search).get('preset'),start=Math.max(0,presets.findIndex(p=>p.id===requested));let target=start,current=target,frame=0,last=0,visible=false,touring=false,tourStartedAt=0,idleTimer=0,hovered=false,focused=false,pressed=false;
function draw(v){const p=presets[Math.round(v)],m=new Map(p.result.checks.map(c=>[c.station,c.pass]));svg.querySelectorAll('[data-station]').forEach(n=>{n.removeAttribute('data-pass');n.removeAttribute('data-fail');if(m.has(n.dataset.station))n.toggleAttribute(m.get(n.dataset.station)?'data-pass':'data-fail',true)});svg.querySelectorAll('[data-bin]').forEach(n=>n.toggleAttribute('data-active',n.dataset.bin===(p.result.pass?'pass':'rejected')));svg.querySelector('[data-card]').setAttribute('transform',translateAlong(${JSON.stringify(P)},[(v-${initial})*18,0,0]));readout.textContent=p.label+' · '+(p.result.pass?'PASS':'REJECTED');stage.setAttribute('aria-valuenow',String(Math.round(v)));stage.setAttribute('aria-valuetext',readout.textContent)}
function engaged(){return hovered||focused||pressed}function clearIdle(){if(idleTimer){clearTimeout(idleTimer);idleTimer=0}}function stopTour(){touring=false;clearIdle()}
function tick(){const now=performance.now(),dt=last?Math.min((now-last)/1000,1/30):1/60;last=now;if(touring)target=tourOrder[Math.floor((now-tourStartedAt)/TOUR_STEP)%tourOrder.length];current=current+(target-current)*(1-Math.exp(-dt/.2));if(Math.abs(target-current)<.005)current=target;draw(current);frame=visible&&(touring||current!==target)?requestAnimationFrame(tick):0}function run(){if(!frame&&visible&&!reduce.matches){last=0;frame=requestAnimationFrame(tick)}}function set(n){target=Math.max(0,Math.min(presets.length-1,n));if(reduce.matches){current=target;draw(current)}else run()}
function scheduleTour(delay=IDLE_RESUME){stopTour();if(!visible||reduce.matches||engaged())return;idleTimer=setTimeout(()=>{idleTimer=0;if(!visible||reduce.matches||engaged())return;touring=true;tourStartedAt=performance.now()-tourOrder.indexOf(Math.round(current))*TOUR_STEP;run()},delay)}function hold(){stopTour();target=current}function release(){if(!engaged())scheduleTour()}
new IntersectionObserver(es=>{visible=es[es.length-1].isIntersecting;if(!visible){stopTour();if(frame)cancelAnimationFrame(frame);frame=0;last=0;return}run();scheduleTour(IDLE_START)},{rootMargin:'100px 0px'}).observe(stage);stage.addEventListener('pointerenter',e=>{if(e.pointerType==='mouse'){hovered=true;hold()}});stage.addEventListener('pointerleave',e=>{if(e.pointerType==='mouse')hovered=false;release()});stage.addEventListener('pointerdown',e=>{pressed=true;hold();stage.setPointerCapture?.(e.pointerId)});stage.addEventListener('pointerup',()=>{pressed=false;release()});stage.addEventListener('pointercancel',()=>{pressed=false;release()});stage.addEventListener('pointermove',e=>{if(e.pointerType!=='mouse'&&!pressed)return;hold();const b=svg.getBoundingClientRect();set(Math.round((e.clientX-b.left)/b.width*(presets.length-1)))});stage.addEventListener('focus',()=>{focused=true;hold()});stage.addEventListener('blur',()=>{focused=false;release()});stage.addEventListener('keydown',e=>{let n=null;if(e.key==='ArrowRight'||e.key==='ArrowUp')n=Math.round(current)+1;if(e.key==='ArrowLeft'||e.key==='ArrowDown')n=Math.round(current)-1;if(e.key==='Home')n=0;if(e.key==='End')n=presets.length-1;if(n===null)return;e.preventDefault();hold();set(n)});reduce.addEventListener('change',()=>{stopTour();if(reduce.matches){if(frame)cancelAnimationFrame(frame);frame=0;current=target;draw(current)}else{run();scheduleTour(IDLE_START)}});draw(current);`;
  const extra = `<style>.iso-stage{outline:none;touch-action:pan-y}.iso-stage:focus-visible{box-shadow:0 0 0 2px var(--anatomy-blue)}[data-pass] .iso-edge,[data-bin="pass"][data-active] .iso-edge{stroke:var(--anatomy-green)!important;stroke-width:1.2}[data-fail] .iso-edge,[data-bin="rejected"][data-active] .iso-edge{stroke:var(--anatomy-red)!important;stroke-width:1.2}.iso-solid[data-lit]{filter:drop-shadow(0 0 5px var(--anatomy-lit))}@media(prefers-reduced-motion:reduce){[data-flow]{animation:none!important}}</style>`;
  return k.pageHtml({ title: "Evidence assay bench", theme, body: RESPONSIVE_FIGURE_STYLE + extra + plate, script: kitScript() + live, width: 700 });
}

function audit() {
  assertEvalModel();
  if (EVAL_PARTS.length < 40) throw new Error("eval parts manifest has fewer than 40 parts");
  if (new Set(EVAL_PARTS.map((p) => p.name)).size !== EVAL_PARTS.length) throw new Error("duplicate eval part name");
  const required = ["eval.html", "eval-light.html", "eval.svg", "eval-light.svg", "eval-rejected.svg", "eval-rejected-light.svg"];
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
  add("bench-frame", BASE, -9, 9, true);
  add("bed-plate", k.insetPlan(BASE, 7), 0, 4);
  add("feed-tray", { x: -148, y: -8, w: 18, d: 42, r: 2 }, 4, 8); add("diagnosis-card", { x: -146, y: -3, w: 14, d: 31, r: 2 }, 12, 2);
  add("drive-belt", { x: -130, y: 42, w: 260, d: 9, r: 4 }, 4, 3);
  stationPositions.forEach(({ id, x, y }) => { add(`station-${id}`, { x, y, w: 29, d: 25, r: 2.5 }, 4, 13); addCyl(`station-${id}.lamp`, x + 14.5, y + 12.5, 5.2, 17, 3); });
  for (let i=0;i<14;i++){const x=-121+i*18.5;addCyl(`roller-${String(i+1).padStart(2,"0")}`,x,47,4,7,4);}
  add("pass-chute", { x:102,y:52,w:18,d:11,r:2 },4,9); add("reject-chute", { x:124,y:52,w:18,d:11,r:2 },4,9);
  add("pass-bin", { x:72,y:-62,w:32,d:18,r:2 },4,7); add("reject-bin", { x:112,y:-62,w:32,d:18,r:2 },4,7);
  addCyl("status-lamp",45,-55,5,4,8); addCyl("control-wheel",-136,-47,8,4,5); addCyl("emergency-stop",-113,57,6,4,6); add("power-switch",{x:-96,y:52,w:11,d:10,r:2},4,6);
  A.settle(R, P);
  A.auditOrExit(R, P, { argv: ["--audit"] });
  console.log(`eval audit: ${EVAL_PARTS.length} unique parts, ${required.length} outputs ok`);
}

mkdirSync(OUT, { recursive: true });
for (const theme of ["dark", "light"]) {
  writeFileSync(join(OUT, theme === "dark" ? "eval.html" : "eval-light.html"), html(theme));
  writeFileSync(join(OUT, theme === "dark" ? "eval.svg" : "eval-light.svg"), poster(theme, "pass"));
  writeFileSync(join(OUT, theme === "dark" ? "eval-rejected.svg" : "eval-rejected-light.svg"), poster(theme, "rejected"));
}
console.log("eval build: wrote dark/light HTML, PASS SVG and REJECTED SVG");
if (process.argv.includes("--audit")) audit();
