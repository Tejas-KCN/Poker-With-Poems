/* ---- VIGNETTES: small animated line drawings, one per hand ---- */
const at=(x,y,s=1)=>`translate(${x} ${y})${s!==1?` scale(${s})`:''}`;
const g=(t,inner)=>`<g transform="${t}">${inner}</g>`;
const anim=(cls,d,inner)=>`<g class="${cls}" style="animation-delay:${d}s">${inner}</g>`;
const vig=inner=>`<svg class="vig" viewBox="0 0 360 150" aria-hidden="true" focusable="false">${inner}</svg>`;
const T=()=>`<path class="o dim" d="M16 130 H344"/>`;
const lamp=(x,y,cls='')=>g(at(x,y),`<circle class="halo ${cls}" cx="0" cy="-60" r="58"/><path class="o shade" d="M-26 -60 L26 -60 L16 -92 L-16 -92 Z"/><path class="o" d="M0 -60 V-6 M-20 0 H20 M-12 0 C-8 -9 8 -9 12 0"/>`);
const pend=x=>`<circle class="halo" cx="${x}" cy="36" r="48"/>`+g(at(x,0),`<path class="o" d="M0 0 V14"/><path class="o shade" d="M-24 38 L24 38 L14 14 L-14 14 Z"/>`);
const CUP=`<path class="o" d="M-17 -26 H17 V-13 C17 -3 9 0 0 0 C-9 0 -17 -3 -17 -13 Z"/><path class="o" d="M17 -21 C29 -21 29 -8 15 -8"/><path class="o" d="M-26 2 H26"/>`;
const cup=(x,y,s=1,d=null)=>g(at(x,y,s),d===null?CUP:anim('pop',d,CUP));
const steam=(x,y,d=0,s=1)=>g(at(x,y,s),`<path class="steam" style="animation-delay:${d}s" d="M0 0 C-6 -8 6 -14 0 -22 C-6 -30 6 -36 0 -44"/>`);
const env=(x,y,w=60,h=40,sealed=true)=>g(at(x,y),`<rect class="o pf" x="${-w/2}" y="${-h/2}" width="${w}" height="${h}" rx="3"/><path class="o" d="M${-w/2} ${-h/2} L0 ${(h*.12).toFixed(1)} L${w/2} ${-h/2}"/>${sealed?`<circle class="wax" cx="0" cy="${(h*.12).toFixed(1)}" r="6"/>`:''}`);
const sparks=pts=>pts.map(([x,y],i)=>`<circle class="spark" cx="${x}" cy="${y}" r="2.6" style="animation-delay:${(i*.45).toFixed(2)}s"/>`).join('');
const chair=(x,dir)=>`<path class="o" d="M${x} 70 V112 H${x+dir*34} M${x} 112 V138 M${x+dir*34} 112 V138"/>`;
const bundle=(x,col,d)=>g(at(x,128),`<g class="bob" style="animation-delay:${d}s"><rect class="o pf" x="-30" y="-40" width="60" height="40" rx="2" transform="rotate(-3 0 -20)"/><rect class="o pf" x="-30" y="-44" width="60" height="40" rx="2" transform="rotate(2 0 -24)"/><rect class="o pf" x="-30" y="-48" width="60" height="40" rx="2"/><path d="M0 -48 V-8 M-30 -28 H30" stroke="${col}" stroke-width="3" fill="none" stroke-linecap="round"/><circle cx="0" cy="-28" r="5" fill="${col}"/></g>`);

