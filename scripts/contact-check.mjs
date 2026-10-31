import assert from 'node:assert/strict';
import handler from '../api/contact.mjs';
import {createHmac} from 'node:crypto';
process.env.RESEND_API_KEY='test-only-key';
const payload=(Date.now()-5000)+'.test';const token=payload+'.'+createHmac('sha256',process.env.RESEND_API_KEY).update(payload).digest('hex');
let sent=0;global.fetch=async(url,options)=>{sent++;const b=JSON.parse(options.body);assert.equal(b.to[0],'yuz@fasterthanreality.com');assert.equal(b.reply_to,'listener@example.com');return {ok:true};};
async function call(body,origin='https://www.yuz.media'){let status,data;await handler({method:'POST',headers:{origin,'content-type':'application/json','x-forwarded-for':'test'},body},{setHeader(){},status(n){status=n;return this;},json(b){data=b;}});return {status,data};}
const valid={token,name:'Listener',email:'listener@example.com',message:'Test enquiry for YUZ.'};
assert.equal((await call(valid,'https://example.com')).status,403);
assert.equal((await call({...valid,email:'invalid'})).status,400);
assert.equal((await call({...valid,token:'forged'})).status,400);
assert.equal((await call({...valid,website:'spam'})).status,400);
assert.equal(sent,0);
assert.equal((await call(valid)).status,200);
assert.equal(sent,1);
global.fetch=async()=>({ok:false});assert.equal((await call(valid)).status,502);
console.log('Contact checks passed: origin, input, signed token, honeypot, delivery payload, failure reporting.');
