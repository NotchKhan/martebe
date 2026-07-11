const fs = require('fs');

// 1. Add CSS for badges
let css = fs.readFileSync('style.css', 'utf8');
if (!css.includes('.card-hit-badge')) {
  css += `\n.card-hit-badge { position: absolute; top: 8px; left: 8px; background: #FF9800; color: white; font-size: 0.68rem; font-weight: 800; padding: 3px 8px; border-radius: 8px; z-index: 2; }\n`;
  css += `.card-new-badge { position: absolute; top: 8px; left: 8px; background: #4CAF50; color: white; font-size: 0.68rem; font-weight: 800; padding: 3px 8px; border-radius: 8px; z-index: 2; }\n`;
  css += `.card-disc-badge { position: absolute; top: 8px; left: 8px; background: var(--red); color: white; font-size: 0.68rem; font-weight: 800; padding: 3px 8px; border-radius: 8px; z-index: 2; }\n`;
  // Adjust top offset if multiple badges? Let's just put HIT/NEW on top-left and disc on top-right, or just replace left: 8px with left: 45px etc if multiple?
  // Usually it's just one sticker.
  fs.writeFileSync('style.css', css);
}

// 2. Patch app.js to render badges in cards
let app = fs.readFileSync('app.js', 'utf8');

const regexGrid = /\$\{disc \? \`<div class="card-disc-badge">-\$\{disc\}%<\/div>\` : ''\}/g;
const replacement = `\${disc ? \`<div class="card-disc-badge">-\${disc}%</div>\` : (item.isHit ? \`<div class="card-hit-badge">HIT</div>\` : (item.isNew ? \`<div class="card-new-badge">NEW</div>\` : ''))}`;

app = app.replace(regexGrid, replacement);

// 3. Patch menu-list-item to also show badges (for those without photos)
const regexList = /<div class="mli-name">\$\{item\.name\[currentLang\]\}<\/div>/g;
const replacementList = `<div class="mli-name">\${item.name[currentLang]} \${item.isHit ? \`<span style="color:#FF9800;font-size:0.7rem;font-weight:bold;margin-left:4px;">HIT</span>\` : (item.isNew ? \`<span style="color:#4CAF50;font-size:0.7rem;font-weight:bold;margin-left:4px;">NEW</span>\` : '')}</div>`;

app = app.replace(regexList, replacementList);

fs.writeFileSync('app.js', app);
console.log('App.js patched successfully for stickers.');
