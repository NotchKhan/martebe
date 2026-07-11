const fs = require('fs');
const jsdom = require('jsdom');
const { JSDOM } = jsdom;

const html = fs.readFileSync('index.html', 'utf8');
const script = fs.readFileSync('app.js', 'utf8');

const dom = new JSDOM(html, { runScripts: "dangerously", url: "http://localhost/" });
const window = dom.window;

// Mock localStorage
window.localStorage = {
  getItem: () => null,
  setItem: () => {},
  removeItem: () => {}
};

window.addEventListener('error', event => {
  console.error("Runtime Error:", event.error);
});

try {
  const scriptEl = window.document.createElement('script');
  scriptEl.textContent = script;
  window.document.body.appendChild(scriptEl);

  window.document.dispatchEvent(new window.Event('DOMContentLoaded'));

  console.log("Calling setLang('zh')");
  window.setLang('zh');
  console.log("Successfully ran setLang('zh')");
  
  console.log("Calling setLang('ru')");
  window.setLang('ru');
  console.log("Successfully ran setLang('ru')");
} catch (e) {
  console.error("Caught error:", e);
}
