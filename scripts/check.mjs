import {readFileSync} from 'node:fs';
import vm from 'node:vm';
import assert from 'node:assert/strict';
const context={window:{}};
vm.runInNewContext(readFileSync('atlas-data.js','utf8'),context);
const d=context.window.YUZ_DATA;
const ids=new Set(d.genres.map(n=>n.id));
assert.equal(ids.size,d.genres.length,'Duplicate genre IDs');
const families=new Set(d.families.map(f=>f.id));
assert.equal(families.size,8);
for(const n of d.genres){assert(families.has(n.family),n.id);assert(Number.isFinite(n.x)&&Number.isFinite(n.y),n.id);}
for(const e of d.links)assert(ids.has(e.source)&&ids.has(e.target),'Broken genre link');
const html=readFileSync('index.html','utf8');
for(const f of families)assert(html.includes(`data-family="${f}"`),f);
for(const match of html.matchAll(/<script>([\s\S]*?)<\/script>/g))new vm.Script(match[1]);
assert.equal(d.genres.find(n=>n.id==='hyperpop').family,'alt-pop');
assert.equal(d.genres.find(n=>n.id==='trip-hop').family,'electronic');
console.log(`Passed: ${d.genres.length} genres, ${d.links.length} connections, 8 territories, JavaScript syntax.`);

vm.runInNewContext(readFileSync("artists-data.js","utf8"),context);
assert.equal(new Set(context.window.YUZ_ARTISTS.map(a=>a.id)).size,context.window.YUZ_ARTISTS.length);
for(const a of context.window.YUZ_ARTISTS){for(const id of a.genres)assert(ids.has(id),id);for(const t of a.territories)assert(families.has(t),t);assert(new URL(a.url).protocol==="https:");}
console.log("Artist IDs, genre references, territories and listening URLs passed.");

assert(context.window.YUZ_ARTISTS.length>=20,'Catalogue expansion missing');
for(const a of context.window.YUZ_ARTISTS){const u=new URL(a.recording.embed);assert.equal(u.hostname,'bandcamp.com');assert(/^\/EmbeddedPlayer\/(album|track)=\d+\//.test(u.pathname));assert(a.recording.title);assert.equal(new URL(a.recording.url).protocol,'https:');for(const url of Object.values(a.listenOn))assert.equal(new URL(url).protocol,'https:');}
console.log(`Verified ${context.window.YUZ_ARTISTS.length} artist recording entries and embedded player URLs.`);

assert(context.window.YUZ_ARTISTS.length>=40,'Catalogue expansion missing');
const contact=readFileSync('contact.html','utf8');
assert(!html.includes('id="contactForm"'),'Form must be on its own page');
assert(html.includes('href="/contact.html"'));
assert(contact.includes('id="contactForm"'));
for(const m of contact.matchAll(/<script>([\s\S]*?)<\/script>/g))new vm.Script(m[1]);
console.log('Dedicated contact page and scripts passed.');
