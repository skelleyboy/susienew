const fs = require('fs');

let areaContent = fs.readFileSync('client/src/pages/Area.tsx', 'utf-8');

// Fix area.highlights.map runtime error
areaContent = areaContent.replace(
  '{area.highlights.map((highlight, index) => (',
  '{area.highlights?.map((highlight, index) => ('
);

fs.writeFileSync('client/src/pages/Area.tsx', areaContent);
console.log('Fixed Area.tsx runtime error');
