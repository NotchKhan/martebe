// Comprehensive fix script for MARTEBE app.js
// 1. Fix all zh names/descs that still have Russian text (from failed auto-translations)
// 2. Fix weight='undefined' string
// 3. Remove description from list view

const fs = require('fs');
let appCode = fs.readFileSync('app.js', 'utf8');

// Extract MENU
const startMENU = appCode.indexOf('const MENU = [');
const endMENU = appCode.indexOf('const PROMOS = [');
let menuCode = appCode.substring(startMENU, endMENU).replace('const MENU =', 'return');
const MENU = new Function(menuCode)();

// Chinese translations dictionary for all items
const zhNames = {
  101: '大米粥', 102: '水煮香肠', 103: '煎香肠', 104: '水煮鸡蛋', 105: '荷包蛋',
  106: '奶酪煎饼', 107: '沙克舒卡配奶酪', 108: '莫扎里拉芝士蛋卷', 109: '蔬菜蛋卷',
  201: '脆皮茄子', 202: '男士奇思', 203: '玛尔特贝沙拉', 204: '肉奥利维耶沙拉',
  205: '希腊沙拉', 206: '泰式沙拉', 207: '阿奇丘克沙拉', 208: '新鲜蔬菜沙拉',
  209: '凯撒沙拉', 210: '马里布沙拉',
  301: '罗宋汤', 302: '水拉面', 303: '肉拉面', 304: '羊肉什锦汤', 305: '水饺汤',
  306: '杂烩汤', 307: '纳伦', 308: '冷汤', 309: '扁豆汤', 310: '包菜卷汤',
  311: '鸡汤', 312: '鸡肉拉面', 313: '鹌鹑汤', 314: '肉丸汤', 315: '干拌拉面', 316: '马斯塔瓦',
  401: '馒头饺子', 402: '锅烤肉串', 403: '阿尔弗雷多意面', 404: '比什巴尔马克',
  405: '炸猪排', 406: '烤里脊肉', 407: '烤鸡腿', 408: '炒饭', 409: '披萨',
  501: '辣牛肉比萨', 502: '火腿蘑菇比萨', 503: '玛格丽塔比萨', 504: '海鲜比萨', 505: '混合比萨',
  601: '经典汉堡', 602: '辣味汉堡', 603: '奶酪汉堡', 604: '双层汉堡', 605: '素食汉堡',
  701: '鸡肉拉瓦什卷', 702: '肉类拉瓦什卷', 703: '蔬菜拉瓦什卷', 704: '金枪鱼拉瓦什卷',
  705: '炸薯条', 706: '鸡块', 707: '洋葱圈', 708: '热狗',
  801: '馕饼', 802: '黑麦面包', 803: '肉馅三角饺', 804: '鸡肉三角饺',
  805: '金炸球 (6个)', 806: '金炸球 (10个)', 807: '金炸球 (1公斤)',
  808: '洋葱卡塔玛', 809: '经典卡塔玛', 810: '阿斯陶馕',
  901: '鸡肉拼盘', 902: '肉类大拼盘', 903: '肉类小拼盘', 904: '蔬菜拼盘', 905: '水果拼盘',
  1001: '比什巴尔马克 (6–8人)', 1002: '比什巴尔马克 (10–12人)', 1003: '砂锅烤肉',
  1004: '库尔达克 (9–10人)', 1005: '肉食盛宴 (6–8人)', 1006: '茶馆抓饭', 1007: 'MIX 库尔达克 (6–8人)',
  // Old items
  2: '套餐二号', 3: '家庭套餐', 12: '抓饭', 13: '库尔达克', 14: '羊肉烤串',
  20: '拉条子', 21: '什锦汤', 22: '清炖汤', 30: '奥利维耶', 31: '阿奇丘克', 32: '韩式胡萝卜',
  33: '凯撒', 40: '三角饼', 41: '金炸球', 50: '酸奶', 51: '马奶酒', 52: '红茶',
  53: '可口可乐', 54: '橙汁', 60: '恰克恰克', 61: '冰淇淋'
};

