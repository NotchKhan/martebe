const fs = require('fs');

let content = fs.readFileSync('app.js', 'utf8');

const replacement = `function renderPromos() {
  // Render dynamic promo banners
  const bannersContainer = document.getElementById('promo-banners-list');
  if (bannersContainer) {
    bannersContainer.innerHTML = PROMOS.map(p => \`
      <div class="promo-banner" style="background:\${p.bg};border-color:\${p.border}">
        <span class="pb-icon">\${p.icon}</span>
        <div class="pb-text">
          <div class="pb-title">\${p.title[currentLang]}</div>
          <div class="pb-sub">\${p.sub[currentLang]}</div>
        </div>
        <span class="pb-badge" style="\${p.badge==='FREE' ? 'background:#E63946' : p.badge==='10+1' ? 'background:#795548' : ''}">\${p.badge}</span>
      </div>
    \`).join('');
  }

  // Render dynamic promo items grid
  const grid = document.getElementById('promos-items-grid');
  if (!grid) return;`;

content = content.replace(
  /function renderPromos\(\) \{\s*\/\/\s*Promo banners already in HTML[^\n]*\n\s*const grid = document\.getElementById\('promos-items-grid'\);\s*if \(!grid\) return;/g,
  replacement
);

fs.writeFileSync('app.js', content);
console.log('Patch applied successfully.');
