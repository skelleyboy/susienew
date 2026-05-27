const fs = require('fs');

let homeContent = fs.readFileSync('client/src/pages/Home.tsx', 'utf-8');

// Change grid for communities to accommodate the new square cards
homeContent = homeContent.replace(
  '<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">',
  '<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-1">'
);

fs.writeFileSync('client/src/pages/Home.tsx', homeContent);
console.log('Fixed AreaCard spacing on Home');
