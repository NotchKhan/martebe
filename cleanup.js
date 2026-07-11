const fs = require('fs');
let content = fs.readFileSync('app.js', 'utf8');

// The objects look like:
// en: '...', zh: '...', zh: '...'
// We want to remove all `zh: ...` except the last one for each object.
// We can do this line by line.

let lines = content.split('\n');
for (let i = 0; i < lines.length; i++) {
  let line = lines[i];
  if (line.includes('zh:')) {
    // Find all occurrences of `, zh: '...'` or `, zh: ["..."]`
    // We know `zh:` only appears at the end of the localization object before ` }`
    // Let's use a regex that captures all `zh: <value>` in the line
    const regex = /,\s*zh:\s*('[^']*'|"[^"]*"|\[[^\]]*\])/g;
    
    let matches = [];
    let match;
    while ((match = regex.exec(line)) !== null) {
      matches.push(match);
    }
    
    if (matches.length > 1) {
      // Keep the last one
      let lastMatch = matches[matches.length - 1];
      
      // Remove all previous zh matches from the line
      // Actually, we can just replace everything from the first zh match to the end of the last match
      // Wait, what if there's other text? The zh matches are contiguous at the end of the object.
      let firstMatchIndex = matches[0].index;
      let lastMatchEnd = lastMatch.index + lastMatch[0].length;
      
      let prefix = line.substring(0, firstMatchIndex);
      let suffix = line.substring(lastMatchEnd);
      
      lines[i] = prefix + lastMatch[0] + suffix;
    }
  }
}

fs.writeFileSync('app.js', lines.join('\n'));
console.log('Cleaned duplicate zh keys!');
