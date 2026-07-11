const fs = require('fs');
const content = fs.readFileSync('app.js', 'utf8');

// Find start of I18N
const startI18N = content.indexOf('const I18N = {');
// Find end of I18N by searching for the next major block
const endI18N = content.indexOf('const SUPER_CATEGORIES');
let i18nCode = content.substring(startI18N, endI18N);
i18nCode = i18nCode.replace('const I18N =', 'return');

// Find start of MENU
const startMENU = content.indexOf('const MENU = [');
// Find end of MENU by searching for the next major block
const endMENU = content.indexOf('const PROMOS');
let menuCode = content.substring(startMENU, endMENU);
menuCode = menuCode.replace('const MENU =', 'return');

const I18N = new Function(i18nCode)();
const MENU = new Function(menuCode)();

let errors = [];
let noPhotoItems = [];

// 1. Check I18N
for (const key in I18N) {
  const langs = ['ru', 'kz', 'en', 'zh'];
  for (const lang of langs) {
    if (I18N[key][lang] === undefined) {
      errors.push(`I18N.${key} missing '${lang}'`);
    } else if (String(I18N[key][lang]).includes('undefined')) {
      errors.push(`I18N.${key}.${lang} has undefined string`);
    }
  }
}

// 2. Check MENU
MENU.forEach((item, index) => {
  const langs = ['ru', 'kz', 'en', 'zh'];
  
  if (!item.name) errors.push(`MENU[${item.id}] missing 'name'`);
  else {
    langs.forEach(lang => {
      if (item.name[lang] === undefined || String(item.name[lang]).includes('undefined')) 
        errors.push(`MENU[${item.id}] name.${lang} is missing or undefined`);
    });
  }

  if (!item.desc) errors.push(`MENU[${item.id}] missing 'desc'`);
  else {
    langs.forEach(lang => {
      if (item.desc[lang] === undefined || String(item.desc[lang]).includes('undefined')) 
        errors.push(`MENU[${item.id}] desc.${lang} is missing or undefined`);
    });
  }

  if (!item.img) {
    noPhotoItems.push({ id: item.id, name: item.name.ru, origPrice: item.origPrice, isHit: item.isHit, isNew: item.isNew });
  }
});

fs.writeFileSync('check_results.json', JSON.stringify({ errors, noPhotoItems }, null, 2));
console.log('Check finished.');
