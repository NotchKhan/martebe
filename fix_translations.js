process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
const fs = require('fs');
const { translate } = require('@vitalets/google-translate-api');

async function fixMenu() {
  console.log("Starting menu fix phase 2...");
  let content = fs.readFileSync('app.js', 'utf8');
  
  let menuStart = content.indexOf('const MENU = [');
  let menuEnd = content.indexOf('];', menuStart);
  let menuStr = content.substring(menuStart + 'const MENU = '.length, menuEnd + 1);
  
  let MENU;
  eval('MENU = ' + menuStr);
  
  const delay = ms => new Promise(res => setTimeout(res, ms));

  let newItems = [];
  
  for (let item of MENU) {
    let name_zh = item.name.zh;
    let desc_ru = item.desc ? item.desc.ru : '';
    let desc_kz = item.desc ? item.desc.kz : '';
    let desc_en = item.desc ? item.desc.en : '';
    let desc_zh = item.desc ? item.desc.zh : '';

    // If name.zh is just the Russian text, or it's missing, translate it.
    if (!name_zh || name_zh === item.name.ru) {
      try {
        let res = await translate(item.name.ru, { to: 'zh-CN' });
        name_zh = res.text;
        await delay(100);
      } catch(e) { console.log('Err tr name', item.name.ru); }
    }

    if (item.desc) {
      // For restored items, zh desc might be Russian text.
      if (desc_zh === desc_ru && desc_ru !== '') {
        try {
          let res = await translate(desc_ru, { to: 'zh-CN' });
          desc_zh = res.text;
          await delay(100);
        } catch(e) { console.log('Err tr desc zh', desc_ru); }
      }
      
      // For unrestored items, ru desc might be empty, but zh desc is Chinese.
      if (desc_ru === '' && desc_zh && desc_zh !== '') {
        try {
          let res1 = await translate(desc_zh, { to: 'ru' }); await delay(100); desc_ru = res1.text;
          let res2 = await translate(desc_zh, { to: 'kk' }); await delay(100); desc_kz = res2.text;
          let res3 = await translate(desc_zh, { to: 'en' }); await delay(100); desc_en = res3.text;
        } catch(e) { console.log('Err tr desc back', desc_zh); }
      }
    }

    let str = `  { id:${item.id}, cat:'${item.cat}', name: { ru: '${item.name.ru.replace(/'/g,"\\'")}', kz: '${item.name.kz.replace(/'/g,"\\'")}', en: '${item.name.en.replace(/'/g,"\\'")}', zh: '${name_zh.replace(/'/g,"\\'")}' }`;
    if (item.weight) {
      str += `, weight:'${item.weight}'`;
    }
    if (item.desc) {
      str += `, desc: { ru: '${desc_ru.replace(/'/g,"\\'")}', kz: '${desc_kz.replace(/'/g,"\\'")}', en: '${desc_en.replace(/'/g,"\\'")}', zh: '${desc_zh.replace(/'/g,"\\'")}' }`;
    }
    str += `, price:${item.price}, origPrice:${item.origPrice}, img:'${item.img}', emoji:'${item.emoji}', gradient:['${item.gradient[0]}','${item.gradient[1]}'], rating:${item.rating}, reviews:${item.reviews} }`;
    
    newItems.push(str);
    console.log(`Phase 2: Processed ${item.id} - ${item.name.ru}`);
  }

  let newMenuBlock = 'const MENU = [\n' + newItems.join(',\n') + '\n];';
  let newContent = content.substring(0, menuStart) + newMenuBlock + content.substring(menuEnd + 2);
  fs.writeFileSync('app.js', newContent);
  console.log("Done phase 2!");
}

fixMenu();
