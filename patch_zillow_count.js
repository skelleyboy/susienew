import fs from 'fs';
const file = 'client/src/components/ui/TestimonialSection.tsx';
let content = fs.readFileSync(file, 'utf-8');

// Update the Zillow review count to 18
content = content.replace(
  'on 22 reviews',
  'on 18 reviews'
);

fs.writeFileSync(file, content);
console.log("Review count patched.");
