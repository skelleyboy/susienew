import fs from 'fs';
const file = 'client/src/components/ui/Hero.tsx';
let content = fs.readFileSync(file, 'utf-8');

const zillowBadge = `
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex justify-center mb-8"
        >
          <div className="bg-white/95 backdrop-blur-md px-6 py-3 rounded-full flex items-center gap-4 shadow-xl border border-white/20">
            <img src="/zillow-logo.svg" alt="Zillow" className="h-6 object-contain" />
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <svg key={star} className="w-5 h-5 text-[#006AFF] fill-current" viewBox="0 0 24 24">
                  <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                </svg>
              ))}
            </div>
            <div className="flex flex-col text-left border-l pl-4 border-gray-200">
              <span className="text-xs font-bold text-gray-900 tracking-wider">PREMIER AGENT</span>
              <span className="text-[10px] text-gray-600 font-medium">5.0 ★ Top Rated</span>
            </div>
          </div>
        </motion.div>
`;

if (!content.includes('zillow-logo.svg')) {
  content = content.replace(
    '<h1 className="font-serif',
    `${zillowBadge}\n          <h1 className="font-serif`
  );
  fs.writeFileSync(file, content);
  console.log("Hero patched with Zillow badge");
} else {
  console.log("Hero already patched");
}
