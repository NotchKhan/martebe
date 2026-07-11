
  let window = {};
  let document = { addEventListener: () => {}, getElementById: () => ({ addEventListener: () => {} }), querySelectorAll: () => [] };
  let localStorage = { getItem: () => null, setItem: () => {} };
  let navigator = { language: 'ru' };
  let location = { search: '' };
  let fetch = () => Promise.resolve();
  // ============================================================
//  MARTEBE — 4-Section Mobile App  |  app.js
// ============================================================

// WhatsApp Numbers
const WA_ORDER   = '77021101155';
const WA_BOOKING = '77029870200';

// ── I18N DICTIONARY ───────────────────────────────────────────
const I18N = {
  search_placeholder: { ru: 'Найти блюдо...', kz: 'Тағамды іздеу...', en: 'Search food...', zh: '找个菜...' },
  search_close:       { ru: 'Отмена', kz: 'Болдырмау', en: 'Cancel', zh: '取消' },
  header_loc:         { ru: '📍 Сарыагаш · Кошербаева 1А', kz: '📍 Сарыағаш · Қошербаев 1А', en: '📍 Saryagash · Kosherbayeva 1A', zh: '📍 萨雷阿加什 · Kosherbayeva 1A' },
  home_hero_tag:      { ru: '🌟 Казахский и европейский ресторан', kz: '🌟 Қазақ және еуропалық мейрамхана', en: '🌟 Kazakh & European Restaurant', zh: '🌟 哈萨克欧式餐厅' },
  home_hero_sub:      { ru: 'Еда на любой случай: если хочешь мясо то стейк и шашлык, хочешь экзотику - турецкие блюда, быстро - фаст фуд и даже европейское.<br>Заказ онлайн через WhatsApp 💬', kz: 'Кез келген талғамға сай тамақ: ет қаласаңыз стейк пен кәуап, экзотика қаласаңыз - түрік тағамдары, тез - фаст фуд және еуропалық тағамдар.<br>WhatsApp арқылы онлайн тапсырыс 💬', en: 'Food for any occasion: steaks & kebabs for meat lovers, Turkish dishes for exotic taste, fast food, and European cuisine.<br>Order online via WhatsApp 💬', zh: '适合任何场合的食物：如果您想要肉，那么牛排和烤肉串，如果您想要异国情调 - 土耳其菜肴、快餐，甚至欧洲菜。<br>通过 WhatsApp 在线订购 💬' },
  ha_order:           { ru: 'ЗАКАЗАТЬ', kz: 'ТАПСЫРЫС', en: 'ORDER', zh: '命令' },
  ha_order_sub:       { ru: '40+ блюд', kz: '40+ тағам', en: '40+ dishes', zh: '40+菜品' },
  ha_promos:          { ru: 'Акции', kz: 'Акциялар', en: 'Promos', zh: '库存' },
  ha_promos_sub:      { ru: 'Скидки до 20%', kz: '20% дейін жеңілдіктер', en: 'Up to 20% off', zh: '折扣高达 20%' },
  ha_cabins:          { ru: 'VIP Кабинки', kz: 'VIP Кабиналар', en: 'VIP Cabins', zh: '贵宾舱' },
  ha_cabins_sub:      { ru: 'Бронь для компаний (3 кабинки)', kz: 'Компанияларға арналған (3 кабина)', en: 'Booking for groups (3 cabins)', zh: '公司预订（3间）' },
  ha_about:           { ru: 'Контакты и адрес', kz: 'Байланыс және мекенжай', en: 'Contacts & Address', zh: '联系方式和地址' },
  ha_about_sub:       { ru: 'Где мы находимся', kz: 'Біз қайда орналасқанбыз', en: 'Where to find us', zh: '我们位于哪里' },
  home_popular:       { ru: 'Популярное', kz: 'Танымал', en: 'Popular', zh: '受欢迎的' },
  home_see_all:       { ru: 'Всё меню →', kz: 'Барлық мәзір →', en: 'Full menu →', zh: '所有菜单 →' },
  promos_title:       { ru: 'Акции и скидки', kz: 'Акциялар мен жеңілдіктер', en: 'Promos & Discounts', zh: '促销和折扣' },
  promos_sub:         { ru: 'Специальные предложения только здесь и сейчас', kz: 'Арнайы ұсыныстар тек осында және қазір', en: 'Special offers only here and now', zh: '仅限此时此地的特别优惠' },
  promos_items:       { ru: 'Блюда по акции', kz: 'Акциядағы тағамдар', en: 'Discounted items', zh: '提供菜品' },
  promo_coffee_title: { ru: '10-й Кофе в подарок!', kz: '10-шы Кофе сыйлыққа!', en: '10th Coffee for free!', zh: '第十杯咖啡作为礼物！' },
  promo_coffee_sub:   { ru: 'Сохраняйте чеки и обменивайте на бесплатный кофе', kz: 'Чектерді сақтап, тегін кофеге айырбастаңыз', en: 'Save receipts and exchange for free coffee', zh: '保存您的收据并兑换免费咖啡' },
  cabins_title:       { ru: 'VIP Кабинки', kz: 'VIP Кабиналар', en: 'VIP Cabins', zh: '贵宾舱' },
  cabins_sub:         { ru: 'Уютные уединённые зоны для вашего отдыха. 3 кабинки на выбор.', kz: 'Демалуға арналған жайлы оқшауланған аймақтар. Таңдауға 3 кабина.', en: 'Cozy secluded areas for your rest. 3 cabins to choose from.', zh: '舒适、僻静的区域供您放松。 3间小屋可供选择。' },
  about_logo_sub:     { ru: '📍 Казахский ресторан · Сарыагаш', kz: '📍 Қазақ мейрамханасы · Сарыағаш', en: '📍 Kazakh restaurant · Saryagash', zh: '📍 哈萨克餐厅 · 萨雷阿加什' },
  about_logo_desc:    { ru: 'Мы находимся в Сарыагаше, улица Кошербаева 1А. Готовим с душой, используя только свежие местные продукты и традиционные рецепты.', kz: 'Біз Сарыағашта, Қошербаев көшесі 1А орналасқанбыз. Тек жаңа піскен жергілікті өнімдер мен дәстүрлі рецепттерді қолданып, шын жүректен дайындаймыз.', en: 'We are located in Saryagash, Kosherbayeva 1A. We cook with soul, using only fresh local products and traditional recipes.', zh: '我们位于 萨雷阿加什, Kosherbayeva 1A。 我们用心烹饪，只使用新鲜的当地食材和传统食谱。' },
  about_address_val:  { ru: 'Сарыагаш, Кошербаева 1А', kz: 'Сарыағаш, Қошербаев 1А', en: 'Saryagash, Kosherbayeva 1A', zh: '萨雷阿加什，Kosherbayeva 1A' },
  about_address:      { ru: 'Адрес', kz: 'Мекенжай', en: 'Address', zh: '地址' },
  about_floor:        { ru: '1-2 этаж', kz: '1-2 қабат', en: '1st-2nd floor', zh: '1-2楼' },
  about_hours:        { ru: 'Часы работы', kz: 'Жұмыс уақыты', en: 'Working Hours', zh: '开放时间' },
  about_daily:        { ru: 'ежедневно', kz: 'күн сайын', en: 'daily', zh: '日常的' },
  about_phone:        { ru: 'Телефон', kz: 'Телефон', en: 'Phone', zh: '电话' },
  about_payment:      { ru: 'Оплата', kz: 'Төлем', en: 'Payment', zh: '支付' },
  about_payment_methods: { ru: 'Картой, Наличными, Перевод, QR-код', kz: 'Карта, Қолма-қол ақша, Аударым, QR-код', en: 'Card, Cash, Transfer, QR-code', zh: '卡、现金、转账、二维码' },
  about_btn_delivery: { ru: 'Заказать доставку', kz: 'Жеткізуге тапсырыс беру', en: 'Order Delivery', zh: '订单发货' },
  about_btn_book:     { ru: 'Бронь столика в зале', kz: 'Залдан үстелге тапсырыс беру', en: 'Book a table in the hall', zh: '预订大厅的桌子' },
  cart_bar_label:     { ru: 'Перейти в корзину', kz: 'Себетке өту', en: 'Go to cart', zh: '去购物车' },
  tab_home:           { ru: 'Главная', kz: 'Басты', en: 'Home', zh: '家' },
  tab_menu:           { ru: 'Меню', kz: 'Мәзір', en: 'Menu', zh: '菜单' },
  tab_promos:         { ru: 'Акции', kz: 'Акциялар', en: 'Promos', zh: '库存' },
  tab_about:          { ru: 'О нас', kz: 'Біз туралы', en: 'About', zh: '关于我们' },
  modal_add:          { ru: 'В корзину', kz: 'Себетке', en: 'Add to cart', zh: '添加到购物车' },
  drawer_title:       { ru: 'Ваш заказ', kz: 'Сіздің тапсырысыңыз', en: 'Your Order', zh: '您的订单' },
  drawer_clear:       { ru: 'Сбросить', kz: 'Тазарту', en: 'Clear', zh: '重置' },
  drawer_empty:       { ru: 'Корзина пуста.<br>Добавьте любимые блюда!', kz: 'Себет бос.<br>Сүйікті тағамдарыңызды қосыңыз!', en: 'Cart is empty.<br>Add your favorite dishes!', zh: '购物车是空的。<br>添加您最喜欢的菜肴！' },
  order_type_label:   { ru: 'Способ получения:', kz: 'Алу тәсілі:', en: 'Order Type:', zh: '获取方法：' },
  ot_takeaway:        { ru: 'С собой', kz: 'Өзімен бірге', en: 'Takeaway', zh: '与你' },
  ot_dinein:          { ru: 'В заведении', kz: 'Мейрамханада', en: 'Dine-in', zh: '在机构内' },
  ot_delivery:        { ru: 'Доставка', kz: 'Жеткізу', en: 'Delivery', zh: '送货' },
  delivery_address:   { ru: 'Ваш адрес...', kz: 'Мекенжайыңыз...', en: 'Your address...', zh: '你的地址...' },
  delivery_warn:      { ru: '⚠️ Внимание: если адрес не на "Таможне", доставку оплачивает клиент (мы отправим заказ на такси).', kz: '⚠️ Назар аударыңыз: егер мекенжай "Таможняда" болмаса, жеткізуді клиент төлейді (біз тапсырысты таксимен жібереміз).', en: '⚠️ Attention: if the address is not at "Tamozhnya", delivery is paid by the client (we will send the order by taxi).', zh: '⚠️注意：如果地址不是“海关”，则运费由客户支付（我们将通过出租车发送订单）。' },
  dinein_warn:        { ru: '+12% за обслуживание будет добавлено к сумме', kz: '+12% қызмет көрсету үшін сомаға қосылады', en: '+12% service charge will be added to the total', zh: '+12% 服务费将添加到金额中' },
  drawer_total_label: { ru: 'Итого:', kz: 'Барлығы:', en: 'Total:', zh: '全部的：' },
  order_whatsapp:     { ru: 'Заказать через WhatsApp', kz: 'WhatsApp арқылы тапсырыс беру', en: 'Order via WhatsApp', zh: '通过 WhatsApp 订购' },
  search_empty:       { ru: 'Ничего не найдено', kz: 'Ештеңе табылмады', en: 'Nothing found', zh: '没有找到任何内容' },
  drinks_empty:       { ru: 'Меню напитков скоро появится!', kz: 'Сусындар мәзірі жақында шығады!', en: 'Drinks menu coming soon!', zh: '饮品菜单即将推出！' },
  plural_pos:         { ru: ['позиция','позиции','позиций'], kz: ['тағам','тағам','тағам'], en: ['item','items','items'], zh: ['位置', '职位', '职位'] }
};

// ── SUPER CATEGORIES (top-level tabs) ─────────────────────────
const SUPER_CATEGORIES = [
  { key: 'food',    label: { ru: 'Блюда', kz: 'Тағамдар', en: 'Food', zh: '菜肴' }            },
  { key: 'fastfood_super', label: { ru: 'Фаст-фуд', kz: 'Фаст-фуд', en: 'Fast food', zh: '快餐' } },
  { key: 'drinks',  label: { ru: 'Напитки', kz: 'Сусындар', en: 'Drinks', zh: '饮料' }          },
  { key: 'bread',   label: { ru: 'Хлебные изделия', kz: 'Нан өнімдері', en: 'Bread', zh: '面包制品' }  },
  { key: 'banquet', label: { ru: 'Банкеты', kz: 'Банкеттер', en: 'Banquet', zh: '宴会' }          },
];


// Maps super-cat → which sub-cats belong to it
const SUPER_CAT_MAP = {
  food:    ['breakfasts','salads','first','second','steaks','sauces'],
  fastfood_super: ['pizza','burgers','lavash','fastfood'],
  drinks:  ['drinks'],
  bread:   ['bread'],
  banquet: ['assorted','banquet'],
};

// ── CATEGORIES (sub-nav) ────────────────────────────────────────
const CATEGORIES = [
  { key: 'breakfasts', label: { ru: 'Завтраки', kz: 'Таңғы ас', en: 'Breakfasts', zh: '早餐' },         superCat: 'food'    },
  { key: 'salads',     label: { ru: 'Салаты', kz: 'Салаттар', en: 'Salads', zh: '沙拉' },            superCat: 'food'    },
  { key: 'first',      label: { ru: 'Первые блюда', kz: 'Бірінші тағамдар', en: 'First courses', zh: '第一门课程' },      superCat: 'food'    },
  { key: 'second',     label: { ru: 'Вторые блюда', kz: 'Екінші тағамдар', en: 'Main courses', zh: '第二门课程' },      superCat: 'food'    },
  { key: 'pizza',      label: { ru: 'Пицца', kz: 'Пицца', en: 'Pizza', zh: '比萨' },             superCat: 'fastfood_super' },
  { key: 'burgers',    label: { ru: 'Бургеры', kz: 'Бургерлер', en: 'Burgers', zh: '汉堡' },       superCat: 'fastfood_super' },
  { key: 'lavash',     label: { ru: 'Лаваш', kz: 'Лаваш', en: 'Lavash', zh: '皮塔饼' },            superCat: 'fastfood_super' },
  { key: 'fastfood',   label: { ru: 'Еще', kz: 'Тағы', en: 'More', zh: '更多的' },                 superCat: 'fastfood_super' },
  { key: 'steaks',     label: { ru: 'Стейки<br>и шашлыки', kz: 'Стейктер<br>және кәуаптар', en: 'Steaks<br>& Kebabs', zh: '牛排<br>和烤肉串' }, superCat: 'food'  },
  { key: 'sauces',     label: { ru: 'Соусы<br>и гарниры', kz: 'Тұздықтар<br>және гарнирлер', en: 'Sauces<br>& Sides', zh: '酱汁<br>和配菜' },  superCat: 'food'    },
  { key: 'drinks',     label: { ru: 'Напитки', kz: 'Сусындар', en: 'Drinks', zh: '饮料' },           superCat: 'drinks'  },
  { key: 'bread',      label: { ru: 'Хлебные изделия', kz: 'Нан өнімдері', en: 'Bread', zh: '面包制品' },   superCat: 'bread'   },
  { key: 'assorted',   label: { ru: 'Ассорти', kz: 'Ассорти', en: 'Assorted', zh: '什锦' },           superCat: 'banquet' },
  { key: 'banquet',    label: { ru: 'Банкетные блюда', kz: 'Банкет тағамдары', en: 'Banquet dishes', zh: '宴会菜品' },   superCat: 'banquet' },
];

