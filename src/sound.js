/* ---- SOUND: generated live in the browser, no audio files. One short generative tune per hand. ---- */
const mtof=m=>440*Math.pow(2,(m-69)/12);
const PENT_MIN=[0,3,5,7,10],PENT_MAJ=[0,2,4,7,9],MINOR=[0,2,3,5,7,8,10],MAJOR=[0,2,4,5,7,9,11];
const deg=(root,sc,d)=>{const n=sc.length;return root+12*Math.floor(d/n)+sc[((d%n)+n)%n];};
const RND=Math.random;
const WALK=[0,1,2,3,4,5,6,7,6,5,4,3,2,1];

/* each tune: pad chord (midi), step length in seconds, and play(step, time, voices) */
const TUNES={
deal:{pad:[38,45,50,57],step:1.1,play(i,t,a){
  if(i%3===0)a.glass(deg(74,PENT_MIN,[0,2,1,3][(i/3|0)%4]),t,.10,.3);
  if(i%4===2)a.bell(86,t,.07,-.4);}},
open:{pad:[38,45,50,53,57],step:1.6,play(i,t,a){
  if(RND()<.65)a.bell(deg(74,PENT_MIN,Math.floor(RND()*7)-1),t,.14,RND()*1.2-.6);}},
close:{pad:[38,45,50,54,57,64],step:1.9,play(i,t,a){
  const P=[4,2,0,2,3,1,0,-1];a.bell(deg(74,PENT_MAJ,P[i%8]),t,.16,0);
  if(i%8===0)a.bell(62,t,.12,0);}},
royal:{pad:[38,45,50,54,57,62],step:.21,play(i,t,a){
  a.glass(deg(74,PENT_MAJ,WALK[i%14]),t,.09,Math.sin(i)*.6);
  if(i%14===0)a.bell(86,t,.12,0);}},
straightflush:{pad:[43,50,55,58,62],step:.5,play(i,t,a){
  const k=i%7,ph=Math.floor(i/7)%4;
  if(k<5)a.pluck(deg(62,MINOR,k+ph),t,.16,-.3+.15*k);
  else if(k===5)a.bell(deg(50,MINOR,ph),t,.12,0);}},
four:{pad:[36,43,48,52,55],step:.6,play(i,t,a){
  a.pluck(deg(72,MAJOR,[0,2,4,2][i%4]),t,.12,(i%4-1.5)*.2);
  if(i%16===0)a.bell(48,t,.14,0);}},
fullhouse:{pad:[41,48,53,57,60],step:.45,play(i,t,a){
  const c=i%5;
  if(c<3)a.pluck(deg(65,MAJOR,[0,2,4][c]),t,.13,-.4+.1*c);
  else a.pluck(deg(65,MAJOR,[2,4][c-3]),t,.11,.4);
  if(c===0)a.pluck(deg(53,MAJOR,0),t,.14,0);}},
flush:{pad:[40,47,52,55,59],step:.75,play(i,t,a){
  const d=[4,2,3,1,2,0,null,null][i%8];
  if(d!==null){a.pluck(deg(69,PENT_MIN,d),t,.14,-.5);a.glass(deg(57,PENT_MIN,d),t+.38,.09,.5);}}},
straight:{pad:[45,52,57,60,64],step:.8,play(i,t,a){
  a.bell(deg(69,MINOR,WALK[i%14]),t,.13,0);}},
three:{pad:[36,43,48,51,55],step:.42,play(i,t,a){
  const c=i%3,bar=Math.floor(i/3)%4,r=[0,5,3,4][bar];
  if(c===0)a.pluck(deg(48,MINOR,r),t,.18,0);
  else{a.pluck(deg(60,MINOR,r),t,.08,-.3);a.pluck(deg(60,MINOR,r+2),t,.08,.3);}
  if(i%12===6)a.bell(deg(76,MINOR,r+4),t,.12,0);}},
twopair:{pad:[38,45,50,53,57],step:.55,play(i,t,a){
  const d=[4,4,2,2,null,3,3,1,null,null][i%10];
  if(d!==null)a.pluck(deg(74,PENT_MIN,d),t,.13,i%2?.3:-.3);}},
pair:{pad:[43,50,55,59,62],step:.9,play(i,t,a){
  const b=[0,1,2,1][i%4];
  a.glass(deg(67,MAJOR,b),t,.10,-.35);a.glass(deg(67,MAJOR,b+2),t+.12,.10,.35);}},
high:{pad:[38,45],step:2.6,play(i,t,a){
  if(RND()<.4)a.bell(deg(81,PENT_MIN,Math.floor(RND()*4)),t,.12,RND()-.5);
  else if(i%5===0)a.bell(50,t,.14,0);}}
};

