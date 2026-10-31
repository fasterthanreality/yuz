import {createHmac,randomBytes,timingSafeEqual} from 'node:crypto';
const buckets=new Map();
const origins=new Set(['https://yuz.media','https://www.yuz.media']);
const sign=(s)=>createHmac('sha256',process.env.RESEND_API_KEY).update(s).digest('hex');
export default async function handler(req,res){
 res.setHeader('Cache-Control','no-store');
 const reply=(code,error)=>res.status(code).json(error?{error}:{ok:true});
 if(!process.env.RESEND_API_KEY)return reply(503,'Contact is temporarily unavailable. Please email yuz@fasterthanreality.com.');
 if(req.method==='GET'){const payload=Date.now()+'.'+randomBytes(16).toString('hex');return res.status(200).json({token:payload+'.'+sign(payload)});}
 if(req.method!=='POST'){res.setHeader('Allow','GET, POST');return reply(405,'Method not allowed.');}
 const origin=req.headers.origin;
 if(!origin||!origins.has(origin))return reply(403,'Please send your message from yuz.media.');
 if(!String(req.headers['content-type']||'').startsWith('application/json'))return reply(415,'Expected a form message.');
 let b=req.body;try{if(typeof b==='string')b=JSON.parse(b);}catch{return reply(400,'Please check your message.');}
 if(!b||typeof b!=='object'||Buffer.byteLength(JSON.stringify(b))>12000)return reply(400,'Your message is too long.');
 if(b.website)return reply(400,'Unable to send this message.');
 const parts=String(b.token||'').split('.');const payload=parts.slice(0,2).join('.');
 if(parts.length!==3||!/^[a-f0-9]{64}$/.test(parts[2])||!timingSafeEqual(Buffer.from(parts[2]),Buffer.from(sign(payload))))return reply(400,'Please reload the page and try again.');
 const age=Date.now()-Number(parts[0]);if(!Number.isFinite(age)||age<2000||age>1200000)return reply(400,'Please wait a moment, or reload the page if it has been open a while.');
 const name=typeof b.name==='string'?b.name.trim():'';const email=typeof b.email==='string'?b.email.trim():'';const message=typeof b.message==='string'?b.message.trim():'';
 if(!name||name.length>100||email.length>254||!/^\S+@[^\s@]+\.[^\s@]+$/.test(email)||/[\r\n]/.test(email)||message.length<10||message.length>4000)return reply(400,'Please check your name, email and message (10–4,000 characters).');
 const ip=String(req.headers['x-forwarded-for']||'unknown').split(',')[0];const now=Date.now();for(const [k,v] of buckets)if(v.until<now)buckets.delete(k);
 const key=sign(ip);let bucket=buckets.get(key)||{count:0,until:now+600000};if(bucket.count>=3)return reply(429,'Please wait a few minutes before sending another message.');bucket.count++;buckets.set(key,bucket);
 try{const r=await fetch('https://api.resend.com/emails',{method:'POST',headers:{Authorization:'Bearer '+process.env.RESEND_API_KEY,'Content-Type':'application/json','Idempotency-Key':sign(b.token)},body:JSON.stringify({from:'YUZ Contact <hello@contact.yuz.media>',to:['yuz@fasterthanreality.com'],reply_to:email,subject:'YUZ website enquiry',text:`From: ${name}\nReply email: ${email}\n\n${message}`}),signal:AbortSignal.timeout(12000)});if(!r.ok)return reply(502,'Your message could not be sent. Please try later or email yuz@fasterthanreality.com.');return reply(200);}catch{return reply(502,'Your message could not be sent. Please try later or email yuz@fasterthanreality.com.');}
}
