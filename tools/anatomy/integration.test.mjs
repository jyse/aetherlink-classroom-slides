import assert from 'node:assert/strict';
import {test} from 'node:test';
import {readFileSync,existsSync} from 'node:fs';
import {fileURLToPath} from 'node:url';
import path from 'node:path';
import vm from 'node:vm';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'../..');
const read=name=>readFileSync(path.join(root,name),'utf8');
const context={window:{}};
vm.runInNewContext(read('workshop5-slides.js'),context);
test('Workshop keeps 60 slides and seven usable Anatomy figures',()=>{
 assert.equal(context.window.SLIDES.length,60);
 const mapping=[[8,'bottleneck',''],[10,'loop',''],[30,'mcp',''],[35,'hooks',''],[39,'subagents',''],[43,'eval',''],[44,'eval','?preset=rejected']];
 for(const[number,id,query]of mapping){
  const slide=context.window.SLIDES[number-1],a=slide.visual.anatomy;
  assert.equal(a.src,`assets/anatomy/${id}.html${query}`);
  assert.equal(a.poster,`assets/anatomy/${id}${number===44?'-rejected':''}.svg`);
  for(const target of [a.src.split('?')[0],a.poster])assert.ok(existsSync(path.join(root,target)),target);
  assert.ok(a.title&&a.caption&&slide.notes&&slide.keyPoints.length,`Slide ${number} retains teaching content`);
 }
});
test('Presenter uses posters before the legacy bot renderer',()=>{
 const app=read('app.js');
 const anatomy=app.indexOf('if (v.anatomy)');
 const embed=app.indexOf('if (EMBED)',anatomy);
 const bot=app.indexOf('const bot = BOTS[v.bot]',anatomy);
 assert.ok(anatomy>0&&embed>anatomy&&bot>embed);
 assert.ok(app.slice(anatomy,bot).includes('img.src = a.poster'));
 assert.ok(app.slice(anatomy,bot).includes('frame.src = a.src'));
});
test('Classroom and presenter reference the same cached slide and style versions',()=>{
 const main=read('workshop5.html'),presenter=read('workshop5-presenter.html');
 for(const asset of ['styles.css','workshop5-slides.js']){
  const extract=html=>html.match(new RegExp(asset.replace('.','\\.')+'\\?v=([^"\\s]+)'))?.[1];
  assert.ok(extract(main),asset);assert.equal(extract(main),extract(presenter),asset);
 }
});
