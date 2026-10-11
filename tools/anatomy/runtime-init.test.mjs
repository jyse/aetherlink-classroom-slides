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
 const svg={querySelectorAll(){return[]},querySelector(){return marker}};
 const stage={addEventListener(){},querySelector(){return svg},setAttribute(name,value){attributes.set(name,value)}};
 const readout={textContent:''},reduce={matches:true,addEventListener(){}};
 const context={
  document:{querySelector(selector){return selector==='.iso-stage'?stage:readout}},
  location:{search:''},matchMedia(){return reduce},URLSearchParams,
  IntersectionObserver:class{observe(){}},clearTimeout(){},setTimeout(){return 1},
  cancelAnimationFrame(){},requestAnimationFrame(){return 1},performance:{now(){return 0}},
 };
 vm.runInNewContext(moduleOf(read(file)),context,{filename:file});
 assert.ok(attributes.has('aria-valuenow'),`${file} initializes its slider`);
 assert.ok(readout.textContent,`${file} initializes its readout`);
};

test('Hooks and eval generated modules initialize in both themes',()=>{
 for(const id of ['hooks','eval'])for(const theme of ['','-light'])run(`assets/anatomy/${id}${theme}.html`);
});
