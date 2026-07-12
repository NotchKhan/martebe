const fs = require('fs');
let code = fs.readFileSync('app.js', 'utf8');

const OLD = `  // Keyboard\r\n  document.addEventListener('keydown', e => {\r\n    if (e.key === 'Escape') { closeModal(); closeDrawer(); closeSearch(); hideConfirm(); }\r\n  });\r\n});\r\n`;

const NEW = `  // Keyboard
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') { closeModal(); closeDrawer(); closeSearch(); hideConfirm(); }
  });

  // Hover/touchstart preload: load modal image before user taps
  document.addEventListener('mouseover', e => {
    const card = e.target.closest('.food-card, .menu-list-item, .promo-item-card, .pop-chip');
    if (!card) return;
    const onclick = card.getAttribute('onclick') || '';
    const match = onclick.match(/openModal\\((\\d+)\\)/);
    if (!match) return;
    const item = MENU.find(m => m.id === parseInt(match[1]));
    if (item && item.img) preloadImage(item.img);
  }, { passive: true });

  document.addEventListener('touchstart', e => {
    const card = e.target.closest('.food-card, .menu-list-item, .promo-item-card, .pop-chip');
    if (!card) return;
    const onclick = card.getAttribute('onclick') || '';
    const match = onclick.match(/openModal\\((\\d+)\\)/);
    if (!match) return;
    const item = MENU.find(m => m.id === parseInt(match[1]));
    if (item && item.img) preloadImage(item.img);
  }, { passive: true });
});
`;

if (code.includes(OLD)) {
  code = code.replace(OLD, NEW);
  fs.writeFileSync('app.js', code);
  console.log('✅ hover preload added');
} else {
  // Try with CRLF at end
  const idx = code.lastIndexOf('  // Keyboard');
  if (idx !== -1) {
    const snippet = code.slice(idx, idx + 200);
    console.log('Found keyboard at idx:', idx);
    console.log('Snippet:', JSON.stringify(snippet));
  } else {
    console.log('❌ Keyboard section not found');
  }
}