const ART={
mast:()=>vig(T()+lamp(96,130)+env(190,108,72,44)+cup(284,130)+steam(278,98,0)+steam(290,98,1.4)),
royal:()=>vig(T()+lamp(120,130,'blaze')+cup(250,130)+steam(244,98,0)+steam(256,98,1.3)+sparks([[60,38],[170,26],[205,62],[300,44],[34,92],[326,96]])),
straightflush:()=>vig(
  `<path class="o dim" d="M16 130 H262" stroke-dasharray="3 7"/>`
  +[40,92,144,196,248].map((x,i)=>`<ellipse class="foot" cx="${x}" cy="${i%2?126:121}" rx="10" ry="4.5" style="animation-delay:${(i*.55).toFixed(2)}s"/>`).join('')
  +g(at(304,130),`<path class="doorlit" d="M-22 0 V-62 A22 22 0 0 1 22 -62 V0 Z"/><path class="o" d="M-22 0 V-62 A22 22 0 0 1 22 -62 V0"/><circle class="knob" cx="12" cy="-30" r="2.4"/>`)
  +`<circle class="halo" cx="304" cy="48" r="34"/>`),
four:()=>vig(T()
  +`<rect class="o pf" x="110" y="14" width="124" height="116" rx="3"/>`
  +[[66,206],[80,194],[94,202],[108,184]].map(([y,x2],i)=>`<path class="draw" pathLength="1" d="M126 ${y} H${x2}" style="animation-delay:${(.3+i*.55).toFixed(2)}s"/>`).join('')
  +g(at(213,38),anim('press',2.7,`<rect class="o" x="-14" y="-16" width="28" height="32"/><circle class="o" cx="0" cy="0" r="7"/>`))
  +cup(60,130)
  +`<circle class="halo" cx="302" cy="64" r="30"/><path class="o" d="M302 34 V54 M292 54 H312"/><circle class="spark" cx="302" cy="62" r="5"/>`),
fullhouse:()=>{
  const xs=[100,136,172,236,272];
  return vig(`<path class="o dim" d="M50 104 H322"/><path class="o dim" d="M84 104 V140 M288 104 V140"/>`
    +pend(204)
    +xs.map((x,i)=>cup(x,104,.62,i*.3)+steam(x,84,i*.5,.62)).join(''));
},
flush:()=>vig(
  `<path class="o dim" d="M16 122 C120 104 240 104 344 122" stroke-dasharray="3 7"/>`
  +g(at(180,56),`<g class="passA">${env(0,0,60,38)}</g>`)
  +g(at(180,100),`<g class="passB">${env(0,0,60,38)}</g>`)),
straight:()=>vig(
  `<rect class="o pf" x="86" y="8" width="188" height="136" rx="3"/>`
  +[0,1,2,3,4,5,6].map(i=>`<path class="rule" d="M112 ${34+i*16} H${i===6?190:252}" style="animation-delay:${(.2+i).toFixed(2)}s"/>`).join('')
  +`<circle class="walker" cx="100" cy="34" r="5"/>`),
three:()=>vig(`<path class="o dim" d="M30 130 H330"/>`+bundle(90,'#6f9bd8',0)+bundle(180,'#aab0bd',.5)+bundle(270,'#d0594f',1)),
twopair:()=>vig(g(at(180,80),`<g transform="scale(1.45)">`
  +`<g class="hl"><path class="o heart" d="M0 -32 C0 -40 -8 -48 -22 -42 C-50 -30 -40 0 0 30 Z"/></g>`
  +`<g class="hr"><path class="o heart" d="M0 -32 C0 -40 8 -48 22 -42 C50 -30 40 0 0 30 Z"/></g>`
  +`<path class="draw" pathLength="1" d="M-6 -22 H6" style="animation-delay:.5s"/><path class="draw" pathLength="1" d="M-6 -8 H6" style="animation-delay:1.1s"/>`
  +`<path class="loose" d="M-6 6 H6"/><path class="loose" d="M-6 20 H6"/></g>`)),
pair:()=>vig(
  `<path class="o dim" d="M16 138 H344"/><path class="o" d="M116 108 H244 M128 108 V138 M232 108 V138"/>`
  +chair(84,1)+chair(276,-1)+pend(180)
  +cup(146,108,.75)+cup(214,108,.75)+steam(146,86,0,.75)+steam(214,86,1.4,.75)
  +env(180,100,24,16,false)),
high:()=>vig(T()+lamp(64,130,'dimlamp')+env(150,108,72,44)
  +`<path class="moon" d="M300 20 A24 24 0 0 0 300 68 A40 40 0 0 1 300 20 Z"/>`
  +sparks([[240,30],[330,92],[210,64],[268,100],[336,30],[40,40]]))
};

/* ---- DECO: one extra design element per poem, placed inside the sheet ---- */
const dots=(on,off)=>'<span class="dot on"></span>'.repeat(on)+'<span class="dot"></span>'.repeat(off);
const DECO={
open:`<span class="fan" aria-hidden="true">${[-24,-12,0,12,24].map((r,i)=>`<i style="--r:${r}deg;--k:${i}"></i>`).join('')}</span>`,
close:`<svg class="window" viewBox="0 0 84 96" aria-hidden="true"><circle class="halo" cx="42" cy="40" r="34"/><rect class="o pf" x="8" y="6" width="68" height="60" rx="2"/><path class="o" d="M42 6 V66 M8 36 H76"/><path class="o shade" d="M30 62 L54 62 L48 46 L36 46 Z"/><path class="o" d="M4 70 H80 M60 78 V94 M72 78 V94 M60 78 H72 M60 86 H72"/></svg>`,
four:`<i class="cm tl"></i><i class="cm tr"></i><i class="cm bl"></i><i class="cm br"></i><span class="postage" aria-hidden="true">4</span>`,
fullhouse:`<div class="signed" aria-hidden="true">${dots(3,0)}<span class="gap"></span>${dots(2,0)}</div>`,
three:`<span class="rib" style="--c:#2f5fa8;--x:26px" aria-hidden="true"></span><span class="rib" style="--c:#8a90a0;--x:54px" aria-hidden="true"></span><span class="rib" style="--c:#b3322b;--x:82px" aria-hidden="true"></span>`,
pair:`<span class="ring r1" aria-hidden="true"></span><span class="ring r2" aria-hidden="true"></span>`,
high:`<span class="lonecard" aria-hidden="true"><b>A</b><span class="suit">\u2660\uFE0E</span></span><span class="waxseal" aria-hidden="true"></span>`
};
