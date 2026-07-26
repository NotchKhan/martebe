const fs = require('fs');
const src = fs.readFileSync('app.js', 'utf8');

// Extract MENU array
const start = src.indexOf('const MENU = [');
const end = src.indexOf('\nconst PROMOS', start);
const menuSrc = src.slice(start, end);

// Run it
eval(menuSrc);

const items = MENU.filter(m => m.origPrice || m.cat === 'combos');
console.log('Items in promo grid:');
items.forEach(i => {
  console.log(`  ID:${i.id} | ${i.name.ru} | cat:${i.cat} | origPrice:${i.origPrice} | img:${i.img}`);
});
