const fs = require('fs');
let appCode = fs.readFileSync('app.js', 'utf8');

const startMENU = appCode.indexOf('const MENU = [');
const endMENU = appCode.indexOf('const PROMOS = [');
let menuCode = appCode.substring(startMENU, endMENU).replace('const MENU =', 'return');
const MENU = new Function(menuCode)();

const zhDescsFinal = {
  409: '塔什干风味茶馆抓饭配肉和香料。',
  501: '四季比萨配多种时令配料。',
  502: '香辣意大利辣香肠比萨。',
  503: '玛尔特贝招牌特色比萨。',
  505: '经典玛格丽特比萨配番茄和芝士。',
  605: '嫩滑多汁鸡胸肉。',
  701: '新鲜腌制辣椒。',
  702: '传统辣味阿哲卡酱。',
  703: '浓郁大蒜酱。'
};

let fixed = 0;
MENU.forEach(m => {
  if (!m.desc.zh || m.desc.zh === m.desc.ru) {
    if (zhDescsFinal[m.id]) { m.desc.zh = zhDescsFinal[m.id]; fixed++; }
  }
});

const newMenuSection = 'const MENU = ' + JSON.stringify(MENU, null, 2) + ';\n\n';
const finalCode = appCode.substring(0, startMENU) + newMenuSection + appCode.substring(endMENU);
fs.writeFileSync('app.js', finalCode);
console.log('Fixed', fixed, 'desc issues');

// Verify syntax
const { execSync } = require('child_process');
try {
  execSync('node -c app.js', { cwd: 'c:/Users/User0528/Desktop/MARTEBE' });
  console.log('Syntax OK');
} catch(e) {
  console.error('Syntax error:', e.message);
}
