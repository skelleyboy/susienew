import fs from 'fs';

// Patch Home.tsx
let homeContent = fs.readFileSync('client/src/pages/Home.tsx', 'utf-8');
homeContent = homeContent.replace(
  'headline="Sell Your House for Top Dollar in Oakland & Macomb County"',
  'headline="Work with the Best Realtor in Royal Oak, Troy & Shelby Township"'
);
homeContent = homeContent.replace(
  'subhead="The #1 Real Estate Agent serving Royal Oak, Troy, Sterling Heights, Washington Twp, and Shelby Township. We find home buyers when others can\'t."',
  'subhead="Ranked among the top real estate agents in Michigan. Whether you\'re buying or selling a house in Oakland or Macomb County, Susie Sharak delivers top dollar results."'
);
homeContent = homeContent.replace(
  '<h2 className="font-serif text-3xl md:text-5xl mb-6">Featured Luxury Properties</h2>',
  '<h2 className="font-serif text-3xl md:text-5xl mb-6">Featured Properties in Royal Oak, Troy & Beyond</h2>'
);
fs.writeFileSync('client/src/pages/Home.tsx', homeContent);

// Patch About.tsx
let aboutContent = fs.readFileSync('client/src/pages/About.tsx', 'utf-8');
aboutContent = aboutContent.replace(
  'title: "About Susie Sharak | Top 5% Realtor in Oakland & Macomb County"',
  'title: "About Susie Sharak | Best Realtor in Royal Oak, Troy & Shelby Township"'
);
aboutContent = aboutContent.replace(
  'description: "Meet Susie Sharak, your trusted real estate advisor in Royal Oak, Troy, and Sterling Heights. Dedicated to elevating your real estate experience."',
  'description: "Meet Susie Sharak, widely recognized as one of the best real estate agents in Royal Oak, Troy, and Shelby Township. Dedicated to elevating your real estate experience."'
);
aboutContent = aboutContent.replace(
  '<h2 className="font-serif text-4xl md:text-5xl mb-8 text-primary">Your Trusted Advisor in Royal Oak & Troy</h2>',
  '<h2 className="font-serif text-4xl md:text-5xl mb-8 text-primary">The Best Real Estate Agent in Royal Oak, Troy & Shelby Township</h2>'
);
fs.writeFileSync('client/src/pages/About.tsx', aboutContent);

// Patch Area.tsx
let areaContent = fs.readFileSync('client/src/pages/Area.tsx', 'utf-8');
areaContent = areaContent.replace(
  'title: `Top Real Estate Agent in ${area.name}, MI | Buy & Sell Homes | Susie Sharak`,',
  'title: `Best Realtor in ${area.name}, MI | Top Real Estate Agent | Susie Sharak`,'
);
areaContent = areaContent.replace(
  'description: `Looking to sell your house in ${area.name}, Michigan? Discover the lifestyle, real estate, and community. Explore market trends and find your dream home.`,',
  'description: `Looking for the best real estate agent to buy or sell a house in ${area.name}, Michigan? Susie Sharak offers top-tier real estate services, market trends, and luxury homes.`,'
);
fs.writeFileSync('client/src/pages/Area.tsx', areaContent);

console.log("SEO patches applied successfully.");
