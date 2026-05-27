import fs from 'fs';
const file = 'client/src/components/ui/TestimonialSection.tsx';
let content = fs.readFileSync(file, 'utf-8');

// Remove the user name from the citation
content = content.replace(
  '{testimonial.date} • {testimonial.name}',
  '{testimonial.date}'
);

content = content.replace(
  '{testimonial.date} • {testimonial.name}', // just in case
  '{testimonial.date}'
);

fs.writeFileSync(file, content);
console.log("Testimonial name removed from UI.");
