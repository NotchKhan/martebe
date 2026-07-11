const fs = require('fs');
let appCode = fs.readFileSync('app.js', 'utf8');

// 1. Fix DOMContentLoaded
// Replace:
//    kz: MENU.length + ' тағам',
//    en: MENU.length + ' dishes'
//  };
// With:
//    kz: MENU.length + ' тағам',
//    en: MENU.length + ' dishes',
//    zh: MENU.length + ' 菜品'
//  };
const regexDOM = /en: MENU\.length \+ ' dishes'\s*\};/;
appCode = appCode.replace(regexDOM, "en: MENU.length + ' dishes',\n    zh: MENU.length + ' 菜品'\n  };");

// 2. Fix updateCartBar
// Replace:
//    document.getElementById('bar-count').textContent =
//      count + ' ' + pluralRu(count, ['позиция','позиции','позиций']);
// With new logic
const cartBarRegex = /document\.getElementById\('bar-count'\)\.textContent\s*=\s*count \+ ' ' \+ pluralRu\(count, \['позиция','позиции','позиций'\]\);/;

const cartBarNew = `    const pPos = (I18N['plural_pos'] && I18N['plural_pos'][currentLang]) || 'позиции';
    let pText = pPos;
    if (currentLang === 'ru') {
      pText = pluralRu(count, ['позиция','позиции','позиций']);
    } else if (currentLang === 'en') {
      pText = count === 1 ? 'item' : 'items';
    }
    document.getElementById('bar-count').textContent = count + ' ' + pText;`;

appCode = appCode.replace(cartBarRegex, cartBarNew);

// 3. Find MENU items without img and give them a sticker
// We will just do a regex replace on the items if they don't have isHit/isNew/origPrice
// It's easier to evaluate, modify, and stringify MENU, then replace it, but since I already did that and my JSON.stringify worked but expanded the lines, I will just let it be expanded.
// Wait, my previous run of fix_logic.js said "Added stickers to 0 items without photo". Why?
// Because in `app.js`, `img` might be `null` or `""` or `"images/..."` but I checked `!item.img`.
// Let's see what items without photo actually have in MENU.

fs.writeFileSync('app.js', appCode);
console.log('Fixed DOMContentLoaded missing zh:', appCode.includes("zh: MENU.length + ' 菜品'"));
console.log('Fixed updateCartBar plural logic:', appCode.includes("const pPos = (I18N['plural_pos']"));
