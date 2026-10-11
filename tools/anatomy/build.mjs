import {execFileSync} from 'node:child_process';
import {existsSync,readFileSync} from 'node:fs';
import {fileURLToPath} from 'node:url';
import path from 'node:path';
const root=path.dirname(fileURLToPath(import.meta.url));
for(const id of ['bottleneck','loop','mcp','hooks','subagents','eval']){
 const script=path.join(root,id,'build.mjs');
 if(!existsSync(script))throw new Error(`Missing Anatomy builder: ${script}`);
 const audit=process.argv.includes('--audit')&&readFileSync(script,'utf8').includes('--audit');
 execFileSync(process.execPath,[script,...(audit?['--audit']:[])],{cwd:path.dirname(script),stdio:'inherit'});
 const separateAudit=path.join(root,id,'audit.mjs');
 if(process.argv.includes('--audit')&&existsSync(separateAudit))execFileSync(process.execPath,[separateAudit],{cwd:path.dirname(script),stdio:'inherit'});
}
