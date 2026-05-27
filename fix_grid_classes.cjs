const fs = require('fs');

// Fix spacing on Buy page to accommodate the new big dark listing cards
let buyContent = fs.readFileSync('client/src/pages/Buy.tsx', 'utf-8');
buyContent = buyContent.replace(
  '<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">',
  '<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-1">'
);
fs.writeFileSync('client/src/pages/Buy.tsx', buyContent);

// Fix Home page listing grid gap
let homeContent = fs.readFileSync('client/src/pages/Home.tsx', 'utf-8');
homeContent = homeContent.replace(
  '<div className="grid grid-cols-1 md:grid-cols-2 gap-8">',
  '<div className="grid grid-cols-1 md:grid-cols-2 gap-1">'
);
fs.writeFileSync('client/src/pages/Home.tsx', homeContent);

console.log('Fixed grids for ListingCards');
