import fs from 'fs';
const file = 'client/src/pages/Home.tsx';
let content = fs.readFileSync(file, 'utf-8');
content = content.replace(
  'title: "Susie Sharak | Top Real Estate Agent Royal Oak, Troy & Sterling Heights"',
  'title: "Susie Sharak | Best Realtor in Royal Oak, Troy & Shelby Township"'
);
content = content.replace(
  'description: "Looking to sell your house in Royal Oak, Troy, or Sterling Heights? Susie Sharak is a top 5% Realtor helping home buyers and sellers in Oakland & Macomb County get the best results."',
  'description: "Looking for the best Realtor in Royal Oak, Troy, Shelby Township, and surrounding areas? Susie Sharak is a top 5% real estate agent helping buyers and sellers get top results."'
);
fs.writeFileSync(file, content);
