const fs = require('fs');
let appCode = fs.readFileSync('app.js', 'utf8');

// 1. Fix missing zh in DOMContentLoaded
appCode = appCode.replace(
  "en: MENU.length + ' dishes'\n  };",
  "en: MENU.length + ' dishes',\n    zh: MENU.length + ' 菜品'\n  };"
);

// 2. Fix updateCartBar to use I18N.plural_pos
const cartBarOld = `    document.getElementById('bar-count').textContent =
      count + ' ' + pluralRu(count, ['позиция','позиции','позиций']);`;
const cartBarNew = `    const pPos = I18N['plural_pos'][currentLang] || I18N['plural_pos']['ru'];
    let pText = pPos;
    if (currentLang === 'ru') {
      pText = pluralRu(count, ['позиция','позиции','позиций']);
    } else if (currentLang === 'en') {
      pText = count === 1 ? 'item' : 'items';
    }
    document.getElementById('bar-count').textContent = count + ' ' + pText;`;
appCode = appCode.replace(cartBarOld, cartBarNew);

// 3. Fix MENU items without img by adding stickers
// Evaluate MENU
const startMENU = appCode.indexOf('const MENU = [');
const endMENU = appCode.indexOf('const PROMOS = [');
let menuCode = appCode.substring(startMENU, endMENU).replace('const MENU =', 'return');
const MENU = new Function(menuCode)();

let changedStickers = 0;
MENU.forEach(item => {
  if (!item.img) {
    if (!item.isHit && !item.isNew && !item.origPrice) {
      if (item.id % 2 === 0) item.isHit = true;
      else item.isNew = true;
      changedStickers++;
    }
  }
});

// Stringify MENU and preserve formatting
const newMenuCode = 'const MENU = ' + JSON.stringify(MENU, null, 2).replace(/"([^"]+)":/g, '$1:') + ';\n\n// ── PROMOS (Top carousel) ──────────────────────────────────────\n';
appCode = appCode.substring(0, startMENU) + newMenuCode + appCode.substring(endMENU);

fs.writeFileSync('app.js', appCode);
console.log('Fixed DOMContentLoaded missing zh:', appCode.includes('zh: MENU.length'));
console.log('Fixed updateCartBar plural logic:', appCode.includes('pText = pluralRu'));
console.log('Added stickers to', changedStickers, 'items without photo.');
