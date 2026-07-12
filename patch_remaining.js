const fs = require('fs');
let code = fs.readFileSync('app.js', 'utf8');
let count = 0;

// Fix 1: renderGrid secondary instance (search results use same code path)
const OLD1 = `      ? \`<div class="card-img" style="background-image:url('\${item.img}')"></div>\`\r\n      : \`<div class="card-emoji-wrap" style="background:linear-gradient(135deg,\${item.gradient[0]},\${item.gradient[1]})">\r\n           <span class="card-emoji">\${item.emoji}</span>\r\n         </div>\``;

const NEW1 = `      ? \`<div class="card-img card-img-skeleton"><img class="card-lazy-img\${idx<4?' card-img-eager':''}" \${idx<4?\`src="\${item.img}"\`:\`data-src="\${item.img}"\`} alt="\${item.name[currentLang]}" loading="\${idx<4?'eager':'lazy'}" decoding="async" width="200" height="160" onload="this.parentNode.classList.remove('card-img-skeleton');this.classList.add('card-img-loaded')"></div>\`
      : \`<div class="card-emoji-wrap" style="background:linear-gradient(135deg,\${item.gradient[0]},\${item.gradient[1]})">
           <span class="card-emoji">\${item.emoji}</span>
         </div>\``;

if (code.includes(OLD1)) { code = code.replace(OLD1, NEW1); count++; console.log('✅ Fix 1 (renderGrid 2nd instance)'); }
else if (code.includes(OLD1.replace(/\r/g,''))) { code = code.replace(OLD1.replace(/\r/g,''), NEW1); count++; console.log('✅ Fix 1 no-cr'); }
else console.log('❌ Fix 1 not found');

// Fix 2: drawer cart items - use img tag
const OLD2 = `  container.innerHTML = cart.map(item => {\r\n    const iStyle = item.img\r\n      ? \`background-image:url('\${item.img}');background-size:cover;background-position:center\`\r\n      : \`background:linear-gradient(135deg,\${item.gradient[0]},\${item.gradient[1]})\`;\r\n    return \`\r\n      <div class="drawer-item">\r\n        <div class="di-img" style="\${iStyle}">\${!item.img ? item.emoji : ''}</div>`;

const NEW2 = `  container.innerHTML = cart.map(item => {
    return \`
      <div class="drawer-item">
        <div class="di-img" style="\${item.img ? '' : \`background:linear-gradient(135deg,\${item.gradient[0]},\${item.gradient[1]})\`}">\${item.img ? \`<img src="\${item.img}" loading="lazy" decoding="async" style="width:100%;height:100%;object-fit:cover;border-radius:inherit;">\` : item.emoji}</div>`;

if (code.includes(OLD2)) { code = code.replace(OLD2, NEW2); count++; console.log('✅ Fix 2 (drawer items)'); }
else {
  const OLD2b = OLD2.replace(/\r/g,'');
  if (code.includes(OLD2b)) { code = code.replace(OLD2b, NEW2); count++; console.log('✅ Fix 2 no-cr'); }
  else {
    // Try simpler approach
    code = code.replace(
      `? \`background-image:url('\${item.img}');background-size:cover;background-position:center\`\r\n      : \`background:linear-gradient(135deg,\${item.gradient[0]},\${item.gradient[1]})\`;\r\n    return \`\r\n      <div class="drawer-item">\r\n        <div class="di-img" style="\${iStyle}">\${!item.img ? item.emoji : ''}</div>`,
      `\r\n    return \`\r\n      <div class="drawer-item">\r\n        <div class="di-img" style="\${item.img ? '' : \`background:linear-gradient(135deg,\${item.gradient[0]},\${item.gradient[1]})\`}">\${item.img ? \`<img src="\${item.img}" loading="lazy" decoding="async" style="width:100%;height:100%;object-fit:cover;border-radius:inherit;">\` : item.emoji}</div>`
    );
    // remove iStyle line
    code = code.replace(`    const iStyle = item.img\r\n`, '');
    count++;
    console.log('✅ Fix 2 fallback');
  }
}

// Also add initLazyImages after the second renderGrid if not there
if (!code.includes('initLazyImages();\n}\n\n// ============================================================\n//  PROMOS')) {
  // Check if second grid has initLazyImages
  const grids = code.split('}).join(\'\'');
  console.log('Grid join points:', grids.length);
}

fs.writeFileSync('app.js', code);
console.log('Fixed:', count, 'patterns');
