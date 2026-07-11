const fs = require('fs');
let appCode = fs.readFileSync('app.js', 'utf8');

const startMENU = appCode.indexOf('const MENU = [');
const endMENU = appCode.indexOf('const PROMOS = [');
let menuCode = appCode.substring(startMENU, endMENU).replace('const MENU =', 'return');
const MENU = new Function(menuCode)();

const zhNames2 = {
  410: '烟草烤鸡', 411: '炖肉配米饭', 412: '炒拉面',
  506: '哈萨克风味比萨', 507: '蘑菇鸡肉比萨', 508: '奶酪皮塔饼', 509: '肉馅皮塔饼',
  510: '土豆角', 511: '薯条', 512: '汉堡', 513: '鸡肉汉堡', 514: '双层汉堡',
  515: '芝士汉堡', 516: '鸡肉芝士汉堡', 517: '俱乐部三明治',
  518: '鸡肉拉瓦什卷', 519: '烤肉拉瓦什卷', 520: '芝士拉瓦什卷',
  521: '坦德里拉瓦什卷', 522: '热狗', 523: '鸡肉沙瓦玛',
  606: '羊排块', 607: '碎肉烤串', 608: '烤蔬菜串', 609: '鸡腿烤串',
  709: '土豆球',
  1101: '矿泉水 0.5升', 1102: '矿泉水 1升', 1103: '苏打水',
  1104: '木槿花茶 0.5升', 1105: '木槿花茶 1升',
  1106: '酸奶饮料 0.5升', 1107: '可乐罐装', 1108: '可乐散装', 1109: '可乐玻璃瓶',
  1111: '果汁 Pico 1升', 1112: 'FuseTea 0.5升', 1113: 'FuseTea 1升',
  1114: '可口可乐 0.5升', 1115: '芬达 0.5升', 1116: '雪碧 0.5升',
  1117: '可口可乐 1升', 1118: '芬达 1升', 1119: '雪碧 1升'
};

const zhDescs2 = {
  410: '传统格鲁吉亚风格腌制烤鸡。', 411: '软烂红烧肉配蒸米饭。', 412: '翻炒拉面配肉和蔬菜。',
  506: '哈萨克风味特色比萨。', 507: '鲜嫩鸡肉蘑菇比萨。', 508: '土耳其风味奶酪皮塔饼。',
  509: '土耳其风味肉馅皮塔饼。', 510: '香脆土豆角配酱料。', 511: '香脆黄金薯条。',
  512: '经典牛肉汉堡。', 513: '多汁鸡肉汉堡。', 514: '双层牛肉汉堡。',
  515: '经典芝士汉堡。', 516: '鸡肉芝士汉堡。', 517: '丰盛俱乐部三明治。',
  518: '鲜嫩鸡肉拉瓦什卷。', 519: '烤肉拉瓦什卷。', 520: '浓郁芝士拉瓦什卷。',
  521: '坦德里烤制拉瓦什卷。', 522: '经典热狗。', 523: '鸡肉沙瓦玛卷饼。',
  606: '精选羊肉块。', 607: '传统碎肉烤串。', 608: '新鲜烤蔬菜串。', 609: '多汁鸡腿烤串。',
  709: '外酥里嫩土豆球。',
  1101: '清爽纯净矿泉水 0.5升。', 1102: '清爽纯净矿泉水 1升。', 1103: '清爽苏打水。',
  1104: '天然木槿花茶 0.5升。', 1105: '天然木槿花茶 1升。',
  1106: '传统哈萨克酸奶饮料 0.5升。', 1107: '可乐罐装。', 1108: '散装可乐。',
  1109: '玻璃瓶可乐。', 1111: 'Pico牌果汁 1升。',
  1112: 'FuseTea冰茶 0.5升。', 1113: 'FuseTea冰茶 1升。',
  1114: '经典可口可乐 0.5升。', 1115: '芬达橙味饮料 0.5升。', 1116: '雪碧柠檬味 0.5升。',
  1117: '经典可口可乐 1升。', 1118: '芬达橙味饮料 1升。', 1119: '雪碧柠檬味 1升。'
};

let fixed = 0;
MENU.forEach(m => {
  if (!m.name.zh || m.name.zh === m.name.ru) {
    if (zhNames2[m.id]) { m.name.zh = zhNames2[m.id]; fixed++; }
  }
  if (!m.desc.zh || m.desc.zh === m.desc.ru) {
    if (zhDescs2[m.id]) { m.desc.zh = zhDescs2[m.id]; fixed++; }
  }
});

const newMenuSection = 'const MENU = ' + JSON.stringify(MENU, null, 2) + ';\n\n';
const finalCode = appCode.substring(0, startMENU) + newMenuSection + appCode.substring(endMENU);
fs.writeFileSync('app.js', finalCode);
console.log('Fixed', fixed, 'more issues');

// Final check
const verifyCode = fs.readFileSync('app.js', 'utf8');
const startM2 = verifyCode.indexOf('const MENU = [');
const endM2 = verifyCode.indexOf('const PROMOS = [');
const m2 = new Function(verifyCode.substring(startM2, endM2).replace('const MENU =', 'return'))();
const stillBad = m2.filter(m => !m.name.zh || m.name.zh === m.name.ru);
console.log('Remaining items without zh name:', stillBad.length);
if (stillBad.length > 0) stillBad.forEach(m => console.log(' -', m.id, m.name.ru));