// ── MENU DATA ─────────────────────────────────────────────────
const MENU = [
  { id:101, cat:'breakfasts', name: { ru: 'Рисовая каша', kz: 'Күріш ботқасы', en: 'Rice porridge', zh: 'Рисовая каша' }, weight:'250 г', desc: { ru: 'Нежная рисовая каша на молоке со сливочным маслом.', kz: 'Сары май қосылған сүттегі күріш ботқасы.', en: 'Milk rice porridge with butter.', zh: 'Нежная рисовая каша на молоке со сливочным маслом.' }, price:900, origPrice:null, img:'images/riceporridge.png', emoji:'🥣', gradient:['#E0E0E0','#F5F5F5'], rating:95, reviews:10 },
  { id:102, cat:'breakfasts', name: { ru: 'Сосиски вареные', kz: 'Қайнатылған шұжық', en: 'Boiled sausages', zh: 'Сосиски вареные' }, weight:'200 г', desc: { ru: 'Горячие классические сосиски (отварные).', kz: 'Ыстық классикалық қайнатылған шұжықтар.', en: 'Hot classic boiled sausages.', zh: 'Горячие классические сосиски (отварные).' }, price:300, origPrice:null, img:'images/варенныйсосиска.png', emoji:'🌭', gradient:['#E63946','#F18A93'], rating:90, reviews:8 },
  { id:103, cat:'breakfasts', name: { ru: 'Сосиски жареные', kz: 'Қуырылған шұжық', en: 'Fried sausages', zh: 'Сосиски жареные' }, weight:'200 г', desc: { ru: '', kz: '', en: '', zh: '多汁的香肠（油炸），外皮酥脆。' }, price:300, origPrice:null, img:'images/sososki.png', emoji:'🌭', gradient:['#E63946','#F18A93'], rating:92, reviews:12 },
  { id:104, cat:'breakfasts', name: { ru: 'Яйцо вареное', kz: 'Қайнатылған жұмыртқа', en: 'Boiled egg', zh: 'Яйцо вареное' }, weight:'150 г', desc: { ru: 'Отварное яйцо, идеальное для легкого завтрака.', kz: 'Жеңіл таңғы асқа арналған қайнатылған жұмыртқа.', en: 'Boiled egg for a light breakfast.', zh: 'Отварное яйцо, идеальное для легкого завтрака.' }, price:300, origPrice:null, img:'images/варенныйяйцо.png', emoji:'🥚', gradient:['#F57F17','#FFF59D'], rating:90, reviews:11 },
  { id:105, cat:'breakfasts', name: { ru: 'Яйцо жареное', kz: 'Қуырылған жұмыртқа', en: 'Fried egg', zh: 'Яйцо жареное' }, weight:'150 г', desc: { ru: 'Классическое жареное яйцо.', kz: 'Классикалық қуырылған жұмыртқа.', en: 'Classic fried egg.', zh: 'Классическое жареное яйцо.' }, price:300, origPrice:null, img:'images/egg.png', emoji:'🍳', gradient:['#F57F17','#FFF59D'], rating:92, reviews:15 },
  { id:106, cat:'breakfasts', name: { ru: 'Сырники', kz: 'Сырниктер', en: 'Cottage pancakes', zh: 'Сырники' }, desc: { ru: '', kz: '', en: '', zh: '精致的干酪煎饼配酸奶油和果酱。' }, price:1250, origPrice:null, img:'images/syrniki.png', emoji:'🥞', gradient:['#F4A460','#FFDAB9'], rating:96, reviews:22 },
  { id:107, cat:'breakfasts', name: { ru: 'Шакшука с сыром', kz: 'Ірімшікпен шакшука', en: 'Shakshuka with cheese', zh: 'Шакшука с сыром' }, desc: { ru: '', kz: '', en: '', zh: '鸡蛋用辣番茄酱和奶酪炖。' }, price:1450, origPrice:null, img:'images/шакшукассыром.png', emoji:'🍳', gradient:['#D84315','#FF8A65'], rating:95, reviews:40 },
  { id:108, cat:'breakfasts', name: { ru: 'Омлет с моцареллой', kz: 'Моцарелла қосылған омлет', en: 'Mozzarella Omelet', zh: 'Омлет с моцареллой' }, desc: { ru: '', kz: '', en: '', zh: '蓬松的煎蛋卷配上精致的马苏里拉奶酪。' }, price:1200, origPrice:null, img:'images/омлетсмоцореллой.png', emoji:'🍳', gradient:['#FFB300','#FFE082'], rating:94, reviews:35 },
  { id:109, cat:'breakfasts', name: { ru: 'Омлет овощной', kz: 'Көкөніс омлеті', en: 'Vegetable Omelet', zh: 'Омлет овощной' }, desc: { ru: '', kz: '', en: '', zh: '轻盈通风的煎蛋卷，配以新鲜蔬菜和香草。' }, price:950, origPrice:null, img:'images/омлетовощной.png', emoji:'🍳', gradient:['#4CAF50','#A5D6A7'], rating:92, reviews:28 },
  { id:201, cat:'salads', name: { ru: 'Хрустящий баклажан', kz: 'Хрустящий баклажан', en: 'Crispy eggplant', zh: 'Хрустящий баклажан' }, desc: { ru: '', kz: '', en: '', zh: '热沙拉配脆茄子和招牌酱。' }, price:2390, origPrice:null, img:'images/хрустящий баклажан.png', emoji:'🍆', gradient:['#4A148C','#AB47BC'], rating:98, reviews:34 },
  { id:202, cat:'salads', name: { ru: 'Мужской каприз', kz: 'Мужской каприз', en: 'Men\'s caprice', zh: 'Мужской каприз' }, desc: { ru: '', kz: '', en: '', zh: '丰盛的肉类沙拉，配牛肉、奶酪和鸡蛋。' }, price:1850, origPrice:null, img:'images/мужской каприз.png', emoji:'🥩', gradient:['#3E2723','#5D4037'], rating:95, reviews:40 },
  { id:203, cat:'salads', name: { ru: 'Салат Мәртебе', kz: 'Мәртебе салаты', en: 'Martebe salad', zh: 'Салат Мәртебе' }, weight:'230 г', desc: { ru: 'Фирменный салат со свежими овощами и особым соусом.', kz: 'Жаңа піскен көкөністер мен арнайы тұздық қосылған фирмалық салат.', en: 'Signature salad with fresh vegetables and special sauce.', zh: 'Фирменный салат со свежими овощами и особым соусом.' }, price:3000, origPrice:null, img:'images/мәртебесалаты.png', emoji:'🥗', gradient:['#1B5E20','#4CAF50'], rating:99, reviews:55 },
  { id:204, cat:'salads', name: { ru: 'Оливье с мясом', kz: 'Етпен оливье', en: 'Olivier with meat', zh: 'Оливье с мясом' }, weight:'200 г', desc: { ru: 'Традиционный салат Оливье с нежной говядиной.', kz: 'Сиыр еті қосылған дәстүрлі Оливье салаты.', en: 'Traditional Olivier salad with tender beef.', zh: 'Традиционный салат Оливье с нежной говядиной.' }, price:1790, origPrice:null, img:'images/оливьесмясом4.png', emoji:'🥗', gradient:['#4CAF50','#81C784'], rating:93, reviews:28 },
  { id:205, cat:'salads', name: { ru: 'Греческий', kz: 'Грек салаты', en: 'Greek salad', zh: 'Греческий' }, weight:'220 г', desc: { ru: '', kz: '', en: '', zh: '清淡沙拉配新鲜蔬菜、羊奶酪和橄榄。' }, price:1890, origPrice:null, img:'images/греческий.png', emoji:'🥗', gradient:['#FF9800','#FFE082'], rating:94, reviews:32 },
  { id:206, cat:'salads', name: { ru: 'Тайский салат', kz: 'Тай салаты', en: 'Thai salad', zh: 'Тайский салат' }, desc: { ru: '', kz: '', en: '', zh: '辛辣的泰式沙拉配牛肉和原味调料。' }, price:1990, origPrice:null, img:'images/таискийсалат.png', emoji:'🥗', gradient:['#E64A19','#FF8A65'], rating:95, reviews:48 },
  { id:207, cat:'salads', name: { ru: 'Салат Ачичук', kz: 'Ачичук салаты', en: 'Achichuk salad', zh: 'Салат Ачичук' }, desc: { ru: '', kz: '', en: '', zh: '传统的东方新鲜西红柿和洋葱沙拉。' }, price:1290, origPrice:null, img:'images/салатачичук.png', emoji:'🍅', gradient:['#D32F2F','#EF5350'], rating:94, reviews:36 },
  { id:208, cat:'salads', name: { ru: 'Свежий салат', kz: 'Свежий салат', en: 'Fresh salad', zh: 'Свежий салат' }, desc: { ru: '', kz: '', en: '', zh: '新鲜黄瓜和西红柿的淡维生素混合物。' }, price:1490, origPrice:null, img:'images/свежийсалат.png', emoji:'🥒', gradient:['#388E3C','#81C784'], rating:93, reviews:50 },
  { id:209, cat:'salads', name: { ru: 'Салат Цезарь', kz: 'Цезарь салаты', en: 'Caesar salad', zh: 'Салат Цезарь' }, desc: { ru: '', kz: '', en: '', zh: '受欢迎的沙拉，配以鸡肉、油煎面包块、帕尔马干酪和酱汁。' }, price:2450, origPrice:null, img:'images/салатцезарь.png', emoji:'🥬', gradient:['#FBC02D','#FFF59D'], rating:97, reviews:88 },
  { id:210, cat:'salads', name: { ru: 'Салат Малибу', kz: 'Малибу салаты', en: 'Malibu salad', zh: 'Салат Малибу' }, desc: { ru: '', kz: '', en: '', zh: '精致的沙拉配上熏鸡、玉米和奶酪。' }, price:1490, origPrice:null, img:'images/салатмалибу.png', emoji:'🥗', gradient:['#FFB300','#FFE082'], rating:96, reviews:65 },
  { id:301, cat:'first', name: { ru: 'Борщ', kz: 'Борщ', en: 'Borscht', zh: 'Борщ' }, desc: { ru: '', kz: '', en: '', zh: '浓郁的自制罗宋汤配牛肉，搭配酸奶油。' }, price:1380, origPrice:null, img:'images/борщ.png', emoji:'🥣', gradient:['#B71C1C','#E57373'], rating:96, reviews:45 },
  { id:302, cat:'first', name: { ru: 'Суйру лагман', kz: 'Сүйір лағман', en: 'Suyru lagman', zh: 'Суйру лагман' }, desc: { ru: '', kz: '', en: '', zh: '传统的拉格曼配有自制面条、肉类和蔬菜。' }, price:1790, origPrice:null, img:'images/суйрулагман.png', emoji:'🍜', gradient:['#D84315','#FF8A65'], rating:95, reviews:50 },
  { id:303, cat:'first', name: { ru: 'Рамен с мясом', kz: 'Ет қосылған рамен', en: 'Ramen with meat', zh: 'Рамен с мясом' }, desc: { ru: '', kz: '', en: '', zh: '丰盛的亚洲汤，配面条、牛肉和鸡蛋。' }, price:2200, origPrice:null, img:'images/раменсмясом.png', emoji:'🍜', gradient:['#8D6E63','#D7CCC8'], rating:94, reviews:38 },
  { id:304, cat:'first', name: { ru: 'Шурпа из баранины', kz: 'Қой етінен шұрпа', en: 'Mutton shurpa', zh: 'Шурпа из баранины' }, desc: { ru: '', kz: '', en: '', zh: '汤汁浓郁，有大块的羊肉和蔬菜。' }, price:1790, origPrice:null, img:'images/шурпаизбаранины.png', emoji:'🥣', gradient:['#795548','#A1887F'], rating:93, reviews:42 },
  { id:305, cat:'first', name: { ru: 'Пельмени с бульоном', kz: 'Тұшпара сорпасы', en: 'Pelmeni with broth', zh: 'Пельмени с бульоном' }, desc: { ru: '', kz: '', en: '', zh: '热汤配自制饺子。' }, price:1450, origPrice:null, img:'images/пельменисбульоном.png', emoji:'🥣', gradient:['#B71C1C','#E57373'], rating:96, reviews:45 },
  { id:306, cat:'first', name: { ru: 'Солянка', kz: 'Солянка', en: 'Solyanka', zh: 'Солянка' }, desc: { ru: '', kz: '', en: '', zh: '丰盛的肉汤，带有酸味和橄榄。' }, price:1790, origPrice:null, img:'images/солянка.png', emoji:'🥣', gradient:['#D84315','#FF8A65'], rating:95, reviews:50 },
  { id:307, cat:'first', name: { ru: 'Нарын', kz: 'Нарын', en: 'Naryn', zh: 'Нарын' }, desc: { ru: '', kz: '', en: '', zh: '由切成薄片的面团和肉制成的传统菜肴。' }, price:1800, origPrice:null, img:'images/нарын.png', emoji:'🍜', gradient:['#8D6E63','#D7CCC8'], rating:97, reviews:38 },
  { id:308, cat:'first', name: { ru: 'Окрошка', kz: 'Окрошка', en: 'Okroshka', zh: 'Окрошка' }, desc: { ru: '', kz: '', en: '', zh: '清爽的冷汤，配以开菲尔或格瓦斯。' }, price:1200, origPrice:null, img:'images/окрошка.png', emoji:'🥣', gradient:['#4CAF50','#A5D6A7'], rating:94, reviews:30 },
  { id:309, cat:'first', name: { ru: 'Чечевичный суп', kz: 'Жасымық сорпасы', en: 'Lentil soup', zh: 'Чечевичный суп' }, desc: { ru: '', kz: '', en: '', zh: '浓稠的奶油红扁豆汤。' }, price:1290, origPrice:null, img:'images/чечевичныйсуп.png', emoji:'🥣', gradient:['#F57F17','#FFF59D'], rating:96, reviews:40 },
  { id:310, cat:'first', name: { ru: 'Голубцы с бульоном', kz: 'Сорпалы голубцы', en: 'Cabbage rolls with broth', zh: 'Голубцы с бульоном' }, desc: { ru: '', kz: '', en: '', zh: '卷心菜卷，里面有肉，里面充满了浓郁的肉汤。' }, price:1790, origPrice:null, img:'images/голубцысбульоном.png', emoji:'🍲', gradient:['#388E3C','#81C784'], rating:95, reviews:35 },
  { id:311, cat:'first', name: { ru: 'Куриный суп', kz: 'Тауық сорпасы', en: 'Chicken soup', zh: 'Куриный суп' }, desc: { ru: '', kz: '', en: '', zh: '清淡的鸡汤配面条。' }, price:1200, origPrice:null, img:'images/куринныйсуп.png', emoji:'🥣', gradient:['#FFB300','#FFE082'], rating:94, reviews:42 },
  { id:312, cat:'first', name: { ru: 'Рамен с курицей', kz: 'Тауық етімен рамен', en: 'Chicken ramen', zh: 'Рамен с курицей' }, weight:'400 г', desc: { ru: 'Азиатский суп с лапшой, курицей и яйцом.', kz: 'Кеспе, тауық еті және жұмыртқа қосылған азиялық сорпа.', en: 'Asian noodle soup with chicken and egg.', zh: 'Азиатский суп с лапшой, курицей и яйцом.' }, price:1390, origPrice:null, img:'images/раменскурицой.png', emoji:'🍜', gradient:['#E64A19','#FF8A65'], rating:97, reviews:55 },
  { id:313, cat:'first', name: { ru: 'Суп из перепелки', kz: 'Бөдене сорпасы', en: 'Quail soup', zh: 'Суп из перепелки' }, weight:'350 г', desc: { ru: 'Диетический прозрачный бульон из перепелки.', kz: 'Бөдене етінен жасалған диеталық мөлдір сорпа.', en: 'Dietary clear quail broth.', zh: 'Диетический прозрачный бульон из перепелки.' }, price:1800, origPrice:null, img:'images/Бөдене сорпасы.png', emoji:'🥣', gradient:['#795548','#A1887F'], rating:98, reviews:25 },
  { id:314, cat:'first', name: { ru: 'Суп с тефтелями', kz: 'Тефтели сорпасы', en: 'Meatball soup', zh: 'Суп с тефтелями' }, weight:'350 г', desc: { ru: 'Домашний суп с мясными тефтелями и картофелем.', kz: 'Ет тефтели мен картоп қосылған үй сорпасы.', en: 'Homemade soup with meatballs and potatoes.', zh: 'Домашний суп с мясными тефтелями и картофелем.' }, price:1690, origPrice:null, img:'images/Суп тефтели.png', emoji:'🥣', gradient:['#5D4037','#8D6E63'], rating:95, reviews:33 },
  { id:315, cat:'first', name: { ru: 'Гуйру лагман', kz: 'Гүйру лағман', en: 'Guiru lagman', zh: 'Гуйру лагман' }, weight:'400 г', desc: { ru: 'Лагман с крупно нарезанным мясом и овощами.', kz: 'Ірі туралған ет пен көкөністер қосылған лағман.', en: 'Lagman with coarsely chopped meat and vegetables.', zh: 'Лагман с крупно нарезанным мясом и овощами.' }, price:1850, origPrice:null, img:'images/лагмангуйру.png', emoji:'🍜', gradient:['#C62828','#EF5350'], rating:96, reviews:60 },
  { id:316, cat:'first', name: { ru: 'Мастава', kz: 'Мастава', en: 'Mastava', zh: 'Мастава' }, weight:'350 г', desc: { ru: 'Густой рисовый суп с мясом и овощами.', kz: 'Ет және көкөністер қосылған қою күріш сорпасы.', en: 'Thick rice soup with meat and vegetables.', zh: 'Густой рисовый суп с мясом и овощами.' }, price:1500, origPrice:null, img:'images/мастава.png', emoji:'🥣', gradient:['#E65100','#FFA726'], rating:95, reviews:28 },
  { id:401, cat:'second', name: { ru: 'Манты', kz: 'Мәнті', en: 'Manty', zh: 'Манты' }, desc: { ru: '', kz: '', en: '', zh: '多汁的肉末蒸饺。配酸奶油。' }, price:1890, origPrice:null, img:'images/манты.png', emoji:'🥟', gradient:['#5C3317','#D4874E'], rating:97, reviews:68 },
  { id:402, cat:'second', name: { ru: 'Казан кебаб', kz: 'Қазан кәуап', en: 'Kazan kebab', zh: 'Казан кебаб' }, desc: { ru: '', kz: '', en: '', zh: '骨头上的肉嫩，和土豆一起在锅里炖。' }, price:3490, origPrice:null, img:'images/казанкебаб.png', emoji:'🥩', gradient:['#4A1010','#B84040'], rating:98, reviews:54 },
  { id:403, cat:'second', name: { ru: 'Паста Альфредо', kz: 'Альфредо пастасы', en: 'Pasta Alfredo', zh: 'Паста Альфредо' }, desc: { ru: '', kz: '', en: '', zh: '意大利面食配奶油奶酪酱鸡肉片。' }, price:2100, origPrice:null, img:'images/пастаальфредо.png', emoji:'🍝', gradient:['#FFB300','#FFE082'], rating:95, reviews:41 },
  { id:404, cat:'second', name: { ru: 'Бешбармак', kz: 'Бешбармақ', en: 'Beshbarmak', zh: 'Бешбармак' }, desc: { ru: '', kz: '', en: '', zh: '哈萨克族的传统菜肴是煮肉和面团。' }, price:2950, origPrice:null, img:'images/бешбармак.png', emoji:'🍲', gradient:['#1A237E','#5C6BC0'], rating:99, reviews:85 },
  { id:405, cat:'second', name: { ru: 'Долма', kz: 'Долма', en: 'Dolma', zh: 'Долма' }, desc: { ru: '', kz: '', en: '', zh: '葡萄叶卷心菜卷，肉馅。' }, price:2190, origPrice:null, img:'images/долма.png', emoji:'🍲', gradient:['#2E7D32','#81C784'], rating:96, reviews:42 },
  { id:406, cat:'second', name: { ru: 'Куырдак из конины', kz: 'Жылқы етінен қуырдақ', en: 'Horse meat kuyrdak', zh: 'Куырдак из конины' }, desc: { ru: '', kz: '', en: '', zh: '丰盛的炸马肉配土豆。' }, price:3490, origPrice:null, img:'images/куырдакизконины.png', emoji:'🥘', gradient:['#4A148C','#9C27B0'], rating:98, reviews:60 },
  { id:407, cat:'second', name: { ru: 'Курица в кисло-сладком соусе', kz: 'Қышқыл-тәтті тұздықтағы тауық', en: 'Sweet and sour chicken', zh: 'Курица в кисло-сладком соусе' }, weight:'350 г', desc: { ru: 'Кусочки курицы в пикантном кисло-сладком соусе.', kz: 'Пикантты қышқыл-тәтті тұздықтағы тауық бөліктері.', en: 'Chicken pieces in a savory sweet and sour sauce.', zh: 'Кусочки курицы в пикантном кисло-сладком соусе.' }, price:2300, origPrice:null, img:'images/курицавкислосладкомсоусе.png', emoji:'🍗', gradient:['#D84315','#FF8A65'], rating:95, reviews:48 },
  { id:408, cat:'second', name: { ru: 'Курица с грибами', kz: 'Саңырауқұлақпен тауық', en: 'Chicken with mushrooms', zh: 'Курица с грибами' }, weight:'350 г', desc: { ru: 'Нежное куриное филе, тушеное с шампиньонами.', kz: 'Шампиньонмен бұқтырылған нәзік тауық филесі.', en: 'Tender chicken fillet stewed with mushrooms.', zh: 'Нежное куриное филе, тушеное с шампиньонами.' }, price:2200, origPrice:null, img:'images/курицасгрибами2.png', emoji:'🍗', gradient:['#795548','#A1887F'], rating:96, reviews:35 },
  { id:409, cat:'second', name: { ru: 'Плов ташкентский', kz: 'Ташкент палауы', en: 'Tashkent pilaf', zh: 'Плов ташкентский' }, weight:'400 г', desc: { ru: 'Настоящий узбекский плов с говядиной и нутом.', kz: 'Сиыр еті мен ноқат қосылған нағыз өзбек палауы.', en: 'Authentic Uzbek pilaf with beef and chickpeas.', zh: 'Настоящий узбекский плов с говядиной и нутом.' }, price:1590, origPrice:null, img:'images/пловташкентский.png', emoji:'🍛', gradient:['#E65100','#FFA726'], rating:98, reviews:70 },
  { id:410, cat:'second', name: { ru: 'Цыпленок табака', kz: 'Табака балапаны', en: 'Chicken tabaka', zh: 'Цыпленок табака' }, weight:'1 шт', desc: { ru: 'Целый цыпленок, запеченный до золотистой корочки.', kz: 'Қытырлақ қабыққа дейін пісірілген бүтін балапан.', en: 'Whole chicken baked to a golden crust.', zh: 'Целый цыпленок, запеченный до золотистой корочки.' }, price:2290, origPrice:null, img:'images/табака.png', emoji:'🍗', gradient:['#BF360C','#FF8A65'], rating:97, reviews:55 },
  { id:411, cat:'second', name: { ru: 'Тушенка с рисом', kz: 'Күрішпен бұқтырылған ет', en: 'Stewed meat with rice', zh: 'Тушенка с рисом' }, weight:'350 г', desc: { ru: 'Домашняя тушенка, поданная с отварным рисом.', kz: 'Қайнатылған күрішпен берілетін үйде бұқтырылған ет.', en: 'Homemade stewed meat served with boiled rice.', zh: 'Домашняя тушенка, поданная с отварным рисом.' }, price:3190, origPrice:null, img:'images/тушенкосрисом.png', emoji:'🍲', gradient:['#5D4037','#8D6E63'], rating:94, reviews:30 },
  { id:412, cat:'second', name: { ru: 'Лагман Цомян', kz: 'Цомян лағманы', en: 'Tsomyang lagman', zh: 'Лагман Цомян' }, desc: { ru: '', kz: '', en: '', zh: '维吾尔风味的蔬菜和肉类炒拉格曼。' }, price:1890, origPrice:null, img:'images/Лағман «Цомян».png', emoji:'🍜', gradient:['#C62828','#EF5350'], rating:97, reviews:50 },
  { id:501, cat:'pizza', name: { ru: 'Пицца 4 Сезона', kz: '4 Маусым пиццасы', en: '4 Seasons Pizza', zh: 'Пицца 4 Сезона' }, weight:'500 г', desc: { ru: 'Классическая пицца, объединяющая четыре разных вкуса в одной.', kz: 'Төрт түрлі дәмді біріктіретін классикалық пицца.', en: 'Classic pizza combining four different flavors in one.', zh: 'Классическая пицца, объединяющая четыре разных вкуса в одной.' }, price:2690, origPrice:null, img:'images/пицца4сезона.png', emoji:'🍕', gradient:['#D84315','#FF8A65'], rating:96, reviews:82 },
  { id:502, cat:'pizza', name: { ru: 'Пицца Пепперони', kz: 'Пепперони пиццасы', en: 'Pepperoni Pizza', zh: 'Пицца Пепперони' }, weight:'450 г', desc: { ru: 'Популярная пицца с колбасой пепперони и сыром моцарелла.', kz: 'Пепперони шұжығы және моцарелла ірімшігі бар танымал пицца.', en: 'Popular pizza with pepperoni sausage and mozzarella cheese.', zh: 'Популярная пицца с колбасой пепперони и сыром моцарелла.' }, price:2390, origPrice:null, img:'images/пепперони.png', emoji:'🍕', gradient:['#C62828','#EF5350'], rating:98, reviews:112 },
  { id:503, cat:'pizza', name: { ru: 'Пицца Мәртебе', kz: 'Мәртебе пиццасы', en: 'Martebe Pizza', zh: 'Пицца Мәртебе' }, weight:'550 г', desc: { ru: 'Фирменная пицца с особым сочетанием ингредиентов.', kz: 'Ингредиенттердің ерекше үйлесімі бар фирмалық пицца.', en: 'Signature pizza with a special combination of ingredients.', zh: 'Фирменная пицца с особым сочетанием ингредиентов.' }, price:2790, origPrice:null, img:'images/пиццамәртебе.png', emoji:'🍕', gradient:['#1B5E20','#4CAF50'], rating:99, reviews:145 },
  { id:504, cat:'pizza', name: { ru: 'Куриная пицца', kz: 'Тауық пиццасы', en: 'Chicken Pizza', zh: 'Куриная пицца' }, weight:'480 г', desc: { ru: '', kz: '', en: '', zh: '嫩披萨配鸡肉片、蘑菇和奶油酱。' }, price:2290, origPrice:null, img:'images/куринаяпицца.png', emoji:'🍕', gradient:['#F9A825','#FFEE58'], rating:95, reviews:67 },
  { id:505, cat:'pizza', name: { ru: 'Пицца Маргарита', kz: 'Маргарита пиццасы', en: 'Margherita Pizza', zh: 'Пицца Маргарита' }, weight:'450 г', desc: { ru: 'Традиционная пицца с томатами, моцареллой и базиликом.', kz: 'Қызанақ, моцарелла және насыбайгүл қосылған дәстүрлі пицца.', en: 'Traditional pizza with tomatoes, mozzarella and basil.', zh: 'Традиционная пицца с томатами, моцареллой и базиликом.' }, price:2090, origPrice:null, img:'images/маргарита.png', emoji:'🍕', gradient:['#E53935','#FFCDD2'], rating:97, reviews:89 },
  { id:506, cat:'pizza', name: { ru: 'Пицца Казахстан', kz: 'Қазақстан пиццасы', en: 'Kazakhstan Pizza', zh: 'Пицца Казахстан' }, weight:'600 г', desc: { ru: 'Сытная пицца с национальным колоритом и большим количеством мяса.', kz: 'Ұлттық колориті бар және көп ет қосылған тойымды пицца.', en: 'Hearty pizza with national flavor and lots of meat.', zh: 'Сытная пицца с национальным колоритом и большим количеством мяса.' }, price:3690, origPrice:null, img:'images/пиицаказахсктан.png', emoji:'🍕', gradient:['#1E88E5','#90CAF9'], rating:99, reviews:120 },
  { id:507, cat:'pizza', name: { ru: 'Курица с грибами', kz: 'Саңырауқұлақпен тауық', en: 'Chicken & Mushroom', zh: 'Курица с грибами' }, weight:'480 г', desc: { ru: 'Пицца со сливочным соусом, курицей и шампиньонами.', kz: 'Кілегейлі тұздық, тауық және шампиньон қосылған пицца.', en: 'Pizza with creamy sauce, chicken and champignons.', zh: 'Пицца со сливочным соусом, курицей и шампиньонами.' }, price:2690, origPrice:null, img:'images/курицасгрибами.png', emoji:'🍕', gradient:['#8D6E63','#D7CCC8'], rating:96, reviews:75 },
  { id:508, cat:'fastfood', name: { ru: 'Пиде с сыром', kz: 'Ірімшік пидесі', en: 'Cheese Pide', zh: 'Пиде с сыром' }, weight:'350 г', desc: { ru: '', kz: '', en: '', zh: '传统的土耳其船由透气的面团和丰富的奶酪馅料制成。' }, price:1490, origPrice:null, img:'images/пидессыром.png', emoji:'🧀', gradient:['#FFCA28','#FFF59D'], rating:94, reviews:31 },
  { id:509, cat:'fastfood', name: { ru: 'Пиде с мясом', kz: 'Етпен пиде', en: 'Meat Pide', zh: 'Пиде с мясом' }, desc: { ru: '', kz: '', en: '', zh: '丰盛的土耳其船，配有多汁的肉末、香料和香草。' }, price:1790, origPrice:null, img:'images/пидесмясом.png', emoji:'🥩', gradient:['#8D6E63','#D7CCC8'], rating:96, reviews:44 },
  { id:510, cat:'fastfood', name: { ru: 'Картофельные дольки', kz: 'Картоп бөліктері', en: 'Potato Wedges', zh: 'Картофельные дольки' }, desc: { ru: '', kz: '', en: '', zh: '香喷喷的薯角加香料，烤至金黄色。' }, price:900, origPrice:null, img:'images/картофельныедольки.png', emoji:'🥔', gradient:['#FFB300','#FFE082'], rating:95, reviews:50 },
  { id:511, cat:'fastfood', name: { ru: 'Картошка фри', kz: 'Фри картобы', en: 'French Fries', zh: 'Картошка фри' }, desc: { ru: '', kz: '', en: '', zh: '脆脆的经典薯条。与我们的酱汁完美搭配。' }, price:700, origPrice:null, img:'images/картошкафри.png', emoji:'🍟', gradient:['#F57F17','#FFF59D'], rating:96, reviews:88 },
  { id:512, cat:'burgers', name: { ru: 'Бургер', kz: 'Бургер', en: 'Burger', zh: 'Бургер' }, desc: { ru: '', kz: '', en: '', zh: '经典汉堡，配有多汁牛肉饼、新鲜蔬菜和招牌酱汁。' }, price:1300, origPrice:null, img:'images/бургер.png', emoji:'🍔', gradient:['#F57F17','#FFF59D'], rating:95, reviews:120 },
  { id:513, cat:'burgers', name: { ru: 'Бургер куриный', kz: 'Тауық бургері', en: 'Chicken Burger', zh: 'Бургер куриный' }, desc: { ru: '', kz: '', en: '', zh: '汉堡配嫩鸡排、脆生菜和酱汁。' }, price:1200, origPrice:null, img:'images/бургеркуринный.png', emoji:'🍔', gradient:['#FFB300','#FFE082'], rating:94, reviews:85 },
  { id:514, cat:'burgers', name: { ru: 'Дабл бургер', kz: 'Дабл бургер', en: 'Double Burger', zh: 'Дабл бургер' }, desc: { ru: '', kz: '', en: '', zh: '双倍乐趣！两块多汁的炸肉排、切达干酪和新鲜蔬菜。' }, price:1800, origPrice:null, img:'images/даблбургер.png', emoji:'🍔', gradient:['#E65100','#FFCC80'], rating:97, reviews:150 },
  { id:515, cat:'burgers', name: { ru: 'Чизбургер', kz: 'Чизбургер', en: 'Cheeseburger', zh: 'Чизбургер' }, desc: { ru: '', kz: '', en: '', zh: '经典芝士汉堡配牛肉饼、融化奶酪和腌黄瓜。' }, price:1490, origPrice:null, img:'images/чизбургер.png', emoji:'🍔', gradient:['#FF8F00','#FFE082'], rating:96, reviews:130 },
  { id:516, cat:'burgers', name: { ru: 'Куриный чизбургер', kz: 'Тауық чизбургері', en: 'Chicken Cheeseburger', zh: 'Куриный чизбургер' }, weight:'250 г', desc: { ru: 'Сытный чизбургер с куриной котлетой и тающим сыром.', kz: 'Тауық котлеті мен еритін ірімшік қосылған тойымды чизбургер.', en: 'Hearty cheeseburger with chicken patty and melting cheese.', zh: 'Сытный чизбургер с куриной котлетой и тающим сыром.' }, price:1390, origPrice:null, img:'images/куринныйчизбургер.png', emoji:'🍔', gradient:['#F9A825','#FFF59D'], rating:95, reviews:90 },
  { id:517, cat:'fastfood', name: { ru: 'Клаб сэндвич', kz: 'Клаб сэндвич', en: 'Club sandwich', zh: 'Клаб сэндвич' }, weight:'300 г', desc: { ru: 'Многослойный сэндвич с курицей, сыром и яйцом.', kz: 'Тауық еті, ірімшік және жұмыртқа қосылған көп қабатты сэндвич.', en: 'Multi-layer sandwich with chicken, cheese and egg.', zh: 'Многослойный сэндвич с курицей, сыром и яйцом.' }, price:1200, origPrice:null, img:'images/клабсендвич.png', emoji:'🥪', gradient:['#D84315','#FFAB91'], rating:96, reviews:75 },
  { id:518, cat:'lavash', name: { ru: 'Лаваш куриный', kz: 'Тауық лавашы', en: 'Chicken lavash', zh: 'Лаваш куриный' }, weight:'350 г', desc: { ru: '', kz: '', en: '', zh: '丰盛的皮塔饼面包配多汁的鸡肉和新鲜的蔬菜。' }, price:1290, origPrice:null, img:'images/лавашкуринный.png', emoji:'🌯', gradient:['#EF6C00','#FFCC80'], rating:94, reviews:110 },
  { id:519, cat:'lavash', name: { ru: 'Лаваш шашлык', kz: 'Кәуап лавашы', en: 'Kebab lavash', zh: 'Лаваш шашлык' }, desc: { ru: '', kz: '', en: '', zh: '用烤羊肉串和香草进行热熔洗。' }, price:1690, origPrice:null, img:'images/лавашшашлык.png', emoji:'🌯', gradient:['#8D6E63','#D7CCC8'], rating:96, reviews:85 },
  { id:520, cat:'lavash', name: { ru: 'Сырный лаваш', kz: 'Ірімшік лавашы', en: 'Cheese lavash', zh: 'Сырный лаваш' }, weight:'300 г', desc: { ru: 'Хрустящий лаваш с сыром и чесночным ароматом.', kz: 'Ірімшік және сарымсақ хош иісі бар қытырлақ лаваш.', en: 'Crispy lavash with cheese and garlic aroma.', zh: 'Хрустящий лаваш с сыром и чесночным ароматом.' }, price:1590, origPrice:null, img:'images/сырный лаваш.png', emoji:'🧀', gradient:['#FBC02D','#FFF59D'], rating:93, reviews:60 },
  { id:521, cat:'lavash', name: { ru: 'Тандыр лаваш', kz: 'Тандыр лавашы', en: 'Tandoor lavash', zh: 'Тандыр лаваш' }, weight:'350 г', desc: { ru: 'Сочное мясо с овощами в ароматном тандырном лаваше.', kz: 'Хош иісті тандыр лавашындағы көкөністермен шырынды ет.', en: 'Juicy meat with vegetables in aromatic tandoor lavash.', zh: 'Сочное мясо с овощами в ароматном тандырном лаваше.' }, price:1590, origPrice:null, img:'images/тандырлаваш.png', emoji:'🥙', gradient:['#5D4037','#A1887F'], rating:95, reviews:95 },
  { id:522, cat:'fastfood', name: { ru: 'Хот-дог', kz: 'Хот-дог', en: 'Hot dog', zh: 'Хот-дог' }, weight:'200 г', desc: { ru: 'Классический хот-дог с сосиской гриль и хрустящим луком.', kz: 'Гриль шұжығы және қытырлақ пияз қосылған классикалық хот-дог.', en: 'Classic hot dog with grilled sausage and crispy onions.', zh: 'Классический хот-дог с сосиской гриль и хрустящим луком.' }, price:890, origPrice:null, img:'images/хотдог.jpg', emoji:'🌭', gradient:['#D32F2F','#EF9A9A'], rating:92, reviews:80 },
  { id:523, cat:'lavash', name: { ru: 'Шаурма куриная', kz: 'Тауық шаурмасы', en: 'Chicken shawarma', zh: 'Шаурма куриная' }, weight:'400 г', desc: { ru: 'Шаурма с обжаренной курицей и свежими овощами.', kz: 'Қуырылған тауық және жаңа піскен көкөністер қосылған шаурма.', en: 'Shawarma with fried chicken and fresh vegetables.', zh: 'Шаурма с обжаренной курицей и свежими овощами.' }, price:900, origPrice:null, img:'images/шаурма куриная.png', emoji:'🌯', gradient:['#E64A19','#FFAB91'], rating:97, reviews:160 },
  { id:601, cat:'steaks', name: { ru: 'Стейк Рибай', kz: 'Рибай стейкі', en: 'Ribeye Steak', zh: 'Стейк Рибай' }, weight:'350 г', desc: { ru: '', kz: '', en: '', zh: '多汁的肋眼牛排由大理石牛肉制成。' }, price:4900, origPrice:null, img:'images/рибай.png', emoji:'🥩', gradient:['#5D4037','#8D6E63'], rating:99, reviews:84 },
  { id:602, cat:'steaks', name: { ru: 'Мясной медальон', kz: 'Ет медальоны', en: 'Meat Medallion', zh: 'Мясной медальон' }, desc: { ru: '', kz: '', en: '', zh: '嫩嫩的牛里脊肉配酱汁。' }, price:2800, origPrice:null, img:'images/мясноймедальон.png', emoji:'🥩', gradient:['#4E342E','#795548'], rating:98, reviews:62 },
  { id:603, cat:'steaks', name: { ru: 'Куриный медальон', kz: 'Тауық медальоны', en: 'Chicken Medallion', zh: 'Куриный медальон' }, desc: { ru: '', kz: '', en: '', zh: '多汁的鸡肉片，外皮金黄。' }, price:2690, origPrice:null, img:'images/куринныймедальон.png', emoji:'🍗', gradient:['#FFB300','#FFCA28'], rating:96, reviews:51 },
  { id:604, cat:'steaks', name: { ru: 'Шашлык из крылышек', kz: 'Қанатша кәуабы', en: 'Chicken Wings Kebab', zh: 'Шашлык из крылышек' }, desc: { ru: '', kz: '', en: '', zh: '多汁的鸡翅在烤架上煎炸。' }, price:1300, origPrice:null, img:'images/крылишкишашлык.png', emoji:'🍗', gradient:['#E64A19','#FF8A65'], rating:97, reviews:58 },
  { id:605, cat:'steaks', name: { ru: 'Куриное филе', kz: 'Тауық филесі', en: 'Chicken Fillet', zh: 'Куриное филе' }, weight:'250 г', desc: { ru: 'Нежное куриное филе на мангале с ароматными специями.', kz: 'Хош иісті дәмдеуіштер қосылған мангалдағы нәзік тауық филесі.', en: 'Tender chicken fillet on charcoal with aromatic spices.', zh: 'Нежное куриное филе на мангале с ароматными специями.' }, price:950, origPrice:null, img:'images/куриное филе.png', emoji:'🍗', gradient:['#FBC02D','#FFF176'], rating:95, reviews:40 },
  { id:606, cat:'steaks', name: { ru: 'Кусковая баранина', kz: 'Қой еті кәуабы', en: 'Mutton Kebab', zh: 'Кусковая баранина' }, weight:'250 г', desc: { ru: 'Классический шашлык из свежей баранины.', kz: 'Жаңа піскен қой етінен жасалған классикалық кәуап.', en: 'Classic kebab from fresh mutton.', zh: 'Классический шашлык из свежей баранины.' }, price:1250, origPrice:null, img:'images/кусковойбаранина.png', emoji:'🥩', gradient:['#5D4037','#A1887F'], rating:98, reviews:75 },
  { id:607, cat:'steaks', name: { ru: 'Шашлык молотый', kz: 'Тартылған ет кәуабы', en: 'Minced Meat Kebab', zh: 'Шашлык молотый' }, weight:'250 г', desc: { ru: 'Сочный люля-кебаб из рубленого мяса.', kz: 'Тартылған еттен жасалған шырынды люля-кәуап.', en: 'Juicy lula kebab from minced meat.', zh: 'Сочный люля-кебаб из рубленого мяса.' }, price:990, origPrice:null, img:'images/молотый.png', emoji:'🥩', gradient:['#4E342E','#8D6E63'], rating:96, reviews:60 },
  { id:608, cat:'steaks', name: { ru: 'Овощной шашлык', kz: 'Көкөніс кәуабы', en: 'Vegetable Kebab', zh: 'Овощной шашлык' }, desc: { ru: '', kz: '', en: '', zh: '新鲜蔬菜和蘑菇在煤上烘烤。' }, price:1200, origPrice:null, img:'images/овощнойшашлык.png', emoji:'🍆', gradient:['#388E3C','#81C784'], rating:94, reviews:32 },
  { id:609, cat:'steaks', name: { ru: 'Шашлык из окорочков', kz: 'Сирақ кәуабы', en: 'Chicken Leg Kebab', zh: 'Шашлык из окорочков' }, desc: { ru: '', kz: '', en: '', zh: '烤架上的鸡腿开胃。' }, price:1300, origPrice:null, img:'images/окорочка шашлык.png', emoji:'🍗', gradient:['#D84315','#FFAB91'], rating:95, reviews:45 },
  { id:701, cat:'sauces', name: { ru: 'Стручковый перец', kz: 'Ащы бұрыш', en: 'Hot pepper', zh: 'Стручковый перец' }, weight:'50 г', desc: { ru: 'Пикантный острый перец для любителей поострее.', kz: 'Ащыны ұнататындарға арналған пикантты ащы бұрыш.', en: 'Spicy hot pepper for spice lovers.', zh: 'Пикантный острый перец для любителей поострее.' }, price:350, origPrice:null, img:'images/стручковыйперец.png', emoji:'🌶️', gradient:['#D32F2F','#FF5252'], rating:90, reviews:14 },
  { id:702, cat:'sauces', name: { ru: 'Аджика', kz: 'Аджика', en: 'Adjika', zh: 'Аджика' }, weight:'50 г', desc: { ru: 'Острая домашняя аджика из свежих томатов и специй.', kz: 'Жаңа піскен қызанақ пен дәмдеуіштерден жасалған ащы үй аджикасы.', en: 'Spicy homemade adjika from fresh tomatoes and spices.', zh: 'Острая домашняя аджика из свежих томатов и специй.' }, price:250, origPrice:null, img:'images/аджика.png', emoji:'🍅', gradient:['#C62828','#EF5350'], rating:95, reviews:27 },
  { id:703, cat:'sauces', name: { ru: 'Чесночный соус', kz: 'Сарымсақ тұздығы', en: 'Garlic sauce', zh: 'Чесночный соус' }, weight:'50 г', desc: { ru: 'Нежный белый соус с ярким чесночным ароматом.', kz: 'Сарымсақтың хош иісі бар нәзік ақ тұздық.', en: 'Tender white sauce with bright garlic aroma.', zh: 'Нежный белый соус с ярким чесночным ароматом.' }, price:300, origPrice:null, img:'images/чесночныйсоус.png', emoji:'🧄', gradient:['#F5F5F5','#E0E0E0'], rating:98, reviews:42 },
  { id:704, cat:'sauces', name: { ru: 'Сырный соус', kz: 'Ірімшік тұздығы', en: 'Cheese sauce', zh: 'Сырный соус' }, desc: { ru: '', kz: '', en: '', zh: '浓稠的酱汁带着浓郁的芝士味。' }, price:300, origPrice:null, img:'images/сырныйсоус.png', emoji:'🧀', gradient:['#FFB300','#FFE082'], rating:97, reviews:53 },
  { id:705, cat:'sauces', name: { ru: 'Майонез', kz: 'Майонез', en: 'Mayonnaise', zh: 'Майонез' }, desc: { ru: '', kz: '', en: '', zh: '经典的普罗旺斯蛋黄酱。' }, price:300, origPrice:null, img:'images/майонез.png', emoji:'🥚', gradient:['#FFFFFF','#FFF9C4'], rating:88, reviews:19 },
  { id:706, cat:'sauces', name: { ru: 'Кетчуп', kz: 'Кетчуп', en: 'Ketchup', zh: 'Кетчуп' }, desc: { ru: '', kz: '', en: '', zh: '传统番茄酱。' }, price:300, origPrice:null, img:'images/кетчуп.png', emoji:'🍅', gradient:['#D84315','#FF8A65'], rating:89, reviews:24 },
  { id:707, cat:'sauces', name: { ru: 'Рис', kz: 'Күріш', en: 'Rice', zh: 'Рис' }, desc: { ru: '', kz: '', en: '', zh: '蓬松的白米饭是完美的配菜。' }, price:550, origPrice:null, img:'images/рис.png', emoji:'🍚', gradient:['#FFFFFF','#E0E0E0'], rating:94, reviews:33 },
  { id:708, cat:'sauces', name: { ru: 'Пюре', kz: 'Езбе', en: 'Mashed potatoes', zh: 'Пюре' }, desc: { ru: '', kz: '', en: '', zh: '嫩土豆泥加黄油。' }, price:500, origPrice:null, img:'images/пюре.png', emoji:'🥔', gradient:['#FFF59D','#FFE082'], rating:96, reviews:41 },
  { id:709, cat:'sauces', name: { ru: 'Картофельные шарики', kz: 'Картоп шарлары', en: 'Potato balls', zh: 'Картофельные шарики' }, desc: { ru: '', kz: '', en: '', zh: '酥脆的土豆球，里面有细腻的馅料。' }, price:800, origPrice:null, img:'images/картофельные шарики.png', emoji:'🥔', gradient:['#FFB300','#FFE082'], rating:95, reviews:38 },
  { id:801, cat:'bread', name: { ru: 'Лепёшка', kz: 'Тандыр нан', en: 'Flatbread', zh: 'Лепёшка' }, weight:'1 шт', desc: { ru: 'Мягкая домашняя лепёшка из тандыра.', kz: 'Тандырдан шыққан жұмсақ үй наны.', en: 'Soft homemade flatbread from tandoor.', zh: 'Мягкая домашняя лепёшка из тандыра.' }, price:250, origPrice:null, img:'null', emoji:'🫓', gradient:['#D4874E','#F5CBA7'], rating:97, reviews:55 },
  { id:802, cat:'bread', name: { ru: 'Ржаной хлеб', kz: 'Қара бидай наны', en: 'Rye bread', zh: 'Ржаной хлеб' }, weight:'1 шт', desc: { ru: 'Ароматный ржаной хлеб с хрустящей корочкой.', kz: 'Қытырлақ қабығы бар хош иісті қара бидай наны.', en: 'Aromatic rye bread with crispy crust.', zh: 'Ароматный ржаной хлеб с хрустящей корочкой.' }, price:300, origPrice:null, img:'null', emoji:'🍞', gradient:['#5D4037','#A1887F'], rating:94, reviews:30 },
  { id:803, cat:'bread', name: { ru: 'Самса с мясом', kz: 'Етті самса', en: 'Meat samsa', zh: 'Самса с мясом' }, weight:'1 шт', desc: { ru: 'Хрустящая самса с мясной начинкой из тандыра.', kz: 'Тандырдан шыққан ет салмасы бар қытырлақ самса.', en: 'Crispy samsa with meat filling from tandoor.', zh: 'Хрустящая самса с мясной начинкой из тандыра.' }, price:450, origPrice:null, img:'null', emoji:'🥟', gradient:['#BF360C','#FF8A65'], rating:99, reviews:120 },
  { id:804, cat:'bread', name: { ru: 'Самса с курицей', kz: 'Тауық самсасы', en: 'Chicken samsa', zh: 'Самса с курицей' }, desc: { ru: '', kz: '', en: '', zh: '嫩滑的萨莫萨三角饺，里面有鸡肉馅。' }, price:350, origPrice:null, img:'null', emoji:'🥟', gradient:['#F57F17','#FFE082'], rating:97, reviews:90 },
  { id:805, cat:'bread', name: { ru: 'Баурсаки (6 шт)', kz: 'Бауырсақ (6 дана)', en: 'Baursaks (6 pcs)', zh: 'Баурсаки (6 шт)' }, desc: { ru: '', kz: '', en: '', zh: '蓬松的炸面团球。' }, price:550, origPrice:null, img:'null', emoji:'🍡', gradient:['#FFB300','#FFF59D'], rating:98, reviews:75 },
  { id:806, cat:'bread', name: { ru: 'Баурсаки (10 шт)', kz: 'Бауырсақ (10 дана)', en: 'Baursaks (10 pcs)', zh: 'Баурсаки (10 шт)' }, weight:'10 шт', desc: { ru: 'Большая порция пышных баурсаков.', kz: 'Үлпілдек бауырсақтардың үлкен порциясы.', en: 'Large portion of fluffy baursaks.', zh: 'Большая порция пышных баурсаков.' }, price:990, origPrice:null, img:'null', emoji:'🍡', gradient:['#FFB300','#FFF59D'], rating:98, reviews:62 },
  { id:807, cat:'bread', name: { ru: 'Баурсаки (1 кг)', kz: 'Бауырсақ (1 кг)', en: 'Baursaks (1 kg)', zh: 'Баурсаки (1 кг)' }, weight:'1 кг', desc: { ru: 'Килограмм свежих баурсаков.', kz: 'Бір келі жаңа піскен бауырсақтар.', en: 'A kilogram of fresh baursaks.', zh: 'Килограмм свежих баурсаков.' }, price:1900, origPrice:null, img:'null', emoji:'🍡', gradient:['#FFB300','#FFF59D'], rating:99, reviews:40 },
  { id:808, cat:'bread', name: { ru: 'Каттама с луком', kz: 'Пияз қаттамасы', en: 'Onion Kattama', zh: 'Каттама с луком' }, weight:'1 шт', desc: { ru: 'Слоёная лепёшка Каттама с луковой начинкой.', kz: 'Пияз салмасы бар қатпарлы Қаттама наны.', en: 'Flaky Kattama flatbread with onion filling.', zh: 'Слоёная лепёшка Каттама с луковой начинкой.' }, price:450, origPrice:null, img:'null', emoji:'🫓', gradient:['#827717','#F9A825'], rating:96, reviews:48 },
  { id:809, cat:'bread', name: { ru: 'Каттама классическая', kz: 'Классикалық қаттама', en: 'Classic Kattama', zh: 'Каттама классическая' }, weight:'1 шт', desc: { ru: 'Традиционная слоёная лепёшка Каттама без начинки.', kz: 'Салмасыз дәстүрлі қатпарлы Қаттама наны.', en: 'Traditional flaky Kattama flatbread without filling.', zh: 'Традиционная слоёная лепёшка Каттама без начинки.' }, price:400, origPrice:null, img:'null', emoji:'🫓', gradient:['#827717','#F9A825'], rating:95, reviews:35 },
  { id:810, cat:'assorted', name: { ru: 'Астау нан', kz: 'Астау нан', en: 'Astau nan', zh: 'Астау нан' }, desc: { ru: '', kz: '', en: '', zh: '(nan-4、kattama-4、baursaki-10pcs、samsa-6pcs、adjika-50g、kaymak-50g)' }, price:4500, origPrice:null, img:'null', emoji:'🎉', gradient:['#C6A84B','#F5E6A3'], rating:100, reviews:25 },
  { id:901, cat:'assorted', name: { ru: 'Куриное ассорти', kz: 'Тауық ассортиі', en: 'Chicken platter', zh: 'Куриное ассорти' }, desc: { ru: '', kz: '', en: '', zh: '精致的鸡肉佳肴。' }, price:5500, origPrice:null, img:'null', emoji:'🍗', gradient:['#F57F17','#FFE082'], rating:97, reviews:42 },
  { id:902, cat:'assorted', name: { ru: 'Мясное ассорти (бол.)', kz: 'Ет ассортиі (үлкен)', en: 'Meat platter (large)', zh: 'Мясное ассорти (бол.)' }, desc: { ru: '', kz: '', en: '', zh: '大托盘配有精选熟食肉类。' }, price:10000, origPrice:null, img:'null', emoji:'🥩', gradient:['#4E342E','#8D6E63'], rating:98, reviews:38 },
  { id:903, cat:'assorted', name: { ru: 'Мясное ассорти (мал.)', kz: 'Ет ассортиі (шағын)', en: 'Meat platter (small)', zh: 'Мясное ассорти (мал.)' }, desc: { ru: '', kz: '', en: '', zh: '一个小托盘，里面有熟肉。' }, price:8000, origPrice:null, img:'null', emoji:'🥩', gradient:['#5D4037','#A1887F'], rating:97, reviews:30 },
  { id:904, cat:'assorted', name: { ru: 'Овощное ассорти', kz: 'Көкөніс ассортиі', en: 'Vegetable platter', zh: 'Овощное ассорти' }, desc: { ru: '', kz: '', en: '', zh: '新鲜切碎的时令蔬菜和香草。' }, price:4000, origPrice:null, img:'null', emoji:'🥗', gradient:['#2E7D32','#81C784'], rating:95, reviews:28 },
  { id:905, cat:'assorted', name: { ru: 'Фруктовая нарезка', kz: 'Жеміс ассортиі', en: 'Fruit platter', zh: 'Фруктовая нарезка' }, desc: { ru: '', kz: '', en: '', zh: '托盘里放着多汁的时令水果。' }, price:5500, origPrice:null, img:'null', emoji:'🍉', gradient:['#AD1457','#F48FB1'], rating:98, reviews:50 },
  { id:1001, cat:'banquet', name: { ru: 'Бешбармак (6–8 чел)', kz: 'Бешбармақ (6–8 адам)', en: 'Beshbarmak (6–8)', zh: 'Бешбармак (6–8 чел)' }, desc: { ru: '', kz: '', en: '', zh: '哈萨克族的传统菜肴是水煮肉。' }, price:15000, origPrice:null, img:'null', emoji:'🍲', gradient:['#1A237E','#5C6BC0'], rating:99, reviews:65 },
  { id:1002, cat:'banquet', name: { ru: 'Бешбармак (10–12 чел)', kz: 'Бешбармақ (10–12 адам)', en: 'Beshbarmak (10–12)', zh: 'Бешбармак (10–12 чел)' }, desc: { ru: '', kz: '', en: '', zh: '哈萨克族的传统菜肴是水煮肉。' }, price:20000, origPrice:null, img:'null', emoji:'🍲', gradient:['#1A237E','#5C6BC0'], rating:99, reviews:48 },
  { id:1003, cat:'banquet', name: { ru: 'Казан-кебаб в астау', kz: 'Астаудағы қазан-кәуап', en: 'Kazan-kebab in astau', zh: 'Казан-кебаб в астау' }, desc: { ru: '', kz: '', en: '', zh: '传统阿斯塔的芳香喀山烤肉串。' }, price:25000, origPrice:null, img:'null', emoji:'🥘', gradient:['#B71C1C','#EF5350'], rating:100, reviews:30 },
  { id:1004, cat:'banquet', name: { ru: 'Куырдак (9–10 чел)', kz: 'Қуырдақ (9–10 адам)', en: 'Kuyrdak (9–10)', zh: 'Куырдак (9–10 чел)' }, desc: { ru: '', kz: '', en: '', zh: '一道丰盛的哈萨克菜，炸肉。' }, price:24490, origPrice:null, img:'null', emoji:'🥘', gradient:['#4A148C','#9C27B0'], rating:98, reviews:22 },
  { id:1005, cat:'banquet', name: { ru: 'Мясной пир (6–8 чел)', kz: 'Ет мерекесі (6–8 адам)', en: 'Meat feast (6–8)', zh: 'Мясной пир (6–8 чел)' }, weight:'6–8 порций', desc: { ru: 'Обильный стол из отборных мясных блюд.', kz: 'Таңдаулы ет тағамдарынан тұратын мол дастархан.', en: 'Abundant table of selected meat dishes.', zh: 'Обильный стол из отборных мясных блюд.' }, price:22000, origPrice:null, img:'null', emoji:'🍖', gradient:['#3E2723','#6D4C41'], rating:99, reviews:35 },
  { id:1006, cat:'banquet', name: { ru: 'Плов Чайхана', kz: 'Чайхана палауы', en: 'Chaykhana Pilaf', zh: 'Плов Чайхана' }, weight:'до 8 чел', desc: { ru: 'Ароматный плов по-чайхански с морковью и мясом.', kz: 'Сәбіз бен ет қосылған шайхана стиліндегі хош иісті палау.', en: 'Aromatic chaykhana-style pilaf with carrots and meat.', zh: 'Ароматный плов по-чайхански с морковью и мясом.' }, price:16000, origPrice:null, img:'null', emoji:'🍛', gradient:['#E65100','#FFA726'], rating:99, reviews:55 },
  { id:1007, cat:'banquet', name: { ru: 'MIX Куырдак (6–8 чел)', kz: 'MIX Қуырдақ (6–8 адам)', en: 'MIX Kuyrdak (6–8)', zh: 'MIX Куырдак (6–8 чел)' }, weight:'6–8 порций', desc: { ru: 'Микс из куырдака и мант — банкетное ассорти.', kz: 'Қуырдақ пен мәнті қоспасы — банкеттік ассорти.', en: 'Mix of kuyrdak and manty — banquet assortment.', zh: 'Микс из куырдака и мант — банкетное ассорти.' }, price:24490, origPrice:null, img:'null', emoji:'🥘', gradient:['#1B5E20','#43A047'], rating:98, reviews:18 },
  { id:1101, cat:'drinks', name: { ru: 'Вода без газа 0.5 л', kz: 'Газсыз су 0.5 л', en: 'Still water 0.5L', zh: 'Вода без газа 0.5 л' }, weight:'0.5 л', desc: { ru: 'Освежающий напиток.', kz: 'Сергітетін сусын.', en: 'Refreshing drink.', zh: 'Освежающий напиток.' }, price:200, origPrice:null, img:'images/водабезгаза0,5.jpg', emoji:'💧', gradient:['#FFFFFF','#FFFFFF'], rating:95, reviews:10 },
  { id:1102, cat:'drinks', name: { ru: 'Вода без газа 1 л', kz: 'Газсыз су 1 л', en: 'Still water 1L', zh: 'Вода без газа 1 л' }, desc: { ru: '', kz: '', en: '', zh: '清爽的饮料。' }, price:490, origPrice:null, img:'images/водабезгаза1л.jpg', emoji:'💧', gradient:['#FFFFFF','#FFFFFF'], rating:95, reviews:10 },
  { id:1103, cat:'drinks', name: { ru: 'Газированная вода', kz: 'Газдалған су', en: 'Sparkling water', zh: 'Газированная вода' }, desc: { ru: '', kz: '', en: '', zh: '清爽的饮料。' }, price:350, origPrice:null, img:'images/газированнаявода.jpg', emoji:'💧', gradient:['#FFFFFF','#FFFFFF'], rating:95, reviews:10 },
  { id:1104, cat:'drinks', name: { ru: 'Каркаде 0.5 л', kz: 'Каркаде 0.5 л', en: 'Hibiscus tea 0.5L', zh: 'Каркаде 0.5 л' }, weight:'1 л', desc: { ru: 'Холодный чай со вкусом лимона.', kz: 'Лимон дәмі бар салқын шай.', en: 'Cold tea with lemon flavor.', zh: 'Холодный чай со вкусом лимона.' }, price:400, origPrice:null, img:'images/каркаде0,5.png', emoji:'🍹', gradient:['#FFFFFF','#FFFFFF'], rating:95, reviews:10 },
  { id:1105, cat:'drinks', name: { ru: 'Каркаде 1 л', kz: 'Каркаде 1 л', en: 'Hibiscus tea 1L', zh: 'Каркаде 1 л' }, weight:'1 л', desc: { ru: 'Холодный чай со вкусом персика.', kz: 'Шабдалы дәмі бар салқын шай.', en: 'Cold tea with peach flavor.', zh: 'Холодный чай со вкусом персика.' }, price:700, origPrice:null, img:'images/каркаде1л.png', emoji:'🍹', gradient:['#FFFFFF','#FFFFFF'], rating:95, reviews:10 },
  { id:1106, cat:'drinks', name: { ru: 'Коже 0.5 л', kz: 'Көже 0.5 л', en: 'Kozhe 0.5L', zh: 'Коже 0.5 л' }, weight:'0.5 л', desc: { ru: 'Холодный чай со вкусом лимона.', kz: 'Лимон дәмі бар салқын шай.', en: 'Cold tea with lemon flavor.', zh: 'Холодный чай со вкусом лимона.' }, price:500, origPrice:null, img:'images/коже.png', emoji:'🥛', gradient:['#FFFFFF','#FFFFFF'], rating:95, reviews:10 },
  { id:1107, cat:'drinks', name: { ru: 'Кола ж/б', kz: 'Кола қалбыр', en: 'Cola can', zh: 'Кола ж/б' }, weight:'0.5 л', desc: { ru: 'Холодный чай со вкусом персика.', kz: 'Шабдалы дәмі бар салқын шай.', en: 'Cold tea with peach flavor.', zh: 'Холодный чай со вкусом персика.' }, price:500, origPrice:null, img:'images/колажбанка.jpg', emoji:'🥤', gradient:['#F44336','#D32F2F'], rating:95, reviews:10 },
  { id:1108, cat:'drinks', name: { ru: 'Кола на розлив', kz: 'Құйма кола', en: 'Draft Cola', zh: 'Кола на розлив' }, desc: { ru: '', kz: '', en: '', zh: '清爽的饮料。' }, price:700, origPrice:null, img:'images/коланаразлив.jpg', emoji:'🥤', gradient:['#FFFFFF','#FFFFFF'], rating:95, reviews:10 },
  { id:1109, cat:'drinks', name: { ru: 'Кола в стекле', kz: 'Шыныдағы кола', en: 'Cola in glass', zh: 'Кола в стекле' }, desc: { ru: '', kz: '', en: '', zh: '清爽的饮料。' }, price:600, origPrice:null, img:'images/колавстекле.jpg', emoji:'🍾', gradient:['#FFFFFF','#FFFFFF'], rating:95, reviews:10 },
  { id:1111, cat:'drinks', name: { ru: 'Сок Пико 1 л', kz: 'Пико шырыны 1 л', en: 'Pico Juice 1L', zh: 'Сок Пико 1 л' }, desc: { ru: '', kz: '', en: '', zh: '清爽的饮料。' }, price:1200, origPrice:null, img:'images/сокпико1.jpg', emoji:'🧃', gradient:['#4CAF50','#388E3C'], rating:95, reviews:10 },
  { id:1112, cat:'drinks', name: { ru: 'FuseTea 0.5 л', kz: 'FuseTea 0.5 л', en: 'FuseTea 0.5L', zh: 'FuseTea 0.5 л' }, desc: { ru: '', kz: '', en: '', zh: '清爽的饮料。' }, price:500, origPrice:null, img:'images/fusetea0.5.jpg', emoji:'🧃', gradient:['#FFEB3B','#FBC02D'], rating:95, reviews:10 },
  { id:1113, cat:'drinks', name: { ru: 'FuseTea 1 л', kz: 'FuseTea 1 л', en: 'FuseTea 1L', zh: 'FuseTea 1 л' }, desc: { ru: '', kz: '', en: '', zh: '清爽的饮料。' }, price:890, origPrice:null, img:'images/fusetea1.jpg', emoji:'🧃', gradient:['#FFEB3B','#FBC02D'], rating:95, reviews:10 },
  { id:1114, cat:'drinks', name: { ru: 'Coca-Cola 0.5 л', kz: 'Coca-Cola 0.5 л', en: 'Coca-Cola 0.5L', zh: 'Coca-Cola 0.5 л' }, weight:'0.5 л', desc: { ru: 'Освежающий напиток.', kz: 'Сергітетін сусын.', en: 'Refreshing drink.', zh: 'Освежающий напиток.' }, price:600, origPrice:null, img:'images/коланольпять.jpg', emoji:'🥤', gradient:['#D32F2F','#B71C1C'], rating:95, reviews:10 },
  { id:1115, cat:'drinks', name: { ru: 'Fanta 0.5 л', kz: 'Fanta 0.5 л', en: 'Fanta 0.5L', zh: 'Fanta 0.5 л' }, weight:'0.5 л', desc: { ru: 'Освежающий напиток.', kz: 'Сергітетін сусын.', en: 'Refreshing drink.', zh: 'Освежающий напиток.' }, price:600, origPrice:null, img:'images/фантанольпять.jpg', emoji:'🥤', gradient:['#FF9800','#F57F17'], rating:95, reviews:10 },
  { id:1116, cat:'drinks', name: { ru: 'Sprite 0.5 л', kz: 'Sprite 0.5 л', en: 'Sprite 0.5L', zh: 'Sprite 0.5 л' }, weight:'0.5 л', desc: { ru: 'Освежающий напиток.', kz: 'Сергітетін сусын.', en: 'Refreshing drink.', zh: 'Освежающий напиток.' }, price:600, origPrice:null, img:'images/спрайт0,5.png', emoji:'🥤', gradient:['#8BC34A','#689F38'], rating:95, reviews:10 },
  { id:1117, cat:'drinks', name: { ru: 'Coca-Cola 1 л', kz: 'Coca-Cola 1 л', en: 'Coca-Cola 1L', zh: 'Coca-Cola 1 л' }, weight:'1 л', desc: { ru: 'Освежающий напиток.', kz: 'Сергітетін сусын.', en: 'Refreshing drink.', zh: 'Освежающий напиток.' }, price:890, origPrice:null, img:'images/кола1л.jpg', emoji:'🥤', gradient:['#D32F2F','#B71C1C'], rating:95, reviews:10 },
  { id:1118, cat:'drinks', name: { ru: 'Fanta 1 л', kz: 'Fanta 1 л', en: 'Fanta 1L', zh: 'Fanta 1 л' }, desc: { ru: '', kz: '', en: '', zh: '清爽的饮料。' }, price:890, origPrice:null, img:'images/фанта1л.jpg', emoji:'🥤', gradient:['#FF9800','#F57F17'], rating:95, reviews:10 },
  { id:1119, cat:'drinks', name: { ru: 'Sprite 1 л', kz: 'Sprite 1 л', en: 'Sprite 1L', zh: 'Sprite 1 л' }, desc: { ru: '', kz: '', en: '', zh: '清爽的饮料。' }, price:890, origPrice:null, img:'images/спрайт1л.png', emoji:'🥤', gradient:['#8BC34A','#689F38'], rating:95, reviews:10 }
];

