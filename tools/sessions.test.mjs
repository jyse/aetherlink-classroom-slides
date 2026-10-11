import {test} from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync,existsSync} from 'node:fs';
import vm from 'node:vm';
import {createHash} from 'node:crypto';
const read=name=>readFileSync(new URL('../'+name,import.meta.url),'utf8');
const context={window:{},location:{search:'?embed=1'},URLSearchParams};
vm.runInNewContext(read('sessions.js'),context);
const sessions=context.window.CLASSROOM_SESSIONS;
test('All seven sessions open real decks with real assets and matching presenters',()=>{
 assert.equal(sessions.length,7); assert.equal(new Set(sessions.map(s=>s.id)).size,7);
 for(const session of sessions){
  const html=read(session.deck);const data=html.match(/src="([^"?]*slides.js)/)[1];const deck={window:{}};vm.runInNewContext(read(data),deck);
  assert.ok(deck.window.SLIDES.length>=session.start);
  assert.ok(deck.window.SLIDES.every(s=>s.title&&s.notes),session.id);
  for(const s of deck.window.SLIDES)if(s.visual?.image){const url=new URL('../'+s.visual.image,import.meta.url);assert.ok(existsSync(url),s.visual.image);const bytes=readFileSync(url);assert.ok(bytes.length>100,s.visual.image);assert.ok(bytes[0]===0x89||bytes[0]===0xff||bytes.subarray(0,4).toString()==='RIFF'||bytes.subarray(0,3).toString()==='GIF'||bytes.includes(Buffer.from('<svg')),s.visual.image)}
  const presenter=session.deck==='index.html'?'presenter.html':session.deck.replace('.html','-presenter.html');
  const phtml=read(presenter);assert.ok(phtml.includes(data),presenter);
  if(session.deck!=='index.html')assert.ok(phtml.includes(`window.DECK_PAGE = "${session.deck}"`),presenter);
 }
 assert.equal(sessions[0].href,'index.html#7');assert.equal(sessions[1].href,'index.html#63');
});
test('Day selection tracks hash navigation and opens the chosen session',()=>{
 const listeners={};let select;
 const element=tag=>({tag,children:[],append(...children){this.children.push(...children)},prepend(){},addEventListener(event,fn){this[event]=fn}});
 const ctx={window:{},URLSearchParams,location:{search:'',pathname:'/index.html',hash:'#7'},addEventListener(event,fn){listeners[event]=fn},document:{createElement(tag){const e=element(tag);if(tag==='select')select=e;return e},querySelector(){return element('tools')}}};
 vm.runInNewContext(read('sessions.js'),ctx);assert.equal(select.value,'day-1');ctx.location.hash='#63';listeners.hashchange();assert.equal(select.value,'day-2');select.value='hackathon-2';select.change();assert.equal(ctx.location.href,'workshop7.html#1');
});
test('Deck and presenter use separate matching channels and storage keys',()=>{
 const evaluate=(file,deck)=>{const src=read(file);const start=src.indexOf('const DECK_ID =');const end=src.indexOf(';',src.indexOf('const PRESENTER_KEY =',start))+1;const ctx={location:{pathname:'/path/'+deck},window:{DECK_PAGE:deck}};return vm.runInNewContext(src.slice(start,end)+'; ({channel:PRESENTER_CHANNEL,key:PRESENTER_KEY})',ctx)};
 for(const deck of ['index.html','workshop3.html','workshop5.html','workshop7.html']){const main=evaluate('app.js',deck),presenter=evaluate('presenter.js',deck);assert.equal(main.channel,presenter.channel);assert.equal(main.key,presenter.key)}
 assert.notEqual(evaluate('app.js','workshop3.html').channel,evaluate('app.js','workshop5.html').channel);
 assert.notEqual(evaluate('app.js','workshop3.html').key,evaluate('app.js','workshop5.html').key);
});

test('Imported authored data matches its pinned source digest',()=>{
 const manifest=JSON.parse(read('tools/session-source-manifest.json'));
 for(const item of manifest.decks){
  const ctx={window:{}};vm.runInNewContext(read(item.file),ctx);
  for(const slide of ctx.window.SLIDES)if(slide.visual?.image)slide.visual.image=slide.visual.image.replace(/^assets\//,'');
  assert.equal(ctx.window.SLIDES.length,item.slides);
  assert.equal(createHash('sha256').update(JSON.stringify(ctx.window.SLIDES)).digest('hex'),item.normalizedDataSha256,item.file);
 }
});
test('Hidden and shown preferences are separated by deck and shared with its presenter',()=>{
 for(const file of ['app.js','presenter.js']){const source=read(file);assert.ok(source.includes("const HIDDEN_KEY = 'als:hidden:' + DECK_ID"));assert.ok(source.includes("const SHOWN_KEY = 'als:shown:' + DECK_ID"));}
 const presenter=read('presenter.js');assert.ok(presenter.includes('list(SHOWN_KEY)'));assert.ok(presenter.includes('e.key === SHOWN_KEY'));
});
