import fs from 'fs';
const file = 'client/src/components/ui/Hero.tsx';
let content = fs.readFileSync(file, 'utf-8');

// Update to Zillow Blue and refine the hero badge look
content = content.replace(
  '<div className="bg-white/95 backdrop-blur-md px-6 py-3 rounded-full flex items-center gap-4 shadow-xl border border-white/20">',
  '<div className="bg-white/95 backdrop-blur-md px-6 py-3 rounded-xl flex items-center gap-4 shadow-xl border border-white/20">'
);

content = content.replace(
  '<img src="/zillow-logo.svg" alt="Zillow" className="h-6 object-contain" />',
  '<img src="/zillow-logo.svg" alt="Zillow" className="h-7 object-contain mb-1" />'
);

content = content.replace(
  '<span className="text-xs font-bold text-gray-900 tracking-wider">PREMIER AGENT</span>',
  '<span className="text-xs font-bold text-[#006AFF] tracking-wider uppercase">Premier Agent</span>'
);

content = content.replace(
  '<span className="text-[10px] text-gray-600 font-medium">5.0 ★ Top Rated</span>',
  '<span className="text-[10px] text-gray-600 font-medium tracking-wide">Top 5% Realtor</span>'
);

fs.writeFileSync(file, content);
console.log("Hero UI patched");