// ── PROMOS ────────────────────────────────────────────────────
const PROMOS = [
  { title: { ru: '🔥 Скидка 15% на Комбо!', kz: '🔥 Комбоға 15% жеңілдік!', en: '🔥 15% off Combos!', zh: '🔥 套餐 85折！' }, sub: { ru: 'При заказе онлайн', kz: 'Онлайн тапсырыс бергенде', en: 'When ordering online', zh: '在线订购时' }, icon:'🔥', bg:'rgba(200,148,58,0.12)', border:'rgba(200,148,58,0.35)', badge:'−15%' },
  { title: { ru: '🥟 Каждая 5-я Самса бесплатно!', kz: '🥟 Әрбір 5-ші самса тегін!', en: '🥟 Every 5th Samsa is free!', zh: '🥟 每买5个烤包子免1个！' }, sub: { ru: 'Ежедневная акция без ограничений', kz: 'Күнделікті шектеусіз акция', en: 'Daily promo without limits', zh: '每日促销，无限制' }, icon:'🥟', bg:'rgba(230,57,70,0.10)',  border:'rgba(230,57,70,0.3)',   badge:'FREE' },
  { title: { ru: '☕ 10-й Кофе в подарок!', kz: '☕ 10-шы Кофе сыйлыққа!', en: '☕ 10th Coffee for free!', zh: '☕ 第10杯咖啡免费！' }, sub: { ru: 'Сохраняйте чеки и обменивайте на бесплатный кофе', kz: 'Чектерді сақтап, тегін кофеге айырбастаңыз', en: 'Save receipts and exchange for free coffee', zh: '保存收据并兑换免费咖啡' }, icon:'☕', bg:'rgba(121,85,72,0.10)',  border:'rgba(121,85,72,0.3)',   badge:'10+1' },
];

