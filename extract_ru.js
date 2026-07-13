const fs = require('fs');

function run() {
  let code = fs.readFileSync('app.js', 'utf8');
  let strings = new Set();

  const addStrings = (obj) => {
    if (!obj) return;
    if (typeof obj === 'string') return;
    if (Array.isArray(obj)) {
      for (const item of obj) addStrings(item);
    } else if (typeof obj === 'object') {
      if (obj.ru) {
        strings.add(obj.ru);
      }
      for (const key in obj) {
        if (key !== 'ru') addStrings(obj[key]);
      }
    }
  };

  // I18N
  const i18nMatch = code.match(/const I18N = \{[\s\S]*?\n\};/);
  if (i18nMatch) {
    let str = i18nMatch[0].replace('const I18N = ', '');
    if (str.endsWith(';')) str = str.slice(0, -1);
    addStrings(eval('(' + str + ')'));
  }

  // SUPER_CATEGORIES
  const superMatch = code.match(/const SUPER_CATEGORIES = \[[\s\S]*?\n\];/);
  if (superMatch) {
    let str = superMatch[0].replace('const SUPER_CATEGORIES = ', '');
    if (str.endsWith(';')) str = str.slice(0, -1);
    addStrings(eval('(' + str + ')'));
  }

  // CATEGORIES
  const catMatch = code.match(/const CATEGORIES = \[[\s\S]*?\n\];/);
  if (catMatch) {
    let str = catMatch[0].replace('const CATEGORIES = ', '');
    if (str.endsWith(';')) str = str.slice(0, -1);
    addStrings(eval('(' + str + ')'));
  }

  // MENU
  const menuMatch = code.match(/const MENU = \[[\s\S]*?\n\];/);
  if (menuMatch) {
    let str = menuMatch[0].replace('const MENU = ', '');
    if (str.endsWith(';')) str = str.slice(0, -1);
    addStrings(eval('(' + str + ')'));
  }

  let map = {};
  for (let s of strings) {
    map[s] = "";
  }
  fs.writeFileSync('to_translate.json', JSON.stringify(map, null, 2));
  console.log('Saved to to_translate.json');
}

run();
