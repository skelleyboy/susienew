import fs from 'fs';
const file = 'client/src/components/ui/TestimonialSection.tsx';
let content = fs.readFileSync(file, 'utf-8');

// Ensure the review text looks good on mobile
content = content.replace(
  '<blockquote className="font-serif text-xl md:text-2xl text-primary leading-relaxed mb-8 font-light max-h-[300px] overflow-y-auto pr-4 scrollbar-thin">',
  '<blockquote className="font-serif text-lg sm:text-xl md:text-2xl text-primary leading-relaxed mb-8 font-light max-h-[250px] sm:max-h-[300px] overflow-y-auto pr-2 sm:pr-4 scrollbar-thin">'
);

fs.writeFileSync(file, content);
console.log("Testimonial text mobile patched");
