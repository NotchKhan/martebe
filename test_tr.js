process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
const { translate } = require('@vitalets/google-translate-api');
async function test() {
  try {
    let res = await translate('Рисовая каша', { to: 'zh-CN' });
    console.log(res.text);
  } catch(e) {
    console.log(e);
  }
}
test();
