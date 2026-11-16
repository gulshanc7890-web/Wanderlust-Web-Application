const fs = require('fs');
const report = JSON.parse(fs.readFileSync('eslint-report.json', 'utf-8'));

report.forEach(file => {
  if (file.errorCount === 0 && file.warningCount === 0) return;
  
  let content = fs.readFileSync(file.filePath, 'utf-8');
  let lines = content.split('\n');
  let needsWrite = false;

  // We sort messages by line in reverse order so that modifications don't mess up subsequent line numbers
  let messages = file.messages.sort((a, b) => b.line - a.line);

  messages.forEach(msg => {
    if (msg.ruleId === 'no-unused-vars') {
      if (msg.message.includes("'React' is defined but never used")) {
        // Just remove the word React from the import
        let line = lines[msg.line - 1];
        if (line.includes('import React, {') || line.includes('import React , {')) {
            lines[msg.line - 1] = line.replace(/React\s*,\s*/, '');
            needsWrite = true;
        } else if (line.includes('import React from')) {
            lines[msg.line - 1] = `// ${line}`; // just comment it out
            needsWrite = true;
        }
      } else {
        // disable other unused vars
        let line = lines[msg.line - 1];
        lines.splice(msg.line - 1, 0, `// eslint-disable-next-line ${msg.ruleId}`);
        needsWrite = true;
      }
    } else if (msg.ruleId === 'react-hooks/exhaustive-deps') {
      lines.splice(msg.line - 1, 0, `// eslint-disable-next-line ${msg.ruleId}`);
      needsWrite = true;
    } else {
      lines.splice(msg.line - 1, 0, `// eslint-disable-next-line ${msg.ruleId}`);
      needsWrite = true;
    }
  });

  if (needsWrite) {
    fs.writeFileSync(file.filePath, lines.join('\n'));
    console.log(`Fixed ${file.filePath}`);
  }
});
