const fs = require('fs');
let content = fs.readFileSync('app.js', 'utf8');

// Sausages
content = content.replace(
  /{ id:102, cat:'breakfasts', name: { ru: 'Сосиски вареные',([^}]+)}, weight:'200 г', desc: {([^}]+)}, price:600/g,
  "{ id:102, cat:'breakfasts', name: { ru: 'Сосиски вареные',$1}, weight:'200 г', desc: {$2}, price:300"
);

content = content.replace(
  /{ id:103, cat:'breakfasts', name: { ru: 'Сосиски жареные',([^}]+)}, weight:'200 г', desc: {([^}]+)}, price:600/g,
  "{ id:103, cat:'breakfasts', name: { ru: 'Сосиски жареные',$1}, weight:'200 г', desc: {$2}, price:300"
);

// Cabin 3
content = content.replace(
  /{ id: 3, name: { ru: 'ВИП караоке зона',([^}]+)}, desc: {([^}]+)}, capacity: { ru: 'до 12 человек', kz: '12 адамға дейін', en: 'up to 12 people', zh: '最多12人' }/g,
  "{ id: 3, name: { ru: 'ВИП караоке зона',$1}, desc: {$2}, capacity: { ru: 'до 10 человек', kz: '10 адамға дейін', en: 'up to 10 people', zh: '最多10人' }"
);

fs.writeFileSync('app.js', content);
console.log('Edits applied.');
