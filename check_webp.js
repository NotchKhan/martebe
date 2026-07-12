const fs = require('fs');
const path = require('path');
const code = fs.readFileSync('app.js', 'utf8');

const refs = [];
const re = /images\/webp\/([^'"]+\.webp)/g;
let m;
while ((m = re.exec(code)) !== null) {
  if (!refs.includes(m[1])) refs.push(m[1]);
}

let missing = 0, found = 0;
refs.forEach(function(name) {
  const p = path.join('images', 'webp', name);
  if (fs.existsSync(p)) {
    found++;
  } else {
    missing++;
    console.log('MISSING:', name);
  }
});

console.log('Found: ' + found + ' / ' + refs.length + ' WebP files referenced in code');
console.log('Missing: ' + missing);
