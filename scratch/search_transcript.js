const fs = require('fs');
const logPath = 'C:\\Users\\narci\\.gemini\\antigravity\\brain\\46ec3d88-1271-460c-9251-2f67e2324751\\.system_generated\\logs\\transcript.jsonl';

try {
  const fileContent = fs.readFileSync(logPath, 'utf8');
  const lines = fileContent.split('\n').filter(line => line.trim() !== '');
  
  for (let i = 0; i < lines.length; i++) {
    try {
      const parsed = JSON.parse(lines[i]);
      if (parsed.step_index === 2084) {
        console.log(`\n--- STEP 2084 ---`);
        console.log(parsed.content);
        break;
      }
    } catch (e) {
      // Ignore
    }
  }
} catch (err) {
  console.error('Error:', err);
}
