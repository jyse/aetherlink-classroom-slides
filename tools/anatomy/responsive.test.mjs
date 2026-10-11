import assert from 'node:assert/strict';
import {test} from 'node:test';
import {readFileSync} from 'node:fs';
import {fileURLToPath} from 'node:url';
import path from 'node:path';
import {RESPONSIVE_FIGURE_STYLE} from './responsive.mjs';

const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'../..');

test('Every Anatomy page includes the shared responsive styles',()=>{
 for(const id of ['bottleneck','loop','mcp','hooks','subagents','eval']){
  for(const theme of ['','-light']){
   const file=`assets/anatomy/${id}${theme}.html`;
   assert.ok(readFileSync(path.join(root,file),'utf8').includes(RESPONSIVE_FIGURE_STYLE),file);
  }
 }
});
