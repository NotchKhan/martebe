const fs = require('fs');
const { translate } = require('@vitalets/google-translate-api');

async function fixMenu() {
  console.log("Starting menu fix...");
  let content = fs.readFileSync('app.js', 'utf8');
  
  // Extract MENU array string
  let menuStart = content.indexOf('const MENU = [');
  let menuEnd = content.indexOf('];', menuStart);
  let menuStr = content.substring(menuStart + 'const MENU = '.length, menuEnd + 1);
  
  // Safely evaluate MENU
  let MENU;
  eval('MENU = ' + menuStr);
  
  // Also load restored items to be accurate for those 66 items
  const restoredMap = new Map();
  try {
    const restoredArr = require('./restored_items.json');
    for (let r of restoredArr) {
      // parse the string into an object to extract desc and weight
      let objStr = r[1];
      // It's a string like "{ id: 101, ... }"
      let matchDesc = objStr.match(/desc:\s*({[^}]+})/);
      let matchWeight = objStr.match(/weight:\s*'([^']+)'/);
      restoredMap.set(parseInt(r[0]), {
        descStr: matchDesc ? matchDesc[1] : null,
        weight: matchWeight ? matchWeight[1] : null
      });
    }
  } catch(e) { console.log('Error loading restored:', e); }

  const delay = ms => new Promise(res => setTimeout(res, ms));

  let newItems = [];
  
  for (let item of MENU) {
    let restoredInfo = restoredMap.get(item.id);
    let newDesc = null;
    let newNameZh = item.name.zh || '';
    let weight = restoredInfo ? restoredInfo.weight : null;

    if (restoredInfo && restoredInfo.descStr) {
      // Parse the desc object
      let dObj;
      eval('dObj = ' + restoredInfo.descStr);
      
      // We need to translate the description to Chinese since it wasn't there
      let zhDesc = '';
      try {
        let res = await translate(dObj.ru, { to: 'zh-CN' });
        zhDesc = res.text;
        await delay(100);
      } catch(e) { zhDesc = dObj.ru; }
      
      newDesc = { ru: dObj.ru, kz: dObj.kz, en: dObj.en, zh: zhDesc };
      
      // Fix name.zh if it looks like a description (long or ends with 。)
      if (item.name.zh && (item.name.zh.length > 10 || item.name.zh.includes('。'))) {
        try {
          let res = await translate(item.name.ru, { to: 'zh-CN' });
          newNameZh = res.text;
          await delay(100);
        } catch(e) { newNameZh = item.name.ru; }
      }
    } else {
      // We don't have restored info
      if (item.name.zh && (item.name.zh.length > 8 || item.name.zh.includes('。'))) {
        // It's a description
        let zhDesc = item.name.zh;
        let ruDesc = '', kzDesc = '', enDesc = '';
        try {
          let ruRes = await translate(zhDesc, { to: 'ru' }); await delay(100);
          ruDesc = ruRes.text;
          let kzRes = await translate(zhDesc, { to: 'kk' }); await delay(100);
          kzDesc = kzRes.text;
          let enRes = await translate(zhDesc, { to: 'en' }); await delay(100);
          enDesc = enRes.text;
        } catch(e) {}
        
        newDesc = { ru: ruDesc, kz: kzDesc, en: enDesc, zh: zhDesc };
        
        // Translate name.ru to zh
        try {
          let res = await translate(item.name.ru, { to: 'zh-CN' });
          newNameZh = res.text;
          await delay(100);
        } catch(e) { newNameZh = item.name.ru; }
      }
    }

    // Reconstruct item string
    let str = `  { id:${item.id}, cat:'${item.cat}', name: { ru: '${item.name.ru.replace(/'/g,"\\'")}', kz: '${item.name.kz.replace(/'/g,"\\'")}', en: '${item.name.en.replace(/'/g,"\\'")}', zh: '${newNameZh.replace(/'/g,"\\'")}' }`;
    if (weight) {
      str += `, weight:'${weight}'`;
    }
    if (newDesc) {
      str += `, desc: { ru: '${newDesc.ru.replace(/'/g,"\\'")}', kz: '${newDesc.kz.replace(/'/g,"\\'")}', en: '${newDesc.en.replace(/'/g,"\\'")}', zh: '${newDesc.zh.replace(/'/g,"\\'")}' }`;
    }
    str += `, price:${item.price}, origPrice:${item.origPrice}, img:'${item.img}', emoji:'${item.emoji}', gradient:['${item.gradient[0]}','${item.gradient[1]}'], rating:${item.rating}, reviews:${item.reviews} }`;
    
    newItems.push(str);
    console.log(`Processed ${item.id} - ${item.name.ru}`);
  }

  let newMenuBlock = 'const MENU = [\n' + newItems.join(',\n') + '\n];';
  let newContent = content.substring(0, menuStart) + newMenuBlock + content.substring(menuEnd + 2);
  fs.writeFileSync('app.js', newContent);
  console.log("Done!");
}

fixMenu();