const CABINS = [
  { id: 1, name: { ru: 'Караоке зона для компании', kz: 'Компанияға арналған караоке аймағы', en: 'Karaoke zone for groups', zh: '团体卡拉OK区' }, desc: { ru: 'Удобная и просторная кабинка для праздников с караоке', kz: 'Караокесі бар мерекелерге арналған ыңғайлы әрі кең кабина', en: 'Comfortable and spacious cabin for holidays with karaoke', zh: '舒适宽敞的卡拉OK度假舱' }, capacity: { ru: 'до 16 человек', kz: '16 адамға дейін', en: 'up to 16 people', zh: '最多16人' }, img: 'images/кабинка1.png' },
  { id: 2, name: { ru: 'Казахская кабинка', kz: 'Қазақ кабинасы', en: 'Kazakh cabin', zh: '哈萨克包间' }, desc: { ru: 'Традиционная кабинка в стиле топчана с корпеше и подушками, чтобы отдохнуть и почувствовать себя как в юрте.', kz: 'Демалып, өзіңізді киіз үйдегідей сезіну үшін көрпешелер мен жастықтары бар тапшан стиліндегі дәстүрлі кабина.', en: 'Traditional tapshan-style cabin with bedding and pillows to relax and feel like in a yurt.', zh: '传统的塔普山风格包间，配有床上用品和枕头，让您放松身心，感觉就像在蒙古包里一样。' }, capacity: { ru: '12 человек', kz: '12 адам', en: '12 people', zh: '12人' }, img: 'images/кабинка2.png' },
  { id: 3, name: { ru: 'ВИП караоке зона', kz: 'VIP караоке аймағы', en: 'VIP karaoke zone', zh: 'VIP卡拉OK区' }, desc: { ru: 'Уютное идеальное место, чтобы повеселиться, поговорить по душам и попеть.', kz: 'Көңіл көтеруге, шын жүректен сөйлесуге және ән айтуға арналған жайлы тамаша орын.', en: 'Cozy and perfect place to have fun, have heart-to-heart talks, and sing.', zh: '舒适完美的聚会场所，适合尽情欢乐、畅所欲言和唱歌。' }, capacity: { ru: 'до 10 человек', kz: '10 адамға дейін', en: 'up to 10 people', zh: '最多10人' }, img: 'images/кабинка3.png' }
];

