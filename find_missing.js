const fs = require('fs');
let content = fs.readFileSync('app.js', 'utf8');
let menuStart = content.indexOf('const MENU = [');
let menuEnd = content.indexOf('];', menuStart);
let menuStr = content.substring(menuStart + 'const MENU = '.length, menuEnd + 1);

let MENU;
eval('MENU = ' + menuStr);

let missing = [];
for (let item of MENU) {
  if (item.desc && item.desc.ru === '' && item.desc.zh && item.desc.zh.length > 5) {
    missing.push({ id: item.id, name: item.name.ru, zhDesc: item.desc.zh });
  }
}
console.log(JSON.stringify(missing, null, 2));
