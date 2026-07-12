// patch_webp.js — заменяет пути изображений на WebP в app.js
const fs   = require('fs');
const path = require('path');

const APP_FILE  = path.join(__dirname, 'app.js');
const WEBP_DIR  = path.join(__dirname, 'images', 'webp');

let content = fs.readFileSync(APP_FILE, 'utf8');
const before = content.length;

// Заменяем images/FileName.ext -> images/webp/FileName.webp
// Обрабатываем PNG и JPG/JPEG
let count = 0;
content = content.replace(/images\/([^"'`\s]+)\.(png|jpg|jpeg)/gi, (match, name, ext) => {
  const webpName = name + '.webp';
  const webpPath = path.join(WEBP_DIR, webpName);
  if (fs.existsSync(webpPath)) {
    count++;
    return `images/webp/${name}.webp`;
  }
  // Если файла нет, оставляем оригинал
  console.warn(`  ⚠️  WebP не найден для: ${match}`);
  return match;
});

fs.writeFileSync(APP_FILE, content, 'utf8');
console.log(`✅ Обновлено ${count} путей изображений в app.js → WebP`);
