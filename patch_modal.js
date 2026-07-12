const fs = require('fs');
let code = fs.readFileSync('app.js', 'utf8');

// Fix modal to use img tag instead of background-image
const OLD = `  const imgEl = document.getElementById('modal-img-el');\r\n  if (item.img) {\r\n    imgEl.style.background      = 'var(--bg)';\r\n    imgEl.style.backgroundImage = \`url('\${item.img}')\`;\r\n    imgEl.style.backgroundSize  = 'cover';\r\n    imgEl.style.backgroundPosition = 'center';\r\n    imgEl.innerHTML = '';\r\n  } else {\r\n    imgEl.style.backgroundImage = 'none';\r\n    imgEl.style.background      = \`linear-gradient(135deg,\${item.gradient[0]},\${item.gradient[1]})\`;\r\n    imgEl.innerHTML = \`<span class="modal-emoji-big">\${item.emoji}</span>\`;\r\n  }`;

const NEW = `  const imgEl = document.getElementById('modal-img-el');
  if (item.img) {
    imgEl.style.background = 'var(--bg)';
    imgEl.style.backgroundImage = 'none';
    // Use <img> so browser reuses already-cached WebP from card grid
    imgEl.innerHTML = \`<img src="\${item.img}" alt="\${item.name[currentLang]}" loading="eager" decoding="async" style="width:100%;height:100%;object-fit:cover;object-position:center;display:block;">\`;
  } else {
    imgEl.style.backgroundImage = 'none';
    imgEl.style.background = \`linear-gradient(135deg,\${item.gradient[0]},\${item.gradient[1]})\`;
    imgEl.innerHTML = \`<span class="modal-emoji-big">\${item.emoji}</span>\`;
  }`;

if (code.includes(OLD)) {
  code = code.replace(OLD, NEW);
  console.log('✅ openModal patched');
} else {
  console.log('⚠️ OLD not found, trying without \\r...');
  const OLD2 = OLD.replace(/\r/g, '');
  if (code.includes(OLD2)) {
    code = code.replace(OLD2, NEW);
    console.log('✅ openModal patched (no-cr)');
  } else {
    console.log('❌ Could not find modal code. Manual fix needed.');
  }
}

// Also fix drawer cart items to use img tags
const OLD_DRAWER = `    const iStyle = item.img
      ? \`background-image:url('\${item.img}');background-size:cover;background-position:center\`
      : \`background:linear-gradient(135deg,\${item.gradient[0]},\${item.gradient[1]})\`;
    return \`
      <div class="drawer-item">
        <div class="di-img" style="\${iStyle}">\${!item.img ? item.emoji : ''}</div>`;

const NEW_DRAWER = `    return \`
      <div class="drawer-item">
        <div class="di-img" style="\${item.img ? '' : \`background:linear-gradient(135deg,\${item.gradient[0]},\${item.gradient[1]})\`}">\${item.img ? \`<img src="\${item.img}" loading="lazy" decoding="async" style="width:100%;height:100%;object-fit:cover;border-radius:inherit;">\` : item.emoji}</div>`;

if (code.includes(OLD_DRAWER.replace(/\r/g,''))) {
  code = code.replace(OLD_DRAWER.replace(/\r/g,''), NEW_DRAWER);
  console.log('✅ drawer items patched');
} else if (code.includes(OLD_DRAWER)) {
  code = code.replace(OLD_DRAWER, NEW_DRAWER);
  console.log('✅ drawer items patched (with cr)');
} else {
  console.log('⚠️ drawer pattern not found - skipping');
}

fs.writeFileSync('app.js', code);
console.log('✅ Done');
