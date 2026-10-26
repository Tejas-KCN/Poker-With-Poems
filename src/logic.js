/*LOGIC*/
const SUITS=['♠','♥','♦','♣'];
const SUIT_NAMES=['Spades','Hearts','Diamonds','Clubs'];
const RANK_LABEL={2:'2',3:'3',4:'4',5:'5',6:'6',7:'7',8:'8',9:'9',10:'10',11:'J',12:'Q',13:'K',14:'A'};
const RANK_NAME={2:'Two',3:'Three',4:'Four',5:'Five',6:'Six',7:'Seven',8:'Eight',9:'Nine',10:'Ten',11:'Jack',12:'Queen',13:'King',14:'Ace'};
/* w = chance in 100 deals. Weighted so the rare hands turn up; a fair deck would almost never deal a royal flush. */
const HANDS=[
  {id:'royal',name:'Royal Flush',w:2},
  {id:'straightflush',name:'Straight Flush',w:4},
  {id:'four',name:'Four of a Kind',w:5},
  {id:'fullhouse',name:'Full House',w:7},
  {id:'flush',name:'Flush',w:8},
  {id:'straight',name:'Straight',w:9},
  {id:'three',name:'Three of a Kind',w:11},
  {id:'twopair',name:'Two Pair',w:14},
  {id:'pair',name:'One Pair',w:20},
  {id:'high',name:'High Card',w:20}
];
const rnd=n=>Math.floor(Math.random()*n);
function shuffle(a){for(let i=a.length-1;i>0;i--){const j=rnd(i+1);[a[i],a[j]]=[a[j],a[i]];}return a;}
const ALL_RANKS=[2,3,4,5,6,7,8,9,10,11,12,13,14];
const sample=(arr,n)=>shuffle(arr.slice()).slice(0,n);
const suitsFor=k=>sample([0,1,2,3],k);
const seq=start=>[0,1,2,3,4].map(i=>{const r=start+i;return r===1?14:r;});

function evaluate(cards){
  const ranks=cards.map(c=>c.r).sort((a,b)=>a-b);
  const flush=cards.every(c=>c.s===cards[0].s);
  const uniq=new Set(ranks);
  let straight=false,high=ranks[4];
  if(uniq.size===5){
    if(ranks[4]-ranks[0]===4)straight=true;
    else if(ranks.join()==='2,3,4,5,14'){straight=true;high=5;}
  }
  const counts={};
  ranks.forEach(r=>{counts[r]=(counts[r]||0)+1;});
  const cv=Object.values(counts).sort((a,b)=>b-a).join('');
  if(straight&&flush)return high===14?'royal':'straightflush';
  if(cv==='41')return 'four';
  if(cv==='32')return 'fullhouse';
  if(flush)return 'flush';
  if(straight)return 'straight';
  if(cv==='311')return 'three';
  if(cv==='221')return 'twopair';
  if(cv==='2111')return 'pair';
  return 'high';
}

function make(id){
  const s=rnd(4);
  switch(id){
    case 'royal':return seq(10).map(r=>({r,s}));
    case 'straightflush':return seq(1+rnd(9)).map(r=>({r,s}));
    case 'four':{const [a,b]=sample(ALL_RANKS,2);return [0,1,2,3].map(x=>({r:a,s:x})).concat([{r:b,s:rnd(4)}]);}
    case 'fullhouse':{const [a,b]=sample(ALL_RANKS,2);return suitsFor(3).map(x=>({r:a,s:x})).concat(suitsFor(2).map(x=>({r:b,s:x})));}
    case 'flush':return sample(ALL_RANKS,5).map(r=>({r,s}));
    case 'straight':return seq(1+rnd(10)).map(r=>({r,s:rnd(4)}));
    case 'three':{const [a,b,c]=sample(ALL_RANKS,3);return suitsFor(3).map(x=>({r:a,s:x})).concat([{r:b,s:rnd(4)},{r:c,s:rnd(4)}]);}
    case 'twopair':{const [a,b,c]=sample(ALL_RANKS,3);return suitsFor(2).map(x=>({r:a,s:x})).concat(suitsFor(2).map(x=>({r:b,s:x})),[{r:c,s:rnd(4)}]);}
    case 'pair':{const [a,b,c,d]=sample(ALL_RANKS,4);return suitsFor(2).map(x=>({r:a,s:x})).concat([b,c,d].map(r=>({r,s:rnd(4)})));}
    default:return sample(ALL_RANKS,5).map(r=>({r,s:rnd(4)}));
  }
}
function build(id){
  for(let t=0;t<500;t++){
    const cards=make(id);
    if(evaluate(cards)===id)return cards.sort((a,b)=>a.r-b.r||a.s-b.s);
  }
  throw new Error('could not build '+id);
}
function pickId(){
  let r=Math.random()*100;
  for(const h of HANDS){r-=h.w;if(r<0)return h.id;}
  return 'high';
}
/*ENDLOGIC*/
