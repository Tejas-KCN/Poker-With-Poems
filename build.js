#!/usr/bin/env node
// Builds the single-file game from src/.
//   node build.js            -> index.html   (what GitHub Pages serves)
//   node build.js --preview  -> preview.html (every hand already found, for proofreading; not committed)
const fs = require('fs');
const path = require('path');

const read = f => fs.readFileSync(path.join(__dirname, 'src', f), 'utf8');
const preview = process.argv.includes('--preview');

let app = read('app.js');
let head = read('head.html');
if (preview) {
  const a = app.indexOf('let found=new Set();');
  const b = app.indexOf('let cur=null;');
  if (a < 0 || b < 0) throw new Error('Could not find the "found hands" block in src/app.js');
  app = app.slice(0, a) +
    'const found=new Set(HANDS.map(h=>h.id)); /* preview: every hand already drawn */\nconst saveFound=()=>{};\n' +
    app.slice(b);
  head = head.replace('<title>The Unopened Letter</title>', '<title>Unopened Letter Preview</title>');
}

const html =
  head + '<style>\n' + read('style.css') + '</style>\n' + read('body.html') +
  '<script>\n' + read('logic.js') + read('poems.js') + read('art.js') + read('sound.js') + app + '</script>\n';

const out = preview ? 'preview.html' : 'index.html';
fs.writeFileSync(path.join(__dirname, out), html);
console.log(`Wrote ${out} (${(html.length / 1024).toFixed(1)} KB)`);