// ============================================================
//  STATE & I18N LOGIC
// ============================================================
let currentLang     = 'ru'; // Initialize to ru so that setLang('kz') will trigger a full update
let currentSection  = 'home';
let currentSuperCat = 'food';
let currentCat      = 'breakfasts';
let cart            = JSON.parse(localStorage.getItem('martebe_cart') || '[]');
let modalId         = null;
let modalQty        = 1;
let promoIdx        = 0;
let promoTimer      = null;
let orderType       = 'takeaway';

function setLang(lang) {
  if (currentLang === lang) return;
  currentLang = lang;
  
  // Update lang-btn active states
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.lang === lang);
  });

  // Translate all static texts
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (I18N[key] && I18N[key][lang]) {
      el.innerHTML = I18N[key][lang];
    }
  });

  // Translate placeholders
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    const key = el.getAttribute('data-i18n-placeholder');
    if (I18N[key] && I18N[key][lang]) {
      el.placeholder = I18N[key][lang];
    }
  });

  // Re-render everything with new language
  renderSuperCategories();
  renderCategories();
  renderGrid();
  renderHome();
  renderCabins();
  updateCartBar();
  renderPromos();
  if (modalId) {
    // Refresh modal text
    const m = MENU.find(x => x.id === modalId);
    if (m) {
      document.getElementById('modal-name').textContent = m.name[currentLang];
      document.getElementById('modal-desc').textContent = m.desc[currentLang];
    }
  }
  if (document.getElementById('cart-drawer').classList.contains('open')) {
    renderDrawerItems();
  }
}

