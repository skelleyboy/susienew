const fs = require('fs');

let areaContent = fs.readFileSync('client/src/pages/Area.tsx', 'utf-8');

// Fix area.highlights map runtime error by adding a safe fallback
areaContent = areaContent.replace(
  '{area.highlights.map((highlight, idx) => (',
  '{(area.highlights || []).map((highlight, idx) => ('
);

fs.writeFileSync('client/src/pages/Area.tsx', areaContent);
console.log('Fixed Area.tsx highlights map error');