function createEngine(ctx){
  const master=ctx.createGain();master.gain.value=1.2;
  const comp=ctx.createDynamicsCompressor();comp.threshold.value=-18;comp.ratio.value=3;
  master.connect(comp);comp.connect(ctx.destination);
  const dryBus=ctx.createGain();dryBus.connect(master);
  const rev=ctx.createConvolver();
  const n=Math.floor(ctx.sampleRate*2.8),ir=ctx.createBuffer(2,n,ctx.sampleRate);
  for(let c=0;c<2;c++){const d=ir.getChannelData(c);for(let i=0;i<n;i++)d[i]=(RND()*2-1)*Math.pow(1-i/n,2.4);}
  rev.buffer=ir;
  const revGain=ctx.createGain();revGain.gain.value=.55;rev.connect(revGain);revGain.connect(master);
  const mel=ctx.createGain();mel.connect(dryBus);
  const send=ctx.createGain();send.gain.value=.7;mel.connect(send);send.connect(rev);
  const padBus=ctx.createGain();padBus.gain.value=.5;padBus.connect(dryBus);
  const psend=ctx.createGain();psend.gain.value=.6;padBus.connect(psend);psend.connect(rev);
  const nb=ctx.createBuffer(1,ctx.sampleRate,ctx.sampleRate),nd=nb.getChannelData(0);
  for(let i=0;i<nd.length;i++)nd[i]=RND()*2-1;

  const env=(g,t,a,peak,dec)=>{g.gain.setValueAtTime(.0001,t);g.gain.exponentialRampToValueAtTime(Math.max(peak,.0002),t+a);g.gain.exponentialRampToValueAtTime(.0001,t+a+dec);};
  const osc=(type,f,t,dur,dest)=>{const o=ctx.createOscillator();o.type=type;o.frequency.value=f;o.connect(dest);o.start(t);o.stop(t+dur);return o;};
  function voice(t,pan){const g=ctx.createGain(),p=ctx.createStereoPanner();p.pan.value=Math.max(-1,Math.min(1,pan||0));g.connect(p);p.connect(mel);return g;}
  const V={
    bell(m,t,v,pan){const g=voice(t,pan),f=mtof(m);
      [[1,1,2.6],[2.76,.4,1.5],[5.4,.18,.8]].forEach(([r,a,d])=>{const pg=ctx.createGain();env(pg,t,.004,v*a,d);pg.connect(g);osc('sine',f*r,t,d+.2,pg);});},
    pluck(m,t,v,pan){const g=voice(t,pan),lp=ctx.createBiquadFilter();lp.type='lowpass';
      lp.frequency.setValueAtTime(3200,t);lp.frequency.exponentialRampToValueAtTime(500,t+.35);
      lp.connect(g);const pg=ctx.createGain();env(pg,t,.005,v,.8);pg.connect(lp);osc('triangle',mtof(m),t,1,pg);},
    glass(m,t,v,pan){const g=voice(t,pan),f=mtof(m),pg=ctx.createGain();env(pg,t,.08,v,2.2);pg.connect(g);
      osc('sine',f,t,2.5,pg);osc('sine',f*2.002,t,2.5,pg);}
  };

  let pad=null,timer=null,T=null,step=0,nextT=0,curId=null;
  function makePad(notes){
    const g=ctx.createGain(),lp=ctx.createBiquadFilter(),now=ctx.currentTime;
    lp.type='lowpass';lp.frequency.value=900;g.connect(lp);lp.connect(padBus);
    g.gain.setValueAtTime(.0001,now);g.gain.exponentialRampToValueAtTime(.55,now+3);
    const oscs=[];
    notes.forEach(m=>[-6,6].forEach(c=>{const o=ctx.createOscillator(),og=ctx.createGain();
      o.type='triangle';o.frequency.value=mtof(m);o.detune.value=c;og.gain.value=.9/(notes.length*2);
      o.connect(og);og.connect(g);o.start(now);oscs.push(o);}));
    return {stop(){const t=ctx.currentTime;g.gain.cancelScheduledValues(t);g.gain.setValueAtTime(Math.max(g.gain.value,.0002),t);
      g.gain.exponentialRampToValueAtTime(.0001,t+2.2);oscs.forEach(o=>o.stop(t+2.4));}};
  }
  function tick(){
    if(!T)return;
    const now=ctx.currentTime;
    if(nextT<now)nextT=now+.05;
    while(nextT<now+.35){T.play(step,nextT,V);step++;nextT+=T.step;}
  }
  function swish(t,v){const s=ctx.createBufferSource(),f=ctx.createBiquadFilter(),g=ctx.createGain();
    s.buffer=nb;f.type='bandpass';f.frequency.value=3000;f.Q.value=.8;s.connect(f);f.connect(g);g.connect(dryBus);
    g.gain.setValueAtTime(.0001,t);g.gain.exponentialRampToValueAtTime(v,t+.06);g.gain.exponentialRampToValueAtTime(.0001,t+.22);s.start(t);s.stop(t+.3);}
  function boom(t,v){const g=ctx.createGain(),o=ctx.createOscillator();o.type='sine';
    o.frequency.setValueAtTime(110,t);o.frequency.exponentialRampToValueAtTime(42,t+.5);
    g.gain.setValueAtTime(.0001,t);g.gain.exponentialRampToValueAtTime(v,t+.01);g.gain.exponentialRampToValueAtTime(.0001,t+1.4);
    o.connect(g);g.connect(dryBus);g.connect(send);o.start(t);o.stop(t+1.5);}
  function crackle(t,v){for(let k=0;k<14;k++){const tt=t+RND()*.7,s=ctx.createBufferSource(),f=ctx.createBiquadFilter(),g=ctx.createGain();
    s.buffer=nb;f.type='highpass';f.frequency.value=2500;s.connect(f);f.connect(g);g.connect(dryBus);
    g.gain.setValueAtTime(v*RND(),tt);g.gain.exponentialRampToValueAtTime(.0001,tt+.03);s.start(tt);s.stop(tt+.05);}}

  return {
    ctx,
    tune(id){
      if(id===curId||!TUNES[id])return;
      curId=id;if(pad)pad.stop();T=TUNES[id];pad=makePad(T.pad);step=0;nextT=ctx.currentTime+.6;
      if(!timer)timer=setInterval(tick,100);
      master.gain.cancelScheduledValues(ctx.currentTime);master.gain.setTargetAtTime(1.2,ctx.currentTime,.3);
    },
    mute(){if(pad){pad.stop();pad=null;}curId=null;T=null;if(timer){clearInterval(timer);timer=null;}},
    sfx(name,k=0){
      const t=ctx.currentTime+.01;
      if(name==='deal')swish(t,.25);
      else if(name==='flip'){V.glass(deg(74,PENT_MIN,k),t,.2,-.5+.25*k);swish(t,.12);}
      else if(name==='stamp'){boom(t,.55);[50,57,62].forEach(m=>V.bell(m,t,.3,0));}
      else if(name==='seal'){crackle(t,.35);[62,69,74,81].forEach((m,i)=>V.glass(m,t+i*.05,.16,0));}
    },
    fill(id,secs){T=TUNES[id];pad=makePad(T.pad);let t=.1,i=0;while(t<secs){T.play(i,t,V);i++;t+=T.step;}}
  };
}

