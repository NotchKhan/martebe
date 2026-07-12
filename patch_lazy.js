// patch_lazy.js — патчит renderGrid и renderPromos для lazy loading
const fs = require('fs');

let code = fs.readFileSync('app.js', 'utf8');

// ─── 1. renderGrid: replace card-img background-image with real <img> ────────
const OLD_CARD_IMG = `  grid.style.display = '';
  grid.innerHTML = items.map((item, idx) => {
    const disc = item.origPrice ? Math.round((1 - item.price / item.origPrice) * 100) : null;
    const imgHtml = item.img
      ? \`<div class="card-img" style="background-image:url('\${item.img}')"></div>\`
      : \`<div class="card-emoji-wrap" style="background:linear-gradient(135deg,\${item.gradient[0]},\${item.gradient[1]})">
           <span class="card-emoji">\${item.emoji}</span>
         </div>\`;
    return \`
      <div class="food-card" onclick="openModal(\${item.id})"
           style="animation-delay:\${Math.min(idx,8)*0.05}s" role="listitem">
        <div class="card-img-wrap">
          \${imgHtml}
          \${disc ? \`<div class="card-disc-badge">-\${disc}%</div>\` : (item.isHit ? \`<div class="card-hit-badge">HIT</div>\` : (item.isNew ? \`<div class="card-new-badge">NEW</div>\` : ''))}
          <div class="card-ctrl-slot" data-cid="\${item.id}">\${cardCtrlHtml(item.id)}</div>
        </div>
        <div class="card-body">
          <div class="card-price-row">
            <span class="card-price">\${item.price.toLocaleString('ru-RU')} ₸</span>
            \${item.origPrice ? \`<span class="card-orig">\${item.origPrice.toLocaleString('ru-RU')} ₸</span>\` : ''}
          </div>
          <div class="card-name">\${item.name[currentLang]}</div>
          \${item.rating ? \`<div class="card-rating">\${'⭐'.repeat(Math.round(item.rating/20))} <span style="color:var(--text-muted);font-size:0.7rem">(\${item.reviews})</span></div>\` : ''}
        </div>
      </div>\`;
  }).join('');
}`;

const NEW_CARD_IMG = `  grid.style.display = '';
  grid.innerHTML = items.map((item, idx) => {
    const disc = item.origPrice ? Math.round((1 - item.price / item.origPrice) * 100) : null;
    const isEager = idx < 4;
    const imgHtml = item.img
      ? \`<div class="card-img card-img-skeleton">
           <img class="card-lazy-img\${isEager ? ' card-img-eager' : ''}"
                \${isEager ? \`src="\${item.img}"\` : \`data-src="\${item.img}"\`}
                alt="\${item.name[currentLang]}"
                loading="\${isEager ? 'eager' : 'lazy'}"
                decoding="async"
                width="200" height="160"
                onload="this.parentNode.classList.remove('card-img-skeleton');this.classList.add('card-img-loaded')">
         </div>\`
      : \`<div class="card-emoji-wrap" style="background:linear-gradient(135deg,\${item.gradient[0]},\${item.gradient[1]})">
           <span class="card-emoji">\${item.emoji}</span>
         </div>\`;
    return \`
      <div class="food-card" onclick="openModal(\${item.id})"
           style="animation-delay:\${Math.min(idx,8)*0.05}s" role="listitem">
        <div class="card-img-wrap">
          \${imgHtml}
          \${disc ? \`<div class="card-disc-badge">-\${disc}%</div>\` : (item.isHit ? \`<div class="card-hit-badge">HIT</div>\` : (item.isNew ? \`<div class="card-new-badge">NEW</div>\` : ''))}
          <div class="card-ctrl-slot" data-cid="\${item.id}">\${cardCtrlHtml(item.id)}</div>
        </div>
        <div class="card-body">
          <div class="card-price-row">
            <span class="card-price">\${item.price.toLocaleString('ru-RU')} ₸</span>
            \${item.origPrice ? \`<span class="card-orig">\${item.origPrice.toLocaleString('ru-RU')} ₸</span>\` : ''}
          </div>
          <div class="card-name">\${item.name[currentLang]}</div>
          \${item.rating ? \`<div class="card-rating">\${'⭐'.repeat(Math.round(item.rating/20))} <span style="color:var(--text-muted);font-size:0.7rem">(\${item.reviews})</span></div>\` : ''}
        </div>
      </div>\`;
  }).join('');
  initLazyImages();
}`;

