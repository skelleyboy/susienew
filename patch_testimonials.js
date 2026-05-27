import fs from 'fs';

const file = 'client/src/data/testimonials.json';
let testimonials = JSON.parse(fs.readFileSync(file, 'utf-8'));

// Filter out reviews for "Joe" or "Maxine" (men / other agents)
testimonials = testimonials.filter(t => !t.text.toLowerCase().includes('joe ') && !t.text.toLowerCase().includes('maxine'));

fs.writeFileSync(file, JSON.stringify(testimonials, null, 2));
console.log("Testimonials filtered.");
