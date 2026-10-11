import assert from 'node:assert/strict';
import {test} from 'node:test';
import {readFileSync} from 'node:fs';
import {fileURLToPath} from 'node:url';
import path from 'node:path';
import vm from 'node:vm';

const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'../..');
const read=name=>readFileSync(path.join(root,name),'utf8');
const moduleOf=html=>{
 const scripts=[...html.matchAll(/<script type="module">([\s\S]*?)<\/script>/g)];
 assert.equal(scripts.length,1);
 return scripts[0][1];
};
const run=file=>{
 const attributes=new Map(),marker={setAttribute(){}};
 let sliderWrites=0;
 const svg={querySelectorAll(){return[]},querySelector(){return marker}};
 const stage={addEventListener(){},querySelector(){return svg},setAttribute(name,value){attributes.set(name,value);if(name==='aria-valuenow')sliderWrites++}};
 const readout={textContent:''},reduce={matches:false,addEventListener(){}},frames=[],timers=[];
 let clock=20000;
 const context={
  document:{querySelector(selector){return selector==='.iso-stage'?stage:readout}},
  location:{search:''},matchMedia(){return reduce},URLSearchParams,
  IntersectionObserver:class{constructor(callback){this.callback=callback}observe(){this.callback([{isIntersecting:true}])}},
  clearTimeout(){},setTimeout(callback){timers.push(callback);return timers.length},
  cancelAnimationFrame(){},requestAnimationFrame(callback){frames.push(callback);return frames.length},
  performance:{now(){const now=clock;clock+=clock===20000?2201:33;return now}},
 };
 vm.runInNewContext(moduleOf(read(file)),context,{filename:file});
 assert.equal(timers.length,1,`${file} schedules its idle tour`);
 assert.equal(frames.length,1,`${file} schedules its first animation frame`);
 const before=readout.textContent;
 timers.shift()();
 for(let index=0;index<12;index++)frames.shift()(100+index);
 assert.ok(attributes.has('aria-valuenow'),`${file} initializes its slider`);
 assert.notEqual(readout.textContent,before,`${file} advances despite misleading animation-frame timestamps`);
 assert.equal(sliderWrites,13,`${file} draws every driver-skewed animation frame`);
};

test('Hooks and eval modules tolerate driver clock skew in both themes',()=>{
 for(const id of ['hooks','eval'])for(const theme of ['','-light'])run(`assets/anatomy/${id}${theme}.html`);
});
