const fs = require('fs');

let communitiesContent = fs.readFileSync('client/src/pages/Communities.tsx', 'utf-8');

// Ensure Communities page uses the tighter grid for the new big text cards
communitiesContent = communitiesContent.replace(
  '<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">',
  '<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-1">'
);

fs.writeFileSync('client/src/pages/Communities.tsx', communitiesContent);
console.log('Fixed AreaCard spacing on Communities page');
