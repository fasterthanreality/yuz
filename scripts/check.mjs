import {readFileSync} from 'node:fs';
import vm from 'node:vm';
import assert from 'node:assert/strict';
const context={window:{}};
vm.runInNewContext(readFileSync('atlas-data.js','utf8'),context);
const d=context.window.YUZ_DATA;
const ids=new Set(d.genres.map(n=>n.id));
assert.equal(ids.size,d.genres.length,'Duplicate genre IDs');
const families=new Set(d.families.map(f=>f.id));
assert.equal(families.size,7);
for(const n of d.genres){assert(families.has(n.family),n.id);assert(Number.isFinite(n.x)&&Number.isFinite(n.y),n.id);}
for(const e of d.links)assert(ids.has(e.source)&&ids.has(e.target),'Broken genre link');
const html=readFileSync('index.html','utf8');
for(const f of families)assert(html.includes(`data-family="${f}"`),f);
for(const match of html.matchAll(/<script>([\s\S]*?)<\/script>/g))new vm.Script(match[1]);
assert.equal(d.genres.find(n=>n.id==='hyperpop').family,'alt-pop');
assert.equal(d.genres.find(n=>n.id==='trip-hop').family,'electronic');
console.log(`Passed: ${d.genres.length} genres, ${d.links.length} connections, 7 territories, JavaScript syntax.`);
