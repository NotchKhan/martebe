// convert_webp.js — конвертирует все PNG/JPG в images/ в WebP
const sharp = require('sharp');
const fs    = require('fs');
const path  = require('path');

const IMAGES_DIR = path.join(__dirname, 'images');
const WEBP_DIR   = path.join(IMAGES_DIR, 'webp');

if (!fs.existsSync(WEBP_DIR)) fs.mkdirSync(WEBP_DIR, { recursive: true });

const files = fs.readdirSync(IMAGES_DIR).filter(f => /\.(png|jpg|jpeg)$/i.test(f));

let totalOrig = 0, totalNew = 0;

async function convertAll() {
  for (const file of files) {
    const ext     = path.extname(file).toLowerCase();
    const base    = path.basename(file, ext);
    const srcPath = path.join(IMAGES_DIR, file);
    const dstPath = path.join(WEBP_DIR, base + '.webp');

    const stat = fs.statSync(srcPath);
    totalOrig += stat.size;

    try {
      await sharp(srcPath)
        .webp({ quality: 82, effort: 4 })
        .toFile(dstPath);

      const newStat = fs.statSync(dstPath);
      totalNew += newStat.size;

      const saving = ((1 - newStat.size / stat.size) * 100).toFixed(0);
      const origKB = (stat.size / 1024).toFixed(0);
      const newKB  = (newStat.size / 1024).toFixed(0);
      console.log(`✅ ${file.padEnd(40)} ${origKB}KB → ${newKB}KB  (-${saving}%)`);
    } catch (e) {
      console.error(`❌ ${file}: ${e.message}`);
    }
  }

  const totalSaving = ((1 - totalNew / totalOrig) * 100).toFixed(1);
  console.log('\n═══════════════════════════════════════════════════');
  console.log(`📦 Итого: ${(totalOrig/1024/1024).toFixed(1)}MB → ${(totalNew/1024/1024).toFixed(1)}MB  (сэкономлено ${totalSaving}%)`);
  console.log('═══════════════════════════════════════════════════');
}

convertAll();