// Ensure first translation on load
document.addEventListener("DOMContentLoaded", () => {
  // Update the order subtitle dynamically with the actual number of dishes
  I18N.ha_order_sub = {
    ru: MENU.length + ' ' + pluralRu(MENU.length, ['блюдо', 'блюда', 'блюд']),
    kz: MENU.length + ' тағам',
    en: MENU.length + ' dishes'
  };
  setLang('kz'); // Explicit initial translation
});

// ============================================================
//  ORDER TYPE
// ============================================================
function renderSuperCategories() {
  const nav = document.getElementById('super-cat-nav');
  if (!nav) return;
  nav.innerHTML = SUPER_CATEGORIES.map(s => `
    <button class="scat-tab ${s.key === currentSuperCat ? 'active' : ''}"
            data-key="${s.key}"
            onclick="setSuperCategory('${s.key}')">${s.label[currentLang]}</button>
  `).join('');
}

function setSuperCategory(key) {
  currentSuperCat = key;
  document.querySelectorAll('.scat-tab').forEach(t =>
    t.classList.toggle('active', t.dataset.key === key));

  // pick first sub-cat in this super-cat
  const firstCat = CATEGORIES.find(c => c.superCat === key);
  if (firstCat) currentCat = firstCat.key;
  renderCategories();
  renderGrid();
}

