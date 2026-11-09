// One image per article. Stock photos describe the topic, not a local listing.
const photo = (file, alt, source) => ({
  src: `/assets/blog/${file}.webp`,
  alt,
  source: `https://images.unsplash.com/photo-${source}`,
});
const existing = (file, alt) => ({ src: `/assets/${file}.webp`, alt });

export const blogImages = {
  "10-essential-real-estate-tips-for-home-buyers-in-royal-oak-michigan": existing("living", "Light-filled living room with a sofa and built-in shelving"),
  "10-essential-tips-for-home-buyers-in-troy-michigan": photo("neutral-living-room", "Living room with neutral seating and dark accents", "1615529179035-e760f6a2dcee"),
  "10-essential-tips-for-home-buyers-in-washington-twp-michigan": existing("garden-living-room", "Living room with large windows overlooking green trees"),
  "luxury-real-estate-oakland-county-2025-market-outlook": existing("architecture", "Open living space with a staircase and tall windows"),
  "staging-macomb-county-estate-record-sale": photo("prepared-living-space", "Furnished living room arranged around a coffee table", "1631510390389-c1e4fb20ff31"),
  "exclusive-neighborhoods-rochester-hills": existing("estate", "Two-story house with a brick entrance and a green front lawn"),
  "modern-farmhouse-trend-oakland-macomb": photo("exterior-renovation", "House exterior during renovation work", "1753893558281-9acda0662bbd"),
  "investing-waterfront-property-guide": photo("waterside-cabin", "Wooden house beside a lake and green trees", "1592608253110-7a607300e379"),
  "10-essential-tips-for-home-buyers-in-sterling-heights-michigan": photo("house-windows", "Dining space with a wooden table and staircase", "1713184355726-d3a31d822fcc"),
  "10-essential-tips-for-home-buyers-in-birmingham-michigan": photo("residential-street", "Residential street lined with houses and trees", "1756621608737-e3c7ddde5a84"),
  "10-essential-tips-for-home-buyers-in-bloomfield-hills-michigan": photo("established-home", "White house exterior with glass garage doors and planting", "1771366260867-7e07094579d7"),
  "10-essential-tips-for-home-buyers-in-rochester-hills-michigan": photo("comfortable-interior", "Furnished home interior with a seating area", "1554995207-c18c203602cb"),
  "selling-luxury-homes-bloomfield-hills": photo("fireplace-living-room", "Living room with furniture and a fireplace", "1723750787814-72ddbcd155ad"),
  "macomb-county-real-estate-trends-2026": photo("home-office", "Home office with a desk and organized workspace", "1742198810079-49bb51d1c5af"),
  "top-school-districts-oakland-county": photo("research-workspace", "Bright home workspace for researching an address", "1742827871494-3a34fc06b69f"),
  "relocating-to-sterling-heights-guide": photo("moving-day", "Couple sitting among moving boxes in a home", "1758523671826-d7f8217ffac3"),
  "waterfront-living-lake-st-clair": photo("tree-lined-shore", "Trees along a quiet lake shoreline", "1604336102823-1a4df72dfa26"),
  "new-construction-vs-historic-royal-oak": photo("home-and-trees", "House surrounded by mature green trees", "1572523473094-46c0d60ceb29"),
  "birmingham-lifestyle-guide": photo("everyday-dining", "Bright dining room with a table and chairs", "1751290986099-874a49f457a1"),
  "preparing-home-for-sale-troy": existing("kitchen", "Kitchen with an island, pendant lights and uncluttered counters"),
  "luxury-condo-living-oakland-macomb": photo("condo-dining", "Dining room with a table and chairs", "1675252589017-4bcf7b6cf819"),
  "oakland-county-executive-relocation": existing("interior", "Open staircase with wood steps and pendant lights"),
};
