const fs = require('fs');

let homeContent = fs.readFileSync('client/src/pages/Home.tsx', 'utf-8');

// Update Buying Card to look more like a big text link
homeContent = homeContent.replace(
  '<div className="group relative overflow-hidden h-[600px] md:h-[800px] flex flex-col justify-center items-center text-center">',
  '<Link href="/buy" className="group relative overflow-hidden h-[600px] md:h-[800px] flex flex-col justify-center items-center text-center cursor-pointer">'
);
homeContent = homeContent.replace(
  '              <Button variant="outline" className="rounded-none border-white text-white hover:bg-white hover:text-primary uppercase tracking-[0.2em] text-xs font-medium px-8 py-6" asChild>\n                <Link href="/buy">Find Your Home</Link>\n              </Button>\n            </div>\n          </div>',
  '              <div className="mt-8 flex items-center justify-center text-white text-sm tracking-[0.2em] uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-700 delay-200">\n                Find Your Home <ArrowRight className="ml-2 w-4 h-4" />\n              </div>\n            </div>\n          </Link>'
);

// Update Selling Card to look more like a big text link
homeContent = homeContent.replace(
  '<div className="group relative overflow-hidden h-[600px] md:h-[800px] flex flex-col justify-center items-center text-center">',
  '<Link href="/sell" className="group relative overflow-hidden h-[600px] md:h-[800px] flex flex-col justify-center items-center text-center cursor-pointer">'
);
homeContent = homeContent.replace(
  '              <Button variant="outline" className="rounded-none border-white text-white hover:bg-white hover:text-primary uppercase tracking-[0.2em] text-xs font-medium px-8 py-6" asChild>\n                <Link href="/sell">Sell Your Home</Link>\n              </Button>\n            </div>\n          </div>',
  '              <div className="mt-8 flex items-center justify-center text-white text-sm tracking-[0.2em] uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-700 delay-200">\n                Sell Your Home <ArrowRight className="ml-2 w-4 h-4" />\n              </div>\n            </div>\n          </Link>'
);

fs.writeFileSync('client/src/pages/Home.tsx', homeContent);
console.log('Fixed Home cards to be large clickable text links');
