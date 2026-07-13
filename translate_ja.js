const fs = require('fs');

const cache = new Map();

async function translateText(text) {
  if (!text) return text;
  if (cache.has(text)) return cache.get(text);
  
  try {
    const url = 'https://translate.googleapis.com/translate_a/single?client=gtx&sl=ru&tl=ja&dt=t&q=' + encodeURIComponent(text);
    const res = await fetch(url);
    const data = await res.json();
    const result = data[0].map(x => x[0]).join('');
    cache.set(text, result);
    return result;
  } catch(e) {
    console.error('Error translating:', text);
    return text; // fallback
  }
}

async function run() {
  let code = fs.readFileSync('app.js', 'utf8');

  // I18N
  const i18nMatch = code.match(/const I18N = \{[\s\S]*?\n\};/);
  if (i18nMatch) {
    let str = i18nMatch[0].replace('const I18N = ', '');
    if (str.endsWith(';')) str = str.slice(0, -1);
    let obj = eval('(' + str + ')');
    for (const key in obj) {
      if (obj[key] && obj[key].ru) {
        obj[key].ja = await translateText(obj[key].ru);
        await new Promise(r => setTimeout(r, 100));
      }
    }
    let newStr = 'const I18N = ' + JSON.stringify(obj, null, 2) + ';';
    code = code.replace(i18nMatch[0], newStr);
    console.log('I18N translated');
  }

  // SUPER_CATEGORIES
  const superMatch = code.match(/const SUPER_CATEGORIES = \[[\s\S]*?\n\];/);
  if (superMatch) {
    let str = superMatch[0].replace('const SUPER_CATEGORIES = ', '');
    if (str.endsWith(';')) str = str.slice(0, -1);
    let obj = eval('(' + str + ')');
    for (const item of obj) {
      if (item.label && item.label.ru) {
        item.label.ja = await translateText(item.label.ru);
        await new Promise(r => setTimeout(r, 100));
      }
    }
    let newStr = 'const SUPER_CATEGORIES = ' + JSON.stringify(obj, null, 2) + ';';
    code = code.replace(superMatch[0], newStr);
    console.log('SUPER_CATEGORIES translated');
  }

  // CATEGORIES
  const catMatch = code.match(/const CATEGORIES = \[[\s\S]*?\n\];/);
  if (catMatch) {
    let str = catMatch[0].replace('const CATEGORIES = ', '');
    if (str.endsWith(';')) str = str.slice(0, -1);
    let obj = eval('(' + str + ')');
    for (const item of obj) {
      if (item.label && item.label.ru) {
        item.label.ja = await translateText(item.label.ru);
        await new Promise(r => setTimeout(r, 100));
      }
    }
    let newStr = 'const CATEGORIES = ' + JSON.stringify(obj, null, 2) + ';';
    code = code.replace(catMatch[0], newStr);
    console.log('CATEGORIES translated');
  }

  // MENU
  const menuMatch = code.match(/const MENU = \[[\s\S]*?\n\];/);
  if (menuMatch) {
    let str = menuMatch[0].replace('const MENU = ', '');
    if (str.endsWith(';')) str = str.slice(0, -1);
    let obj = eval('(' + str + ')');
    let c = 0;
    for (const item of obj) {
      c++;
      if (item.name && item.name.ru) {
        if (!item.name.ja || item.name.ja === item.name.ru) {
          item.name.ja = await translateText(item.name.ru);
          await new Promise(r => setTimeout(r, 100));
        }
      }
      if (item.desc && item.desc.ru) {
        if (!item.desc.ja || item.desc.ja === item.desc.ru) {
          item.desc.ja = await translateText(item.desc.ru);
          await new Promise(r => setTimeout(r, 100));
        }
      }
      if (c % 10 === 0) console.log(`Menu item ${c}/${obj.length} translated`);
    }
    let newStr = 'const MENU = ' + JSON.stringify(obj, null, 2) + ';';
    code = code.replace(menuMatch[0], newStr);
    console.log('MENU translated');
  }

  fs.writeFileSync('app.js', code);
  console.log('Translation complete!');
}

run();