function renderCategories() {
  // Only show sub-cats belonging to current super-cat
  const visible = CATEGORIES.filter(c => c.superCat === currentSuperCat);
  const tabs = visible.map(c => `
    <button class="cat-tab ${c.key === currentCat ? 'active' : ''}"
            data-key="${c.key}"
            onclick="setCategory('${c.key}')">${c.label[currentLang]}</button>
  `).join('');
  const arrow = visible.length > 3
    ? `<div class="cat-scroll-indicator" onclick="document.getElementById('cat-nav').scrollBy({left:150,behavior:'smooth'})" aria-label="Пролистнуть" role="button">→</div>`
    : '';
  document.getElementById('cat-nav').innerHTML = tabs + arrow;
}

function setOrderType(type) {
  orderType = type;
  document.getElementById('ot-takeaway').classList.toggle('active', type === 'takeaway');
  document.getElementById('ot-dinein').classList.toggle('active', type === 'dinein');
  document.getElementById('ot-delivery').classList.toggle('active', type === 'delivery');

  document.getElementById('delivery-info').style.display = type === 'delivery' ? 'block' : 'none';
  document.getElementById('dinein-info').style.display = type === 'dinein' ? 'block' : 'none';

  renderDrawerItems();
  updateCartBar();
}

// ============================================================
//  CART  —  mutations
// ============================================================
function saveCart()       { localStorage.setItem('martebe_cart', JSON.stringify(cart)); }
function getCartCount()   { return cart.reduce((s,i) => s + i.qty, 0); }
function getCartTotal()   { return cart.reduce((s,i) => s + i.price * i.qty, 0); }
function getQty(id)       { const f = cart.find(c => c.id === id); return f ? f.qty : 0; }

function getContainersTotal() {
  if (orderType === 'dinein') return 0;
  let total = 0;
  cart.forEach(i => {
    const menuItem = MENU.find(m => m.id === i.id);
    if (menuItem) {
      const cats = ['breakfasts', 'salads', 'first', 'second', 'steaks', 'pizza'];
      if (cats.includes(menuItem.cat) || menuItem.id === 517 || menuItem.id === 522) {
        total += 150 * i.qty;
      }
    }
  });
  return total;
}

function clearCart() {
  if (!confirm('Вы уверены, что хотите очистить корзину?')) return;
  cart = [];
  saveCart();
  updateCartBar();
  document.querySelectorAll('.card-ctrl-slot').forEach(slot => {
    slot.innerHTML = cardCtrlHtml(parseInt(slot.dataset.cid));
  });
  renderDrawerItems();
}

function pluralRu(n, w) {
  const m = n % 10, h = n % 100;
  if (m === 1 && h !== 11) return w[0];
  if (m >= 2 && m <= 4 && (h < 10 || h >= 20)) return w[1];
  return w[2];
}

function addToCart(id, qty = 1) {
  const item = MENU.find(m => m.id === id);
  if (!item) return;
  const ex = cart.find(c => c.id === id);
  if (ex) ex.qty += qty;
  else cart.push({ id: item.id, name: item.name, price: item.price, qty,
                   emoji: item.emoji, gradient: item.gradient, img: item.img });
  saveCart();
  updateCartBar();
  refreshCtrl(id);        // update card control
}

function removeFromCart(id) {
  cart = cart.filter(c => c.id !== id);
  saveCart();
  updateCartBar();
  refreshCtrl(id);
}

function changeQty(id, delta) {
  const item = cart.find(c => c.id === id);
  if (!item) return;
  item.qty += delta;
  if (item.qty <= 0) { cart = cart.filter(c => c.id !== id); }
  saveCart();
  updateCartBar();
  refreshCtrl(id);
  renderDrawerItems();    // update drawer if open
}

// Quick-add from card "+" (stops click from opening modal)
function quickAdd(e, id) {
  e.stopPropagation();
  addToCart(id, 1);
}

// Minus/plus buttons on card control
function cardMinus(e, id) { e.stopPropagation(); changeQty(id, -1); }
function cardPlus(e, id)  { e.stopPropagation(); addToCart(id, 1); }

// ── CART BAR ────────────────────────────────────────────────
function updateCartBar() {
  const count = getCartCount();
  const containers = getContainersTotal();
  let total = getCartTotal() + containers;
  if (orderType === 'dinein') {
    total = Math.round(total * 1.12);
  }

  // header badge
  const badge = document.getElementById('header-badge');
  if (badge) { badge.textContent = count; badge.classList.toggle('show', count > 0); }

  const bar = document.getElementById('cart-bar');
  const main = document.getElementById('app-main');
  if (!bar) return;

  if (count === 0) {
    bar.classList.remove('visible');
    main.classList.remove('cart-up');
  } else {
    bar.classList.add('visible');
    main.classList.add('cart-up');
    document.getElementById('bar-count').textContent =
      count + ' ' + pluralRu(count, ['позиция','позиции','позиций']);
    document.getElementById('bar-total').textContent =
      total.toLocaleString('ru-RU') + ' ₸';
  }
}

// ============================================================
//  CARD CONTROL  —  refreshes "+" or "− N +" in image
// ============================================================
function cardCtrlHtml(id) {
  const qty = getQty(id);
  if (qty === 0) {
    return `<button class="card-plus" data-id="${id}"
                    onclick="quickAdd(event,${id})"
                    aria-label="Добавить">+</button>`;
  }
  return `<div class="card-qty-ctrl" data-id="${id}">
    <button class="cq-btn" onclick="cardMinus(event,${id})" aria-label="Убрать">−</button>
    <span  class="cq-num">${qty}</span>
    <button class="cq-btn" onclick="cardPlus(event,${id})"  aria-label="Добавить">+</button>
  </div>`;
}

// Update every slot on the page that belongs to this item
function refreshCtrl(id) {
  document.querySelectorAll(`.card-ctrl-slot[data-cid="${id}"]`).forEach(slot => {
    slot.innerHTML = cardCtrlHtml(id);
  });
}

// ============================================================
//  SECTION NAVIGATION
// ============================================================
function goTo(name) {
  if (currentSection === name) return;
  currentSection = name;

  // Sections
  document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
  document.getElementById(`section-${name}`).classList.add('active');

  // Bottom tabs
  document.querySelectorAll('.btab').forEach(t => {
    if (name === 'cabins') {
      t.classList.remove('active');
    } else {
      t.classList.toggle('active', t.dataset.section === name);
    }
  });

  // Category navs: only on menu
  const superNav  = document.getElementById('super-cat-nav');
  const catNav    = document.getElementById('cat-nav');
  const main      = document.getElementById('app-main');
  const searchBtn = document.getElementById('search-btn');

  if (name === 'menu') {
    superNav.classList.remove('hidden');
    catNav.classList.remove('hidden');
    main.classList.add('has-catnav');
    searchBtn.classList.remove('hidden');
  } else {
    superNav.classList.add('hidden');
    catNav.classList.add('hidden');
    main.classList.remove('has-catnav');
    searchBtn.classList.add('hidden');
    closeSearch();
  }

  // Scroll to top
  window.scrollTo({ top: 0, behavior: 'instant' });
}

// Shortcut: go to menu + set category
function goToMenu(cat) {
  currentCat = cat || currentCat;
  goTo('menu');
  renderSuperCategories();
  renderCategories();
  renderGrid();
}

// ============================================================
//  HOME SECTION
// ============================================================
function renderHome() {
  // Promo dots
  const dotsEl = document.getElementById('promo-dots-home');
  if (dotsEl) {
    dotsEl.innerHTML = PROMOS.map((_, i) =>
      `<div class="pd${i===0?' active':''}" onclick="showPromo(${i})"></div>`
    ).join('');
  }
  showPromo(0);
  startPromoTimer();

  // Popular items strip
  const popularIds = [404, 601, 503, 402, 409, 315, 203, 810]; // Curated list of signature dishes
  const popular = MENU.filter(m => popularIds.includes(m.id));
  const pop = document.getElementById('pop-scroll');
  if (pop) {
    pop.innerHTML = popular.map(item => `
      <div class="pop-chip" onclick="openModal(${item.id})">
        <div class="pop-chip-img"
             style="${item.img
               ? `background-image:url('${item.img}');background-size:cover;background-position:center`
               : `background:linear-gradient(135deg,${item.gradient[0]},${item.gradient[1]})`}">
          ${!item.img ? `<span style="font-size:3rem">${item.emoji}</span>` : ''}
          <div class="card-ctrl-slot" data-cid="${item.id}">${cardCtrlHtml(item.id)}</div>
        </div>
        <div class="pop-chip-body">
          <div class="pop-chip-price">${item.price.toLocaleString('ru-RU')} ₸</div>
          <div class="pop-chip-name">${item.name[currentLang]}</div>
        </div>
      </div>`).join('');
  }
}

// ── Promo ticker ────────────────────────────────────────────
function showPromo(idx) {
  promoIdx = (idx + PROMOS.length) % PROMOS.length;
  const p = PROMOS[promoIdx];
  const card = document.getElementById('promo-slide-card');
  if (!card) return;
  card.style.background   = p.bg;
  card.style.borderColor  = p.border;
  document.getElementById('ps-icon').textContent  = p.icon;
  document.getElementById('ps-title').textContent = p.title[currentLang];
  document.getElementById('ps-sub').textContent   = p.sub[currentLang];
  document.querySelectorAll('.pd').forEach((d, i) =>
    d.classList.toggle('active', i === promoIdx));
}
function nextPromo() { showPromo(promoIdx + 1); }
function prevPromo() { showPromo(promoIdx - 1); }
function startPromoTimer() {
  clearInterval(promoTimer);
  promoTimer = setInterval(nextPromo, 4500);
}

// ============================================================
//  MENU SECTION
// ============================================================
function setCategory(key) {
  currentCat = key;
  document.querySelectorAll('.cat-tab').forEach(t =>
    t.classList.toggle('active', t.dataset.key === key));
  const tab = document.querySelector(`.cat-tab[data-key="${key}"]`);
  if (tab) tab.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
  renderGrid();
}

