const fs = require('fs');
let code = fs.readFileSync('app.js', 'utf8');

const match = code.match(/const MENU = \[[\s\S]*?\n\];/);
if (!match) {
    console.log('No match');
    process.exit(1);
}
let menuCode = match[0].replace('const MENU = ', '');
if (menuCode.endsWith(';')) {
    menuCode = menuCode.slice(0, -1);
}
let MENU;
try {
    MENU = eval('(' + menuCode + ')');
} catch (e) {
    console.error(e);
    process.exit(1);
}

MENU.forEach(item => {
  if (item.name && !item.name.hi) item.name.hi = item.name.ru;
  if (item.desc && !item.desc.hi) item.desc.hi = item.desc.ru;
});

let newMenuBlock = 'const MENU = ' + JSON.stringify(MENU, null, 2) + ';';
code = code.replace(match[0], newMenuBlock);
fs.writeFileSync('app.js', code);
console.log('done');
