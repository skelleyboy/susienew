import fs from 'fs';
const file = 'client/src/components/ui/Hero.tsx';
let content = fs.readFileSync(file, 'utf-8');

// Adjust spacing for the mobile badge above CTA
content = content.replace(
  'className="flex md:hidden justify-center mb-10"',
  'className="flex md:hidden justify-center mb-6"'
);

fs.writeFileSync(file, content);
console.log("Hero spacing patched.");