const Snd=(()=>{
  const KEY='unopened-letter-sound';
  let eng=null,want=true,pending='open';
  try{want=localStorage.getItem(KEY)!=='off';}catch(e){}
  function ui(){
    const b=document.getElementById('snd');
    if(!b||!b.querySelector)return;
    const s=!want?'off':(eng?'on':'idle'),sp=b.querySelector('span');
    b.dataset.state=s;b.setAttribute('aria-pressed',String(s==='on'));
    if(sp)sp.textContent=s==='on'?'Sound on':s==='off'?'Sound off':'Tap for sound';
  }
  function ensure(){
    if(eng)return;
    const AC=globalThis.AudioContext||globalThis.webkitAudioContext;
    if(!AC)return;
    try{eng=createEngine(new AC());}catch(e){eng=null;}
  }
  const api={
    unlock(){if(!want)return;ensure();if(eng){eng.ctx.resume();eng.tune(pending);}ui();},
    toggle(){
      if(want&&!eng){api.unlock();return;}
      want=!want;try{localStorage.setItem(KEY,want?'on':'off');}catch(e){}
      if(want){ensure();if(eng){eng.ctx.resume();eng.tune(pending);}}else if(eng)eng.mute();
      ui();
    },
    tune(id){pending=id;if(eng&&want)eng.tune(id);},
    sfx(n,k){if(eng&&want)eng.sfx(n,k);},
    ui,
    preview(id,secs){
      const off=new OfflineAudioContext(2,Math.floor(44100*secs),44100),e=createEngine(off);
      e.fill(id,secs);
      return off.startRendering().then(buf=>{
        let peak=0,sum=0,n=0;
        for(let c=0;c<2;c++){const d=buf.getChannelData(c);for(let i=0;i<d.length;i++){const a=Math.abs(d[i]);if(a>peak)peak=a;sum+=d[i]*d[i];n++;}}
        return {peak:+peak.toFixed(3),rms:+Math.sqrt(sum/n).toFixed(4)};
      });
    }
  };
  document.addEventListener('visibilitychange',()=>{if(!eng)return;if(document.hidden)eng.ctx.suspend();else if(want)eng.ctx.resume();});
  document.addEventListener('click',e=>{if(e.target&&e.target.closest&&e.target.closest('#snd'))return;api.unlock();});
  return api;
})();
