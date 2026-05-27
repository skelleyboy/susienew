import fs from 'fs';
const file = 'client/src/components/ui/Hero.tsx';
let content = fs.readFileSync(file, 'utf-8');

// Update Zillow badge to wrap nicely on mobile
content = content.replace(
  '<div className="bg-white/95 backdrop-blur-md px-6 py-3 rounded-xl flex items-center gap-4 shadow-xl border border-white/20">',
  '<div className="bg-white/95 backdrop-blur-md px-4 sm:px-6 py-3 sm:py-3 rounded-xl flex flex-col sm:flex-row items-center gap-2 sm:gap-4 shadow-xl border border-white/20">'
);

content = content.replace(
  '<div className="flex flex-col text-left border-l pl-4 border-gray-200">',
  '<div className="flex flex-col text-center sm:text-left border-t sm:border-t-0 sm:border-l pt-2 sm:pt-0 sm:pl-4 border-gray-200 w-full sm:w-auto">'
);

fs.writeFileSync(file, content);
console.log("Hero mobile patched");