const zhDescs = {
  101: '用黄油煮成的嫩滑牛奶大米粥。', 102: '热气腾腾的经典水煮香肠。', 103: '香脆可口的煎香肠。',
  104: '嫩滑的水煮鸡蛋。', 105: '新鲜的荷包蛋，完美早餐。', 106: '松软的奶酪煎饼配酸奶油。',
  107: '鸡蛋配西红柿和辣椒，配奶酪。', 108: '松软芝士蛋卷，内含莫扎里拉。', 109: '轻盈的蔬菜蛋卷。',
  201: '香脆茄子配特制辣酱。', 202: '男士最爱，豪华肉类沙拉。', 203: '玛尔特贝招牌特色沙拉。',
  204: '经典奥利维耶沙拉配肉类。', 205: '地中海风味希腊沙拉。', 206: '泰式风味牛肉沙拉。',
  207: '新鲜番茄和黄瓜的传统沙拉。', 208: '新鲜蔬菜沙拉。', 209: '经典凯撒沙拉。',
  210: '热带水果风味马里布沙拉。',
  301: '传统乌克兰罗宋汤，配酸奶油。', 302: '清汤拉面配蔬菜。', 303: '浓郁肉汤拉面。',
  304: '传统羊肉什锦汤。', 305: '猪肉水饺配鲜汤。', 306: '丰盛的俄式杂烩汤。',
  307: '哈萨克传统纳伦面条冷汤。', 308: '清凉夏日冷汤。', 309: '暖胃扁豆汤。',
  310: '肉馅包菜卷配浓汤。', 311: '鲜嫩鸡汤。', 312: '鸡肉拉面配蔬菜。',
  313: '珍贵鹌鹑清汤。', 314: '嫩滑肉丸清汤。', 315: '干拌拉面配肉和蔬菜。',
  316: '浓郁大米肉菜汤。',
  401: '传统哈萨克馒头饺子，配肉馅。', 402: '砂锅慢炖肉串。', 403: '奶油意大利面。',
  404: '哈萨克传统比什巴尔马克。', 405: '酥脆猪排。', 406: '嫩滑里脊肉。',
  407: '多汁烤鸡腿。', 408: '香炒米饭。',
  801: '传统哈萨克馕饼。', 802: '香脆黑麦面包。', 803: '肉馅酥脆三角饺。',
  804: '鸡肉馅酥脆三角饺。', 805: '炸金球 (6个)。', 806: '炸金球大份 (10个)。',
  807: '新鲜炸金球 1公斤。', 808: '洋葱夹层煎饼。', 809: '传统分层煎饼。', 810: '烤阿斯陶馕。',
  901: '精选鸡肉拼盘。', 902: '豪华大肉拼盘。', 903: '精选小肉拼盘。',
  904: '新鲜时令蔬菜拼盘。', 905: '时令水果拼盘。',
  1001: '哈萨克传统比什巴尔马克，适合6–8人。', 1002: '哈萨克传统比什巴尔马克，适合10–12人。',
  1003: '传统砂锅山地烤肉串。', 1004: '一道丰盛的哈萨克杂烩，适合9–10人。',
  1005: '精选肉类豪华盛宴，适合6–8人。', 1006: '茶馆风味香炒饭配胡萝卜和肉。',
  1007: '库尔达克和馒头饺子的混合宴会拼盘。'
};

// Weight fixes
const weightFixes = {
  804: '1 шт', 805: '6 шт'
};

let fixedCount = 0;

MENU.forEach(m => {
  // Fix weight='undefined' 
  if (m.weight === 'undefined' || !m.weight) {
    if (weightFixes[m.id]) {
      m.weight = weightFixes[m.id];
      fixedCount++;
    } else {
      m.weight = '1 шт';
      fixedCount++;
    }
  }

  // Fix zh name
  if (!m.name.zh || m.name.zh === m.name.ru) {
    if (zhNames[m.id]) {
      m.name.zh = zhNames[m.id];
      fixedCount++;
    }
  }

  // Fix zh desc
  if (!m.desc.zh || m.desc.zh === m.desc.ru) {
    if (zhDescs[m.id]) {
      m.desc.zh = zhDescs[m.id];
      fixedCount++;
    }
  }
});

// Rebuild MENU section
const MENU_JSON = JSON.stringify(MENU, null, 2);
const newMenuSection = 'const MENU = ' + MENU_JSON + ';\n\n';
const newAppCode = appCode.substring(0, startMENU) + newMenuSection + appCode.substring(endMENU);

// Fix 2: Remove description from list view in renderGrid
// Remove the mli-desc line
const descLine = /\s*<div class="mli-desc"[^>]*>\$\{item\.desc[^}]+\}<\/div>/g;
let finalCode = newAppCode.replace(descLine, '');

fs.writeFileSync('app.js', finalCode);
console.log('Fixed', fixedCount, 'issues');
console.log('Removed description from list view');

// Verify
const verifyCode = fs.readFileSync('app.js', 'utf8');
const startM2 = verifyCode.indexOf('const MENU = [');
const endM2 = verifyCode.indexOf('const PROMOS = [');
const menuCode2 = verifyCode.substring(startM2, endM2).replace('const MENU =', 'return');
const MENU2 = new Function(menuCode2)();
const stillBad = MENU2.filter(m => m.name.zh === m.name.ru || m.weight === 'undefined');
console.log('Still bad items:', stillBad.length);
