import fs from 'fs';
const file = 'client/src/components/ui/Hero.tsx';
let content = fs.readFileSync(file, 'utf-8');

// 1. Remove the existing badge block completely
const badgeRegex = /<motion\.div[\s\S]*?className="flex justify-center mb-8"[\s\S]*?<div className="bg-white\/95 backdrop-blur-md[\s\S]*?<\/div>\s*<\/motion\.div>/g;
content = content.replace(badgeRegex, '');

// The badge HTML content itself without the motion.div wrapper
const badgeInner = `
          <div className="bg-white/95 backdrop-blur-md px-4 sm:px-6 py-3 sm:py-3 rounded-xl flex flex-col sm:flex-row items-center gap-2 sm:gap-4 shadow-xl border border-white/20">
            <img src="/zillow-logo.svg" alt="Zillow" className="h-7 object-contain mb-1" />
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <svg key={star} className="w-5 h-5 text-[#006AFF] fill-current" viewBox="0 0 24 24">
                  <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                </svg>
              ))}
            </div>
            <div className="flex flex-col text-center sm:text-left border-t sm:border-t-0 sm:border-l pt-2 sm:pt-0 sm:pl-4 border-gray-200 w-full sm:w-auto">
              <span className="text-xs font-bold text-[#006AFF] tracking-wider uppercase">Premier Agent</span>
              <span className="text-[10px] text-gray-600 font-medium tracking-wide">Top 5% Realtor</span>
            </div>
          </div>
`;

// Desktop badge (hidden on mobile)
const desktopBadge = `
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="hidden md:flex justify-center mb-8"
        >${badgeInner}
        </motion.div>
`;

// Mobile badge (hidden on desktop)
const mobileBadge = `
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex md:hidden justify-center mb-10"
        >${badgeInner}
        </motion.div>
`;

// Insert desktop badge before h1
content = content.replace(
  '<h1 className="font-serif',
  `${desktopBadge}\n          <h1 className="font-serif`
);

// Insert mobile badge before CTA buttons block
content = content.replace(
  '<motion.div\n          initial={{ opacity: 0, y: 20 }}\n          animate={{ opacity: 1, y: 0 }}\n          transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}\n          className="flex flex-col sm:flex-row gap-6 justify-center"',
  `${mobileBadge}\n        <motion.div\n          initial={{ opacity: 0, y: 20 }}\n          animate={{ opacity: 1, y: 0 }}\n          transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}\n          className="flex flex-col sm:flex-row gap-6 justify-center"`
);

fs.writeFileSync(file, content);
console.log("Badge placement patched successfully.");
