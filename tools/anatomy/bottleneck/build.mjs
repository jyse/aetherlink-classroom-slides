import { writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import * as k from '../vendor/kit/iso-kit.mjs';
import { RESPONSIVE_FIGURE_STYLE } from '../responsive.mjs';
import { ARRIVAL_RATE, ILLUSTRATIVE, SPEED_RANGE, STATIONS, clampSpeed, readoutOf, simulate, stationSummary } from './model.mjs';
import { PARTS } from './parts.mjs';

const HERE = dirname(fileURLToPath(import.meta.url));
const ROOT = join(HERE, '..', '..', '..');
const OUT = join(ROOT, 'assets', 'anatomy');
const WIDTH = 740;
const HEIGHT = 430;
const START_SPEED = 1;
const STATION_X = [-126, -76, -26, 24, 74, 124];
const PLATE = { x: -160, y: -58, w: 330, d: 116, r: 9 };
const PLATE_H = 11;
const FOOT_H = 5;
const BELT_Y = 2;
const QUEUE_Y = -37;
const CONTROL_TRAVEL = 28;

const P = k.fitProjection(
  [...k.boxCorners(PLATE, -PLATE_H - FOOT_H, 55), [-170, 70, 0], [174, -70, 0]],
  WIDTH,
  HEIGHT,
  { pad: 28, headroom: 30, azimuth: 43, elevation: 31 },
);

const at = (point) => k.iso(point, P);
const S = (paths, style) => k.solidSvg(paths, style);
const L = (d, style) => k.lineSvg(d, style);
const D = (points, style) => k.dotsSvg(points, style);
const wrap = (id, body, attrs = '') => `<g data-part="${id}"${attrs}>${body}</g>`;
const byDepth = (points) => [...points].sort((a, b) =>
  k.depthOf([a[0], a[1], a[2] || 0], P) - k.depthOf([b[0], b[1], b[2] || 0], P));

function base() {
  const out = [`<path class="iso-halo" d="${k.haloOf(PLATE, -PLATE_H - FOOT_H, PLATE_H, P)}"/>`];
  const corners = [
    ['nw', PLATE.x + 22, PLATE.y + 22],
    ['ne', PLATE.x + PLATE.w - 22, PLATE.y + 22],
    ['sw', PLATE.x + 22, PLATE.y + PLATE.d - 22],
    ['se', PLATE.x + PLATE.w - 22, PLATE.y + PLATE.d - 22],
  ];
  for (const [name, x, y] of corners.sort((a, b) =>
    k.depthOf([a[1], a[2], 0], P) - k.depthOf([b[1], b[2], 0], P))) {
    out.push(wrap(`foot-${name}`, S(k.slabOf({ x: x - 5, y: y - 5, w: 10, d: 10, r: 1.8 }, -PLATE_H - FOOT_H, FOOT_H, P, 4, 0.7), { tone: 'mid' })));
  }
  out.push(wrap('base-plate', S(k.slabOf(PLATE, -PLATE_H, PLATE_H, P, 8, 1.5), { tone: 'mid' })));
  out.push(L(k.planOutline(k.insetPlan(PLATE, 5), 0, P), { tone: 'lo' }));
  for (const [name, x, y] of corners) {
    out.push(wrap(`base-screw-${name}`,
      L(k.ring(x, y, 2.1, 0.2, P, 16), { tone: 'lo' }) + D([at([x, y, 0.2])], { size: 0.5 })));
  }
  const ruler = { x: -145, y: 43, w: 294, d: 7, r: 1 };
  const ticks = k.topTicks(ruler.x + 4, ruler.x + ruler.w - 4, 5, 5, ruler.y + 0.8, 0.7, [2, 3.7], P);
  out.push(wrap('ruler-strip', S(k.slabOf(ruler, 0, 0.7, P, 3), { tone: 'lo', crease: 'none' }) +
    L(ticks.minor, { tone: 'lo' }) + L(ticks.major, { tone: 'mid' })));
  const modelPlate = { x: 99, y: -50, w: 55, d: 11, r: 1.5 };
  const rules = [5, 8, 11].map((offset, index) =>
    k.lineOnTop([modelPlate.x + 7, modelPlate.y + offset], [modelPlate.x + 42 - index * 6, modelPlate.y + offset], 0.9, P)).join('');
  out.push(wrap('model-plate', S(k.slabOf(modelPlate, 0, 0.9, P, 4), { tone: 'lo' }) +
    L(rules, { tone: 'mid', free: true })));
  return out.join('');
}

function transport() {
  const out = [];
  for (const [id, y] of [['belt-back-rail', BELT_Y + 9], ['belt-front-rail', BELT_Y - 9]]) {
    out.push(wrap(id, S(k.slabOf({ x: -148, y, w: 302, d: 3.5, r: 1 }, 1, 3.5, P, 3, 0.4), { tone: 'mid' })));
  }
  [-148, -98, -48, 2, 52, 102, 152].forEach((x, index) => {
    out.push(wrap(`belt-roller-${index + 1}`,
      S(k.slabOf({ x: x - 1.8, y: BELT_Y - 9, w: 3.6, d: 21.5, r: 1 }, 2.5, 2.2, P, 3, 0.35), { tone: 'lo' })));
  });
  return out.join('');
}

function queueFor(station, stationIndex, x) {
  const tray = { x: x - 10, y: QUEUE_Y, w: 20, d: 19, r: 2 };
  const initial = stationSummary(simulate(START_SPEED))[stationIndex];
  const out = [wrap(`${station.id}-queue-tray`, S(k.slabOf(tray, 0, 3.2, P, 4, 0.5), { tone: 'mid' }))];
  for (let index = 0; index < 5; index++) {
    const card = { x: x - 7.5, y: QUEUE_Y + 2.5, w: 15, d: 14, r: 1.2 };
    const body = S(k.slabOf(card, 3.2 + index * 2.25, 1.45, P, 4, 0.25), { tone: index === 0 ? 'hi' : 'mid' });
    const share = Math.min(1, Math.max(0, initial.queue - index));
    out.push(wrap(`${station.id}-queue-card-${index + 1}`, body,
      ` class="queue-card" data-station-index="${stationIndex}" data-level="${index}" style="opacity:${(0.08 + 0.92 * share).toFixed(3)}"`));
  }
  return out.join('');
}

function stationMachine(station, stationIndex, x) {
  const housing = { x: x - 9, y: BELT_Y + 13, w: 18, d: 18, r: 2.4 };
  const pedestal = { x: x - 11, y: BELT_Y + 11, w: 22, d: 22, r: 3 };
  const cap = { x: x - 10, y: BELT_Y + 12, w: 20, d: 20, r: 3 };
  const sensorX = x - 7.5;
  const sensorY = BELT_Y + 5;
  const out = [];
  out.push(wrap(`${station.id}-pedestal`, S(k.slabOf(pedestal, 0, 6, P, 5, 0.7), { tone: 'mid' })));
  out.push(wrap(`${station.id}-housing`, S(k.slabOf(housing, 6, 31, P, 5, 1), { tone: 'mid', inner: L(k.sideSeam(housing, 26, P, 5), { tone: 'faint' }) })));
  out.push(wrap(`${station.id}-cap`, S(k.slabOf(cap, 37, 4, P, 5, 0.7), { tone: 'hi' })));
  out.push(wrap(`${station.id}-sensor`,
    S(k.slabOf({ x: sensorX, y: sensorY, w: 3.5, d: 3.5, r: 0.7 }, 5, 25, P, 3, 0.35), { tone: 'lo', crease: 'none' }) +
    S(k.slabOf({ x: sensorX - 1.5, y: sensorY - 1.5, w: 6.5, d: 6.5, r: 1.2 }, 30, 4, P, 4, 0.45), { tone: 'mid' })));
  out.push(wrap(`${station.id}-lamp`,
    S(k.slabOf({ x: x - 3.2, y: BELT_Y + 18.8, w: 6.4, d: 6.4, r: 1.2 }, 41, 4.5, P, 4, 0.45), { tone: 'hi' }),
    ' class="station-lamp"'));
  const screwPoints = [[x - 6, BELT_Y + 16, 41], [x + 6, BELT_Y + 16, 41]];
  out.push(D(screwPoints.map(at), { size: 0.43 }));
  return `<g class="station" data-station="${station.id}" data-index="${stationIndex}" data-bottleneck="false">${out.join('')}</g>`;
}

function buildControl() {
  const x = STATION_X[2];
  const bed = { x: x - 19, y: -54, w: 38, d: 12, r: 2 };
  const track = { x: x - CONTROL_TRAVEL / 2, y: -49, w: CONTROL_TRAVEL, d: 3, r: 1 };
  const knobX = x;
  const knobY = -47.5;
  const knob = S(k.slabOf({ x: knobX - 4.4, y: knobY - 4.4, w: 8.8, d: 8.8, r: 1.8 }, 2.6, 4.2, P, 4, 0.7), { tone: 'hi' }) +
    L(k.planOutline({ x: knobX - 2.8, y: knobY - 2.8, w: 5.6, d: 5.6, r: 1 }, 6.8, P, 4), { tone: 'lo' });
  return [
    wrap('build-control-bed', S(k.slabOf(bed, 0, 2.6, P, 4, 0.5), { tone: 'mid' })),
    wrap('build-control-track', S(k.slabOf(track, 2.6, 0.9, P, 3), { tone: 'lo', crease: 'none' })),
    wrap('build-control-pointer', L(k.lineOnTop([x, track.y], [x, track.y + track.d], 3.55, P), { tone: 'hi' })),
    wrap('build-control-knob', knob, ' class="speed-knob"'),
  ].join('');
}

function artBody(theme) {
  const stationOrder = STATIONS.map((station, index) => ({ station, index, x: STATION_X[index] }))
    .sort((a, b) => k.depthOf([a.x, BELT_Y, 0], P) - k.depthOf([b.x, BELT_Y, 0], P));
  const machines = stationOrder.map(({ station, index, x }) => stationMachine(station, index, x)).join('');
  const queues = STATIONS.map((station, index) => queueFor(station, index, STATION_X[index])).join('');
  const custom = `<style>
    .queue-card{transition:opacity .45s var(--anatomy-ease)}
    .station[data-bottleneck="true"] .station-lamp .iso-edge{stroke:var(--anatomy-lit);stroke-width:1.3px}
    .station[data-bottleneck="true"] .station-lamp .iso-top{fill:var(--anatomy-lit-top)}
    .speed-knob{transition:filter .2s}
    .speed-knob:hover{filter:drop-shadow(0 0 4px var(--anatomy-hi))}
    .model-badge,.model-readout{font-family:var(--anatomy-mono);fill:var(--anatomy-muted);font-size:10px;letter-spacing:.06em}
    .model-readout{fill:var(--anatomy-strong);text-anchor:end;letter-spacing:0}
    @media(prefers-reduced-motion:reduce){.queue-card{transition:none}.iso-line[data-flow]{animation:none}}
  </style>`;
  return [
    custom,
    `<text class="model-badge" x="18" y="19">ILLUSTRATIVE VALUES · ITEMS/HOUR</text>`,
    `<text class="model-readout" data-svg-readout="" x="722" y="19">${escapeXml(readoutOf(simulate(START_SPEED)))}</text>`,
    base(),
    transport(),
    machines,
    queues,
    buildControl(),
  ].join('');
}

const escapeXml = (text) => String(text).replace(/[&<>"']/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&apos;' })[char]);

function runtime() {
  const unit = k.axisVector(P, [1, 0, 0]);
  return `
const ARRIVAL_RATE=${ARRIVAL_RATE};
const ILLUSTRATIVE=${ILLUSTRATIVE};
const SPEED_RANGE=${JSON.stringify(SPEED_RANGE)};
const STATIONS=${JSON.stringify(STATIONS)};
const CONTROL_TRAVEL=${CONTROL_TRAVEL};
const KNOB_UNIT=${JSON.stringify(unit)};
const clampSpeed=${clampSpeed.toString()};
const simulate=${simulate.toString()};
const readoutOf=${readoutOf.toString()};
const stationSummary=${stationSummary.toString()};
const stage=document.querySelector('.iso-stage')||document.documentElement;
const svg=stage.matches('svg')?stage:stage.querySelector('svg');
const readouts=[document.querySelector('[data-readout]'),svg.querySelector('[data-svg-readout]')].filter(Boolean);
const still=matchMedia('(prefers-reduced-motion: reduce)');
const clamp=(value,low,high)=>Math.min(high,Math.max(low,value));
let value=${START_SPEED},target=value,frame=0,last=0,clock=0,visible=false,touring=!still.matches,idleTimer=0;
const paint=()=>{
  const result=simulate(value);
  const summary=stationSummary(result);
  summary.forEach((station,index)=>{
    const root=svg.querySelector('[data-station="'+station.id+'"]');
    if(root)root.dataset.bottleneck=String(station.bottleneck);
    svg.querySelectorAll('[data-station-index="'+index+'"][data-level]').forEach((card)=>{
      const level=Number(card.dataset.level);
      const share=clamp(station.queue-level,0,1);
      card.style.opacity=String(.08+.92*share);
    });
  });
  const knob=svg.querySelector('.speed-knob');
  const offset=(value-1)*CONTROL_TRAVEL;
  knob.setAttribute('transform','translate('+(KNOB_UNIT[0]*offset).toFixed(2)+' '+(KNOB_UNIT[1]*offset).toFixed(2)+')');
  const text=readoutOf(result);
  readouts.forEach((node)=>node.textContent=text);
  stage.setAttribute('aria-valuenow',String(Math.round(value*100)));
  stage.setAttribute('aria-valuetext',text+'. Values are illustrative.');
};
const tourAt=(time)=>[.5,1,1.5,1][Math.floor(time/3.2)%4];
const tick=(now)=>{
  const dt=last?Math.min((now-last)/1000,1/30):1/60;last=now;
  if(touring){clock+=dt;target=tourAt(clock)}
  value=still.matches?target:value+(target-value)*(1-Math.exp(-dt/.34));
  if(Math.abs(target-value)<.001)value=target;
  paint();
  const settled=!touring&&value===target;
  frame=visible&&!settled?requestAnimationFrame(tick):0;
};
const run=()=>{if(!frame&&visible){last=0;frame=requestAnimationFrame(tick)}};
const steer=(next)=>{
  touring=false;target=clampSpeed(next);clearTimeout(idleTimer);
  idleTimer=setTimeout(()=>{touring=!still.matches;clock=0;run()},3600);run();
};
new IntersectionObserver((entries)=>{visible=entries[entries.length-1].isIntersecting;if(visible)run()}, {rootMargin:'120px 0px'}).observe(stage);
stage.addEventListener('pointermove',(event)=>{
  const box=svg.getBoundingClientRect();
  const share=clamp((event.clientX-box.left)/box.width,0,1);
  steer(SPEED_RANGE.min+share*(SPEED_RANGE.max-SPEED_RANGE.min));
});
stage.addEventListener('pointerdown',(event)=>{stage.setPointerCapture?.(event.pointerId)});
stage.addEventListener('pointerup',(event)=>{stage.releasePointerCapture?.(event.pointerId)});
stage.addEventListener('pointercancel',(event)=>{stage.releasePointerCapture?.(event.pointerId)});
stage.addEventListener('keydown',(event)=>{
  let next=null;
  if(event.key==='ArrowRight'||event.key==='ArrowUp')next=target+SPEED_RANGE.step*(event.shiftKey?5:1);
  if(event.key==='ArrowLeft'||event.key==='ArrowDown')next=target-SPEED_RANGE.step*(event.shiftKey?5:1);
  if(event.key==='Home')next=SPEED_RANGE.min;
  if(event.key==='End')next=SPEED_RANGE.max;
  if(event.key==='Escape'){touring=false;target=value}
  if(next===null)return;event.preventDefault();steer(next);
});
stage.addEventListener('focus',()=>{touring=false;target=value;paint()});
still.addEventListener?.('change',()=>{touring=!still.matches;if(still.matches){value=target;paint()}run()});
paint();
`;
}

function figure(theme, standalone, interactive = true) {
  const body = artBody(theme) + (standalone && interactive ? `<script><![CDATA[${runtime()}]]></script>` : '');
  const markup = k.figureSvg({
    width: WIDTH,
    height: HEIGHT,
    standalone: standalone ? theme : false,
    label: 'A physical line with six stations from Plan to Maintain. A speed control at Build changes its output. At low speed work queues at Build. At high speed work reaches Deploy faster than Deploy can process it, so the downstream queue grows. All values are illustrative.',
    body,
    className: 'bottleneck-machine',
  });
  return standalone && interactive
    ? markup.replace('role="img"', 'tabindex="0" role="slider" aria-valuemin="50" aria-valuemax="150" aria-valuenow="100" data-model="illustrative" style="touch-action:pan-y"')
    : markup;
}

function html(theme) {
  const result = simulate(START_SPEED);
  const svg = figure(theme, false, false);
  const body = k.plateHtml({
    fig: 'Fig 2',
    title: 'The bottleneck moved',
    hint: 'Move across the figure · arrows change Build speed',
    readout: readoutOf(result),
    keys: [
      { mark: 'lit', label: 'Build speed control and the active constraint' },
      { mark: 'raised', label: 'Six physical stations from Plan to Maintain' },
      { mark: 'flat', label: 'Queue cards after one illustrative hour' },
    ],
    caption: 'Illustrative model. Six stations process work for one hour. Increase Build from 50% to 150%. Build clears its own queue, but Deploy can process only 2.6 items per hour, so the largest queue moves downstream.',
    body: `<div class="iso-stage" data-model="illustrative" tabindex="0" role="slider" aria-label="Build speed. Use arrow keys from 50 to 150 percent." aria-valuemin="50" aria-valuemax="150" aria-valuenow="100" style="touch-action:pan-y">${svg}</div>`,
  });
  return k.pageHtml({ title: 'The bottleneck moved', theme, body: RESPONSIVE_FIGURE_STYLE + body, script: runtime(), width: 820 });
}

for (const theme of ['dark', 'light']) {
  const suffix = theme === 'light' ? '-light' : '';
  writeFileSync(join(OUT, `bottleneck${suffix}.html`), html(theme));
  writeFileSync(join(OUT, `bottleneck${suffix}.svg`), figure(theme, true, false));
}

writeFileSync(join(HERE, 'parts-manifest.json'), `${JSON.stringify({ figure: 'bottleneck', count: PARTS.length, parts: PARTS }, null, 2)}\n`);
console.log(`wrote bottleneck dark/light HTML and SVG · ${PARTS.length} purposeful parts`);
await import('./audit.mjs');
