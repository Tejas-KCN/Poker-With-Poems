// Checks the card dealing and hand detection, and that every hand has a poem.
// Run with: node tests/hands.test.js
const fs = require('fs');
const path = require('path');
const read = f => fs.readFileSync(path.join(__dirname, '..', 'src', f), 'utf8');

const logic = read('logic.js').split('/*LOGIC*/')[1].split('/*ENDLOGIC*/')[0];
const poems = read('poems.js');
const L = new Function(logic + poems + ';return {HANDS,evaluate,build,pickId,POEMS,OPENING,CLOSING};')();

let failures = 0;
const fail = msg => { failures++; console.error('FAIL: ' + msg); };

for (const h of L.HANDS) {
  for (let i = 0; i < 3000; i++) {
    const cards = L.build(h.id);
    const unique = new Set(cards.map(c => c.r + '-' + c.s));
    if (cards.length !== 5 || unique.size !== 5) { fail(`${h.id}: bad deal`); break; }
    if (L.evaluate(cards) !== h.id) { fail(`${h.id}: evaluated as ${L.evaluate(cards)}`); break; }
  }
  const p = L.POEMS[h.id];
  if (!p || !p.text || !p.text.trim()) fail(`${h.id}: missing poem`);
  if (p && !p.skin) fail(`${h.id}: missing skin`);
}
if (L.HANDS.reduce((s, h) => s + h.w, 0) !== 100) fail('hand weights must add up to 100');
if (/\[ The (opening|closing) poem goes here\. \]/.test(poems)) fail('shared poem still has placeholder text');
if (!L.OPENING.text.trim() || !L.CLOSING.text.trim()) fail('missing shared poem');

if (failures) { console.error(`${failures} problem(s)`); process.exit(1); }
console.log(`OK: ${L.HANDS.length} hands deal and evaluate correctly, 12 poems present.`);
