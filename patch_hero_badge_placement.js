import fs from 'fs';
const file = 'client/src/components/ui/Hero.tsx';
let content = fs.readFileSync(file, 'utf-8');

// The badge HTML block
const badgeHTML = `        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex justify-center mb-8"
        >
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
        </motion.div>`;

// Remove the badge from its current location above the h1
content = content.replace(badgeHTML, '');

// We want to add it above the CTA buttons, but only on mobile. 
// However, the cleanest way to handle "move down on mobile, stay up on desktop" 
// is to render it twice and use CSS classes (hidden md:flex / flex md:hidden) to toggle visibility based on screen size.

// First, put it back above the h1 but hide it on mobile (hidden md:flex)
const desktopBadgeHTML = badgeHTML.replace('className="flex justify-center mb-8"', 'className="hidden md:flex justify-center mb-8"');
content = content.replace(
  '<h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl',
  `${desktopBadgeHTML}\n\n          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl`
);

// Second, put it above the CTA buttons and show it only on mobile (flex md:hidden)
const mobileBadgeHTML = badgeHTML.replace('className="flex justify-center mb-8"', 'className="flex md:hidden justify-center mb-8 mt-4"');
content = content.replace(
  '<div className="flex flex-col sm:flex-row gap-6 justify-center">',
  `\n${mobileBadgeHTML}\n          <div className="flex flex-col sm:flex-row gap-6 justify-center">`
);

// We need to move the animation wrapper to wrap the CTA block so the flex col works right
// Actually, it's easier to just insert it right before the motion div of the buttons
content = content.replace(
  '<motion.div\n          initial={{ opacity: 0, y: 20 }}\n          animate={{ opacity: 1, y: 0 }}\n          transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}\n          className="flex flex-col sm:flex-row gap-6 justify-center"\n        >',
  `${mobileBadgeHTML}\n        <motion.div\n          initial={{ opacity: 0, y: 20 }}\n          animate={{ opacity: 1, y: 0 }}\n          transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}\n          className="flex flex-col sm:flex-row gap-6 justify-center"\n        >`
);

// Oops, the regex replace for mobileBadgeHTML ran twice because of how I wrote it. Let's reset the file and do it cleaner.
