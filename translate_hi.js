const fs = require('fs');

async function translateText(text) {
  if (!text) return text;
  try {
    const url = 'https://translate.googleapis.com/translate_a/single?client=gtx&sl=ru&tl=hi&dt=t&q=' + encodeURIComponent(text);
    const res = await fetch(url);
    const data = await res.json();
    return data[0].map(x => x[0]).join('');
  } catch(e) {
    console.error('Error translating:', text);
    return text;
  }
}

async function run() {
  let code = fs.readFileSync('app.js', 'utf8');
  const match = code.match(/const MENU = \[[\s\S]*?\n\];/);
  if (!match) {
    console.log('No match');
    process.exit(1);
  }
  let menuCode = match[0].replace('const MENU = ', '');
  if (menuCode.endsWith(';')) menuCode = menuCode.slice(0, -1);
  
  let MENU = eval('(' + menuCode + ')');
  const cache = new Map();
  
  for (let i = 0; i < MENU.length; i++) {
    const item = MENU[i];
    
    // Translate name
    if (item.name && item.name.ru) {
      if (!cache.has(item.name.ru)) {
        cache.set(item.name.ru, await translateText(item.name.ru));
        await new Promise(r => setTimeout(r, 100)); // small delay
      }
      item.name.hi = cache.get(item.name.ru);
    }
    
    // Translate desc
    if (item.desc && item.desc.ru) {
      if (!cache.has(item.desc.ru)) {
        cache.set(item.desc.ru, await translateText(item.desc.ru));
        await new Promise(r => setTimeout(r, 100)); // small delay
      }
      item.desc.hi = cache.get(item.desc.ru);
    }
    
    console.log(`Translated ${i + 1}/${MENU.length}`);
  }
  
  let newMenuBlock = 'const MENU = ' + JSON.stringify(MENU, null, 2) + ';';
  code = code.replace(match[0], newMenuBlock);
  fs.writeFileSync('app.js', code);
  console.log('Translation complete!');
}

run();
