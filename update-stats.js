const fs = require('fs');
const file = 'client/src/data/areas.json';
let areas = JSON.parse(fs.readFileSync(file, 'utf8'));

const updates = {
  'royal-oak': { avgPrice: '$395,000', daysOnMarket: '18', homesSold: '85' },
  'troy': { avgPrice: '$525,000', daysOnMarket: '16', homesSold: '120' },
  'shelby-township': { avgPrice: '$465,000', daysOnMarket: '21', homesSold: '95' },
  'sterling-heights': { avgPrice: '$345,000', daysOnMarket: '15', homesSold: '110' },
  'birmingham': { avgPrice: '$1,250,000', daysOnMarket: '28', homesSold: '65' },
  'bloomfield-hills': { avgPrice: '$1,650,000', daysOnMarket: '35', homesSold: '40' },
  'rochester-hills': { avgPrice: '$585,000', daysOnMarket: '20', homesSold: '80' },
  'washington-twp': { avgPrice: '$640,000', daysOnMarket: '25', homesSold: '55' }
};

areas = areas.map(a => {
  if (updates[a.slug]) {
    a.marketStats = updates[a.slug];
  }
  return a;
});

fs.writeFileSync(file, JSON.stringify(areas, null, 2));
