/* ---- GAME ---- */
const RM=matchMedia('(prefers-reduced-motion: reduce)').matches;
const stage=document.getElementById('stage');
const HAND_BY_ID=Object.fromEntries(HANDS.map(h=>[h.id,h]));
const FOUND_KEY='unopened-letter-found';
let found=new Set();
try{found=new Set(JSON.parse(localStorage.getItem(FOUND_KEY)||'[]'));}catch(e){}
const saveFound=()=>{try{localStorage.setItem(FOUND_KEY,JSON.stringify([...found]));}catch(e){}};
let cur=null;

const smart=s=>s.replace(/(^|[\s(])"/g,'$1“').replace(/"/g,'”').replace(/'/g,'’');
const fmt=t=>smart(t).replace(/_(.+?)_/g,'<em>$1</em>').replace(/\{(\w+)\|(.+?)\}/g,'<span class="c-$1">$2</span>');
const parse=text=>text.trim().split(/\n\s*\n/).map(s=>s.split('\n').map(l=>l.trim()).filter(Boolean));

/* Line prefixes: ">" steps a line in (repeat for more), "~" marks another voice. */
function lineHTML(raw,d){
  let t=raw,cls='l',ind=0;
  if(t[0]==='~'){cls+=' other';t=t.slice(1);}
  const m=t.match(/^>+/);
  if(m){ind=m[0].length;t=t.slice(m[0].length);}
  return `<span class="${cls}" style="--d:${d}s;--in:${ind}">${fmt(t)}</span>`;
}
function sheetHTML({title,tag,text,accent,skin}){
  let n=0;
  const body=parse(text).map(st=>`<div class="stanza">${st.map(t=>lineHTML(t,(0.5+(n++)*0.11).toFixed(2))).join('')}</div>`).join('');
  return `<article class="sheet skin-${skin}" style="--accent:${accent};--reveal:${(0.5+n*0.11).toFixed(1)}s"><header class="sheet-head"><h2>${title}</h2><span class="tag">${tag}</span></header><div class="verse">${body}</div>${DECO[skin]||''}</article>`;
}
function go(html,scroll=true){
  stage.innerHTML=html;
  if(scroll)stage.scrollIntoView({behavior:RM?'auto':'smooth',block:'start'});
}

function renderAnte(scroll){
  Snd.tune('open');
  go(`<p class="eyebrow">Every reader starts here</p>
  <div style="height:14px"></div>
  ${sheetHTML({title:OPENING.title,tag:'For every reader',text:OPENING.text,accent:'#f0b45a',skin:OPENING.skin})}
  <div class="actions"><button class="btn primary" data-act="deal">Deal the cards</button></div>`,scroll);
}

function cardName(c){return `${RANK_NAME[c.r]} of ${SUIT_NAMES[c.s]}`;}
function faceHTML(c){
  const red=c.s===1||c.s===2,r=RANK_LABEL[c.r],su=SUITS[c.s]+'︎';
  return `<span class="face front${red?' red':''}"><span class="corner tl"><span>${r}</span><span class="suit">${su}</span></span><span class="pip suit">${su}</span><span class="corner br"><span>${r}</span><span class="suit">${su}</span></span></span>`;
}

function deal(){
  Snd.tune('deal');Snd.sfx('deal');
  const id=pickId();
  cur={id,cards:build(id),up:new Set()};
  go(`<p class="eyebrow">Your hand</p>
  <h2 class="step-title" id="dealtitle">Turn your cards over</h2>
  <div class="hand">${cur.cards.map((c,i)=>`<button class="card" style="--i:${i}" data-act="flip" data-i="${i}" aria-label="Card ${i+1}, face down. Turn it over."><span class="flip"><span class="face back"></span>${faceHTML(c)}</span></button>`).join('')}</div>
  <div class="turnrow" id="turnrow"><p class="count" id="count" aria-live="polite">0 of 5 turned</p><button class="btn ghost" data-act="turnall">Turn them all</button></div>
  <div id="reveal"></div>`);
}
function flipCard(i){
  if(!cur||cur.up.has(i))return;
  cur.up.add(i);
  Snd.sfx('flip',cur.up.size-1);
  const el=stage.querySelector(`.card[data-i="${i}"]`);
  if(!el)return;
  el.classList.add('up');
  el.removeAttribute('data-act');
  el.setAttribute('aria-label',cardName(cur.cards[i]));
  const c=document.getElementById('count');
  if(c)c.textContent=`${cur.up.size} of 5 turned`;
  if(cur.up.size===5)setTimeout(showStamp,RM?0:900);
}
function turnAll(){
  [0,1,2,3,4].forEach((i,k)=>setTimeout(()=>flipCard(i),RM?0:k*150));
}
function splitName(name){
  const w=name.split(' ');
  if(w.length===1)return [name];
  let best=null;
  for(let i=1;i<w.length;i++){
    const a=w.slice(0,i).join(' '),b=w.slice(i).join(' '),m=Math.max(a.length,b.length);
    if(!best||m<best.m)best={a,b,m};
  }
  return [best.a,best.b];
}
function stampSVG(name){
  const ls=splitName(name);
  const text=ls.length===1
    ?`<text x="100" y="108" class="hn" style="font-size:26px">${ls[0]}</text>`
    :`<text x="100" y="97" class="hn">${ls[0]}</text><text x="100" y="124" class="hn">${ls[1]}</text>`;
  const waves=[76,100,124].map(y=>`<path class="wave" d="M205 ${y} q10 -10 20 0 t20 0 t20 0 t20 0 t20 0 t20 0"/>`).join('');
  return `<svg class="stamp-svg" viewBox="0 0 340 200" role="img" aria-label="Postmark: ${name}"><defs><path id="pm-arc" d="M100 100 m-78 0 a78 78 0 1 1 156 0 a78 78 0 1 1 -156 0"/></defs><circle class="sr" cx="100" cy="100" r="92"/><circle class="sr" cx="100" cy="100" r="64"/><text class="arc"><textPath href="#pm-arc" textLength="480" lengthAdjust="spacing">NIGHT POST · THE UNOPENED LETTER · NIGHT POST · TEA GONE COLD · </textPath></text>${text}${waves}</svg>`;
}
function showStamp(){
  if(!cur)return;
  Snd.sfx('stamp');
  const h=HAND_BY_ID[cur.id];
  document.getElementById('turnrow').hidden=true;
  document.getElementById('dealtitle').textContent='Postmarked';
  document.getElementById('reveal').innerHTML=`<div class="postmark">${stampSVG(h.name)}<div class="postside"><div><p class="eyebrow">You drew</p><p class="vname">${h.name}</p><p class="odds">${h.w} in 100 deals</p></div><button class="seal" data-act="seal" aria-label="Break the seal and read the poem">Break<br>the seal</button></div></div>`;
}
function breakSeal(btn){
  Snd.sfx('seal');
  btn.classList.add('broken');
  const id=cur.id;
  setTimeout(()=>showPoem(id),RM?0:520);
}

function showPoem(id){
  Snd.tune(id);
  const p=POEMS[id],h=HAND_BY_ID[id];
  const isNew=!found.has(id);
  found.add(id);saveFound();
  const sd=found.size>=UNLOCK_AT?`<button class="btn ghost" data-act="showdown">Read After the Deal</button>`:'';
  const note=isNew&&found.size===UNLOCK_AT?`<p class="note">That makes ${UNLOCK_AT} different hands. After the Deal is open.</p>`:'';
  go(`<div class="vig-wrap" style="--accent:${p.accent}">${ART[id]()}</div>
  ${sheetHTML({title:h.name,tag:'Your hand',text:p.text,accent:p.accent,skin:p.skin})}
  ${note}<div class="actions"><button class="btn primary" data-act="deal">Deal again</button>${sd}</div>`);
  renderLedger();
}
function showShared(which){
  const poem=which==='ante'?OPENING:CLOSING;
  if(which==='ante'){renderAnte();return;}
  Snd.tune('close');
  go(`<div class="vig-wrap">${ART.mast()}</div>
  ${sheetHTML({title:poem.title,tag:'For every reader',text:poem.text,accent:'#f0b45a',skin:poem.skin})}
  <div class="actions"><button class="btn primary" data-act="deal">Deal again</button></div>`);
}

function renderLedger(){
  document.getElementById('tally').textContent=`${found.size} of ${HANDS.length}`;
  document.getElementById('tiles').innerHTML=HANDS.map(h=>found.has(h.id)
    ?`<li><button class="tile found" data-act="read" data-id="${h.id}"><span class="t-name">${h.name}</span><span class="t-odds">Read again</span></button></li>`
    :`<li><div class="tile"><span class="t-name">${h.name}</span><span class="t-odds">${h.w} in 100 deals</span></div></li>`).join('');
  document.getElementById('showdown').innerHTML=found.size>=UNLOCK_AT
    ?`<button class="btn primary" data-act="showdown">Read After the Deal</button><button class="btn ghost" data-act="ante">Read Poker with Poems again</button>`
    :`<p>After the Deal opens once you have read ${UNLOCK_AT} different hands. You have read ${found.size}.</p><button class="btn ghost" data-act="ante">Read Poker with Poems again</button>`;
}

document.addEventListener('click',e=>{
  const b=e.target.closest('[data-act]');
  if(!b)return;
  const a=b.dataset.act;
  if(a==='deal')deal();
  else if(a==='flip')flipCard(+b.dataset.i);
  else if(a==='turnall')turnAll();
  else if(a==='seal')breakSeal(b);
  else if(a==='read')showPoem(b.dataset.id);
  else if(a==='showdown')showShared('showdown');
  else if(a==='ante')showShared('ante');
  else if(a==='snd')Snd.toggle();
});

document.getElementById('mast-art').innerHTML=ART.mast();
renderAnte(false);
renderLedger();
Snd.ui();
