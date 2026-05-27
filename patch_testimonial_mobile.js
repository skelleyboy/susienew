import fs from 'fs';
const file = 'client/src/components/ui/TestimonialSection.tsx';
let content = fs.readFileSync(file, 'utf-8');

content = content.replace(
  '<div className="bg-white px-6 py-4 rounded-xl flex flex-col md:flex-row items-center gap-6 shadow-md border border-gray-100">',
  '<div className="bg-white px-4 sm:px-6 py-4 rounded-xl flex flex-col sm:flex-row items-center gap-4 sm:gap-6 shadow-md border border-gray-100 max-w-full overflow-hidden">'
);

content = content.replace(
  '<div className="flex flex-col items-center md:items-start">',
  '<div className="flex flex-col items-center sm:items-start text-center sm:text-left">'
);

content = content.replace(
  '<div className="text-sm text-gray-600 mb-1">',
  '<div className="text-sm text-gray-600 mb-1 leading-snug">'
);

fs.writeFileSync(file, content);
console.log("Testimonial mobile patched");