function renderGrid(query = '') {
  const grid = document.getElementById('food-grid');
  if (!grid) return;
  let items = query
    ? MENU.filter(m => m.name[currentLang].toLowerCase().includes(query.toLowerCase()) ||
                       m.desc[currentLang].toLowerCase().includes(query.toLowerCase()))
    : MENU.filter(m => m.cat === currentCat);

  if (!items.length) {
    grid.innerHTML = `<div class="empty-state"><div class="empty-state-icon">🍽️</div><p>${I18N.search_empty[currentLang]}</p></div>`;
    return;
  }

  // Categories that render as list rows (no photos)
  const LIST_CATS = ['bread', 'assorted', 'banquet'];
  if (!query && LIST_CATS.includes(currentCat)) {
    grid.style.display = 'block';
    if (!items.length) {
      grid.innerHTML = `<div class="empty-state"><div class="empty-state-icon">🥤</div><p>${I18N.drinks_empty[currentLang]}</p></div>`;
      return;
    }
    grid.innerHTML = `<div class="menu-list">${
      items.map(item => `
        <div class="menu-list-item" onclick="openModal(${item.id})">
          <div class="mli-left">
            <div class="mli-name">${item.name[currentLang]}</div>
            <div class="mli-weight">${item.weight}</div>
          </div>
          <div class="mli-right">
            <div class="mli-price">${item.price.toLocaleString('ru-RU')} ₸</div>
            <div class="mli-btn" onclick="event.stopPropagation();addToCart(${item.id},1)">
              <div class="card-ctrl-slot" data-cid="${item.id}">${cardCtrlHtml(item.id)}</div>
            </div>
          </div>
        </div>`
      ).join('')
    }</div>`;
    return;
  }

  grid.style.display = '';
  grid.innerHTML = items.map((item, idx) => {
    const disc = item.origPrice ? Math.round((1 - item.price / item.origPrice) * 100) : null;
    const imgHtml = item.img
      ? `<div class="card-img" style="background-image:url('${item.img}')"></div>`
      : `<div class="card-emoji-wrap" style="background:linear-gradient(135deg,${item.gradient[0]},${item.gradient[1]})">
           <span class="card-emoji">${item.emoji}</span>
         </div>`;
    return `
      <div class="food-card" onclick="openModal(${item.id})"
           style="animation-delay:${Math.min(idx,8)*0.05}s" role="listitem">
        <div class="card-img-wrap">
          ${imgHtml}
          ${disc ? `<div class="card-disc-badge">-${disc}%</div>` : ''}
          <div class="card-ctrl-slot" data-cid="${item.id}">${cardCtrlHtml(item.id)}</div>
        </div>
        <div class="card-body">
          <div class="card-price-row">
            <span class="card-price">${item.price.toLocaleString('ru-RU')} ₸</span>
            ${item.origPrice ? `<span class="card-orig">${item.origPrice.toLocaleString('ru-RU')} ₸</span>` : ''}
          </div>
          <div class="card-name">${item.name[currentLang]}</div>
          ${item.rating ? `<div class="card-rating">👍 ${item.rating}% (${item.reviews})</div>` : ''}
        </div>
      </div>`;
  }).join('');
}

// ============================================================
//  PROMOS SECTION
// ============================================================
function renderPromos() {
  // Render dynamic promo banners
  const bannersContainer = document.getElementById('promo-banners-list');
  if (bannersContainer) {
    bannersContainer.innerHTML = PROMOS.map(p => `
      <div class="promo-banner" style="background:${p.bg};border-color:${p.border}">
        <span class="pb-icon">${p.icon}</span>
        <div class="pb-text">
          <div class="pb-title">${p.title[currentLang]}</div>
          <div class="pb-sub">${p.sub[currentLang]}</div>
        </div>
        <span class="pb-badge" style="${p.badge==='FREE' ? 'background:#E63946' : p.badge==='10+1' ? 'background:#795548' : ''}">${p.badge}</span>
      </div>
    `).join('');
  }

  // Render dynamic promo items grid
  const grid = document.getElementById('promos-items-grid');
  if (!grid) return;
  const items = MENU.filter(m => m.origPrice || m.cat === 'combos');
  grid.style.cssText = 'display:grid;grid-template-columns:1fr 1fr;gap:12px;padding:0';

  grid.innerHTML = items.map((item, idx) => {
    const pct  = item.origPrice ? Math.round((1 - item.price / item.origPrice) * 100) : 15;
    const save = item.origPrice ? (item.origPrice - item.price) : null;
    const imgStyle = item.img
      ? `background-image:url('${item.img}');background-size:cover;background-position:center`
      : `background:linear-gradient(135deg,${item.gradient[0]},${item.gradient[1]})`;
    return `
      <div class="promo-item-card" onclick="openModal(${item.id})"
           style="animation-delay:${Math.min(idx,8)*0.05}s">
        <div class="pic-img" style="${imgStyle}">
          ${!item.img ? `<span style="font-size:3rem;filter:drop-shadow(0 3px 10px rgba(0,0,0,.2))">${item.emoji}</span>` : ''}
          <div class="pic-disc">-${pct}%</div>
        </div>
        <div class="pic-body">
          <div class="pic-name">${item.name[currentLang]}</div>
          <div class="pic-prices">
            <span class="pic-new">${item.price.toLocaleString('ru-RU')} ₸</span>
            ${item.origPrice ? `<span class="pic-old">${item.origPrice.toLocaleString('ru-RU')} ₸</span>` : ''}
            ${save ? `<span class="pic-save">−${save.toLocaleString('ru-RU')} ₸</span>` : ''}
          </div>
          <button class="pic-add-btn" onclick="event.stopPropagation();addToCart(${item.id},1)">
            + В корзину
          </button>
        </div>
      </div>`;
  }).join('');
}

// ============================================================
//  CABINS SECTION
// ============================================================
function renderCabins() {
  const list = document.getElementById('cabins-list');
  if (!list) return;
  list.innerHTML = CABINS.map(c => `
    <div class="cabin-card">
      <div class="cabin-img" style="${c.img ? `background-image:url('${c.img}'); background-size:cover; background-position:center; text-indent:-9999px;` : ''}">Фото скоро будет</div>
      <div class="cabin-body">
        <h3 class="cabin-title">${c.name[currentLang]}</h3>
        <p class="cabin-desc">${c.desc[currentLang]}</p>
        <div class="cabin-meta">
          <span>👥 ${c.capacity[currentLang]}</span>
        </div>
        <button class="cabin-book-btn" onclick="bookCabin(${c.id})">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
          Бронь через WhatsApp
        </button>
      </div>
    </div>
  `).join('');
}

// ============================================================
//  MODAL  (item detail — bottom sheet)
// ============================================================
function openModal(id) {
  const item = MENU.find(m => m.id === id);
  if (!item) return;
  modalId = id; modalQty = 1;

  const imgEl = document.getElementById('modal-img-el');
  if (item.img) {
    imgEl.style.background      = 'var(--bg)';
    imgEl.style.backgroundImage = `url('${item.img}')`;
    imgEl.style.backgroundSize  = 'cover';
    imgEl.style.backgroundPosition = 'center';
    imgEl.innerHTML = '';
  } else {
    imgEl.style.backgroundImage = 'none';
    imgEl.style.background      = `linear-gradient(135deg,${item.gradient[0]},${item.gradient[1]})`;
    imgEl.innerHTML = `<span class="modal-emoji-big">${item.emoji}</span>`;
  }

  document.getElementById('modal-name').textContent  = item.name[currentLang];
  document.getElementById('modal-price').textContent = item.price.toLocaleString('ru-RU') + ' ₸';
  document.getElementById('modal-desc').textContent  = item.desc && item.desc[currentLang] ? item.desc[currentLang] : '';

  const origEl = document.getElementById('modal-orig-price');
  if (item.origPrice) { origEl.textContent = item.origPrice.toLocaleString('ru-RU') + ' ₸'; origEl.style.display='block'; }
  else origEl.style.display = 'none';

  let meta = '';
  if (item.rating) meta += `<span>👍 ${item.rating}% (${item.reviews} отзывов)</span>`;
  document.getElementById('modal-meta').innerHTML = meta;

  updateModalQtyDisplay();
  document.getElementById('modal-overlay').classList.add('open');
  document.getElementById('item-modal').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  document.getElementById('modal-overlay').classList.remove('open');
  document.getElementById('item-modal').classList.remove('open');
  document.body.style.overflow = '';
  modalId = null;
}

function changeModalQty(delta) {
  modalQty = Math.max(1, modalQty + delta);
  updateModalQtyDisplay();
}

function updateModalQtyDisplay() {
  document.getElementById('modal-qty-num').textContent = modalQty;
  const item = MENU.find(m => m.id === modalId);
  if (item) document.getElementById('modal-add-price').textContent =
    (item.price * modalQty).toLocaleString('ru-RU') + ' ₸';
}

function addFromModal() {
  if (!modalId) return;
  addToCart(modalId, modalQty);
  closeModal();
}

// ============================================================
//  CART DRAWER
// ============================================================
function openDrawer() {
  renderDrawerItems();
  document.getElementById('drawer-overlay').classList.add('open');
  document.getElementById('cart-drawer').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeDrawer() {
  document.getElementById('drawer-overlay').classList.remove('open');
  document.getElementById('cart-drawer').classList.remove('open');
  document.body.style.overflow = '';
}

function renderDrawerItems() {
  const container = document.getElementById('drawer-items');
  const emptyEl   = document.getElementById('drawer-empty');
  const footEl    = document.getElementById('drawer-foot');
  if (!container) return;

  if (!cart.length) {
    container.innerHTML = '';
    emptyEl.style.display = 'block';
    footEl.style.display  = 'none';
    return;
  }
  emptyEl.style.display = 'none';
  footEl.style.display  = 'block';

  container.innerHTML = cart.map(item => {
    const iStyle = item.img
      ? `background-image:url('${item.img}');background-size:cover;background-position:center`
      : `background:linear-gradient(135deg,${item.gradient[0]},${item.gradient[1]})`;
    return `
      <div class="drawer-item">
        <div class="di-img" style="${iStyle}">${!item.img ? item.emoji : ''}</div>
        <div class="di-info">
          <div class="di-name">${item.name[currentLang] || item.name}</div>
          <div class="di-price">${item.price.toLocaleString('ru-RU')} ₸</div>
        </div>
        <div class="di-qty">
          <button class="di-qty-btn" onclick="changeQty(${item.id},-1)">−</button>
          <span class="di-qty-num">${item.qty}</span>
          <button class="di-qty-btn" onclick="changeQty(${item.id},+1)">+</button>
        </div>
      </div>`;
  }).join('');

  const containers = getContainersTotal();
  const feeRow = document.getElementById('drawer-container-fee-row');
  if (feeRow) {
    if (containers > 0) {
      feeRow.style.display = 'flex';
      document.getElementById('drawer-container-fee').textContent = containers.toLocaleString('ru-RU') + ' ₸';
    } else {
      feeRow.style.display = 'none';
    }
  }

  let total = getCartTotal() + containers;
  if (orderType === 'dinein') {
    total = Math.round(total * 1.12);
  }
  document.getElementById('drawer-total').textContent =
    total.toLocaleString('ru-RU') + ' ₸';
}

function orderViaWhatsApp() {
  if (!cart.length) return;
  
  if (orderType === 'delivery') {
    const addr = document.getElementById('delivery-address').value.trim();
    if (!addr) {
      alert('Пожалуйста, введите адрес доставки.');
      document.getElementById('delivery-address').focus();
      return;
    }
  }

  let msg = '🍽️ *Заказ из ресторана märtebe*\n\n';
  
  let typeStr = 'С собой';
  if (orderType === 'dinein') typeStr = 'В заведении';
  if (orderType === 'delivery') typeStr = 'Доставка';
  
  msg += `Способ получения: *${typeStr}*\n`;
  if (orderType === 'delivery') {
    msg += `📍 Адрес: *${document.getElementById('delivery-address').value.trim()}*\n`;
  }
  msg += '\n';

  cart.forEach(i => {
    const itemName = i.name[currentLang] || i.name;
    msg += `${i.emoji} ${itemName} × ${i.qty} = ${(i.price*i.qty).toLocaleString('ru-RU')} ₸\n`;
  });
  
  let subTotal = getCartTotal();
  const containers = getContainersTotal();
  
  if (containers > 0) {
    msg += `\nКонтейнеры / Коробки: ${containers.toLocaleString('ru-RU')} ₸\n`;
    subTotal += containers;
  }

  let finalTotal = subTotal;

  if (orderType === 'dinein') {
    const service = Math.round(subTotal * 0.12);
    msg += `\nОбслуживание 12%: ${service.toLocaleString('ru-RU')} ₸`;
    finalTotal = Math.round(subTotal * 1.12);
  }

  msg += `\n💰 *Итого: ${finalTotal.toLocaleString('ru-RU')} ₸*`;
  
  if (orderType === 'delivery') {
    msg += '\n\n_Примечание: доставка вне таможни оплачивается клиентом (такси)._';
  }

  msg += '\n\n📍 _Сарыагаш, Кошербаева 1А. Жду подтверждения!_';
  window.open(`https://wa.me/${WA_ORDER}?text=${encodeURIComponent(msg)}`, '_blank');
}

// ============================================================
//  BOOKINGS
// ============================================================
function bookCabin(id) {
  const cabin = CABINS.find(c => c.id === id);
  let msg = `Здравствуйте! Хочу забронировать *${cabin.name}* в ресторане märtebe.\n\nПодскажите, свободна ли она на сегодня/завтра?`;
  window.open(`https://wa.me/${WA_BOOKING}?text=${encodeURIComponent(msg)}`, '_blank');
}

function bookTable() {
  let msg = `Здравствуйте! Хочу забронировать столик в ресторане märtebe.\n\nПодскажите, есть ли свободные места на сегодня/завтра?`;
  window.open(`https://wa.me/${WA_BOOKING}?text=${encodeURIComponent(msg)}`, '_blank');
}

// ============================================================
//  SEARCH
// ============================================================
function openSearch() {
  document.getElementById('search-bar').classList.add('open');
  document.getElementById('search-input').focus();
}
function closeSearch() {
  document.getElementById('search-bar').classList.remove('open');
  const inp = document.getElementById('search-input');
  if (inp) { inp.value = ''; }
  if (currentSection === 'menu') renderGrid();
}

// ============================================================
//  INIT
// ============================================================
document.addEventListener('DOMContentLoaded', () => {
  // Initial section
  document.getElementById('section-home').classList.add('active');
  document.querySelector('.btab[data-section="home"]').classList.add('active');
  document.getElementById('cat-nav').classList.add('hidden');
  document.getElementById('search-btn').classList.add('hidden');

  // Render everything
  renderHome();
  renderCategories();
  renderGrid();
  renderPromos();
  renderCabins();
  updateCartBar();

  // Search events
  document.getElementById('search-btn').addEventListener('click', openSearch);
  document.getElementById('search-close-btn').addEventListener('click', closeSearch);
  document.getElementById('search-input').addEventListener('input', e => {
    goTo('menu');
    renderGrid(e.target.value.trim());
  });

  // Cart bar → open drawer
  document.getElementById('cart-bar').addEventListener('click', openDrawer);
  // Cart icon → open drawer
  document.getElementById('cart-icon-btn').addEventListener('click', openDrawer);

  // Overlays
  document.getElementById('drawer-overlay').addEventListener('click', closeDrawer);
  document.getElementById('modal-overlay').addEventListener('click', closeModal);

  // Modal qty
  document.getElementById('modal-minus').addEventListener('click', () => changeModalQty(-1));
  document.getElementById('modal-plus').addEventListener('click',  () => changeModalQty(+1));

  // Keyboard
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') { closeModal(); closeDrawer(); closeSearch(); }
  });
});

  module.exports = { MENU, I18N };
