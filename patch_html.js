const fs   = require('fs');
const path = require('path');

let html = fs.readFileSync('index.html', 'utf8');
html = html.replace(/images\/([^"'\`\s]+)\.(png|jpg|jpeg)/gi, (m, name) => {
  const webp = path.join(__dirname, 'images', 'webp', name + '.webp');
  return fs.existsSync(webp) ? `images/webp/${name}.webp` : m;
});
fs.writeFileSync('index.html', html);
console.log('index.html updated');
