const fs = require('fs');
const logPath = 'C:/Users/User0528/.gemini/antigravity/brain/df8f7205-87b7-45af-8c70-349866052d06/.system_generated/logs/transcript.jsonl';
const lines = fs.readFileSync(logPath, 'utf8').split('\n');
const menuItems = new Map();

for (let l of lines) {
  try {
    const obj = JSON.parse(l);
    if (obj.step_index >= 900) break; // Before corruption
    
    // Check if output contains view_file content
    let content = obj.content || obj.output || '';
    if (content.includes('File Path: `file:///c:/Users/User0528/Desktop/MARTEBE/app.js`')) {
      const outputLines = content.split('\n');
      for (let ol of outputLines) {
        // Line format: <line_number>: <original_line>
        const match = ol.match(/^\d+:\s*(.*)/);
        if (match) {
          const originalLine = match[1];
          if (originalLine.includes('{ id:') && originalLine.includes('name: {')) {
            // Extract the id
            const idMatch = originalLine.match(/id:\s*(\d+)/);
            if (idMatch) {
              menuItems.set(idMatch[1], originalLine);
            }
          }
        }
      }
    }
  } catch (e) {}
}

console.log(`Found ${menuItems.size} items from transcript.`);
fs.writeFileSync('restored_items.json', JSON.stringify(Array.from(menuItems.entries()), null, 2));
