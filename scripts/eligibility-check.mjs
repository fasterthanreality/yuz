import vm from 'node:vm';
import {readFileSync} from 'node:fs';
import assert from 'node:assert/strict';
const context={window:{}};
for(const file of ['atlas-data.js','artists-data.js'])vm.runInNewContext(readFileSync(file,'utf8'),context);
const html=readFileSync('index.html','utf8');
const initialization=html.split('\n').find(s=>s.startsWith('const DATA=window.YUZ_DATA,'));
vm.runInNewContext(initialization+'\nglobalThis.visible={nodes:N,links:E};',context);
const visible=context.visible,artists=context.window.YUZ_ARTISTS;
for(const n of visible.nodes)assert(artists.some(a=>a.genres.includes(n.id)),n.id+' lacks direct content');
assert(!visible.nodes.some(n=>n.id==='motorik'),'Motorik must remain unpublished');
assert(visible.nodes.some(n=>n.id==='deep-house'),'Deep house must be available');
const ids=new Set(visible.nodes.map(n=>n.id));
for(const e of visible.links)assert(ids.has(e.source)&&ids.has(e.target));
console.log(`Content eligibility passed: ${visible.nodes.length} populated sounds; no empty endpoints; Deep house available; Motorik unpublished.`);
for(const n of visible.nodes){
 const featured=n.featuredArtists||[];
 assert(new Set(featured).size===featured.length,n.id+' repeats a featured artist');
 for(const id of featured)assert(artists.some(a=>a.id===id&&a.genres.includes(n.id)),n.id+' features an artist without a direct association: '+id);
}
for(const id of ['idm','soundscape','uk-hip-hop']){
 const n=visible.nodes.find(n=>n.id===id);
 assert(n&&n.featuredArtists?.length===5,id+' needs five representative featured artists');
}
assert(!artists.find(a=>a.id==='burial').genres.includes('soundscape'),'Burial must not be a Soundscape representative');
console.log('Featured selections passed: five direct artists for each priority sound.');

assert(!visible.nodes.some(n=>n.id==='isolationism'),'Unpopulated Isolationism must remain unpublished');
