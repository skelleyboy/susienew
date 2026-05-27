import fs from 'fs';
const file = 'client/src/components/ui/AreaCard.tsx';
let content = fs.readFileSync(file, 'utf-8');
content = content.replace(
  '{area.highlights.map((highlight, idx) => (',
  '{area.highlights?.map((highlight, idx) => ('
);
fs.writeFileSync(file, content);
console.log("AreaCard patched.");