// ─── 2. renderPromos: replace pic-img background-image with real <img> ────────
const OLD_PROMO_IMG = `    const imgStyle = item.img
      ? \`background-image:url('\${item.img}');background-size:cover;background-position:center\`
      : \`background:linear-gradient(135deg,\${item.gradient[0]},\${item.gradient[1]})\`;
    return \`
      <div class="promo-item-card" onclick="openModal(\${item.id})"
           style="animation-delay:\${Math.min(idx,8)*0.05}s">
        <div class="pic-img" style="\${imgStyle}">
          \${!item.img ? \`<span style="font-size:3rem;filter:drop-shadow(0 3px 10px rgba(0,0,0,.2))">\${item.emoji}</span>\` : ''}
          <div class="pic-disc">-\${pct}%</div>
        </div>\``;

const NEW_PROMO_IMG = `    return \`
      <div class="promo-item-card" onclick="openModal(\${item.id})"
           style="animation-delay:\${Math.min(idx,8)*0.05}s">
        <div class="pic-img pic-img-skeleton\${item.img ? '' : ' pic-img-gradient'}" \${!item.img ? \`style="background:linear-gradient(135deg,\${item.gradient[0]},\${item.gradient[1]})"\` : ''}>
          \${item.img
            ? \`<img class="card-lazy-img" data-src="\${item.img}" alt="\${item.name[currentLang]}" loading="lazy" decoding="async" width="200" height="150" onload="this.parentNode.classList.remove('pic-img-skeleton');this.classList.add('card-img-loaded')">\`
            : \`<span style="font-size:3rem;filter:drop-shadow(0 3px 10px rgba(0,0,0,.2))">\${item.emoji}</span>\`
          }
          <div class="pic-disc">-\${pct}%</div>
        </div>\``;

if (code.includes(OLD_CARD_IMG.slice(0, 80))) {
  code = code.replace(OLD_CARD_IMG, NEW_CARD_IMG);
  console.log('✅ renderGrid patched');
} else {
  console.log('⚠️  renderGrid OLD pattern not found exactly, trying fallback...');
  // Fallback: just replace the background-image line
  code = code.replace(
    `? \`<div class="card-img" style="background-image:url('\${item.img}')"></div>\``,
    `? \`<div class="card-img card-img-skeleton"><img class="card-lazy-img\${idx<4?' card-img-eager':''}" \${idx<4?\`src="\${item.img}"\`:\`data-src="\${item.img}"\`} alt="\${item.name[currentLang]}" loading="\${idx<4?'eager':'lazy'}" decoding="async" width="200" height="160" onload="this.parentNode.classList.remove('card-img-skeleton');this.classList.add('card-img-loaded')"></div>\``
  );
  // Also add initLazyImages() call
  code = code.replace(
    `  }).join('');\n}\n\n// ============================================================\n//  PROMOS SECTION`,
    `  }).join('');\n  initLazyImages();\n}\n\n// ============================================================\n//  PROMOS SECTION`
  );
  console.log('✅ renderGrid fallback patched');
}

if (code.includes(OLD_PROMO_IMG.slice(0, 60))) {
  code = code.replace(OLD_PROMO_IMG, NEW_PROMO_IMG);
  console.log('✅ renderPromos patched');
} else {
  // Fallback for promo
  code = code.replace(
    `\`background-image:url('\${item.img}');background-size:cover;background-position:center\``,
    `null`
  );
  code = code.replace(
    `<div class="pic-img" style="\${imgStyle}">`,
    `<div class="pic-img pic-img-skeleton" style="\${item.img ? '' : \`background:linear-gradient(135deg,\${item.gradient[0]},\${item.gradient[1]})\`}">`
  );
  console.log('⚠️  renderPromos partial fallback');
}

fs.writeFileSync('app.js', code);
console.log('✅ app.js saved');
