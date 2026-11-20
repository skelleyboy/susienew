// Publication dates preserve the original article dates. Updating related links
// must not make an older article appear to be newly published.
export const articles = [
  ["10-essential-real-estate-tips-for-home-buyers-in-royal-oak-michigan","2025-12-18","Buying in Royal Oak: 10 Local Checks | Susie Sharak","Check Royal Oak parking, older homes, additions and downtown access before an offer. Get a practical local buying checklist.",["royal-oak"],"buy"],
  ["10-essential-tips-for-home-buyers-in-troy-michigan","2025-12-18","Buying in Troy: 10 Things to Verify | Susie Sharak","Compare Troy school boundaries, subdivisions, commute routes and ownership costs before you buy. Read Susie’s address-level checklist.",["troy"],"buy"],
  ["10-essential-tips-for-home-buyers-in-washington-twp-michigan","2025-12-18","Buying in Washington Township | Susie Sharak","Buying in Washington Township, Macomb County? Check acreage, utilities, private roads and construction costs before making an offer.",["washington-twp"],"buy"],
  ["luxury-real-estate-oakland-county-2025-market-outlook","2025-06-12","Oakland County Luxury Home Pricing | Susie Sharak","Compare luxury homes by location, condition and current competition. Learn why an Oakland County headline cannot price one property.",["birmingham","bloomfield-hills"],"sell"],
  ["staging-macomb-county-estate-record-sale","2025-05-28","Staging a Macomb County Home for Sale | Susie Sharak","Plan useful staging work for your Macomb County home. Prioritize cleaning, repairs and photographs without assuming a guaranteed return.",["macomb-township","clinton-township"],"sell"],
  ["exclusive-neighborhoods-rochester-hills","2025-05-15","Comparing Rochester Hills Neighborhoods | Susie Sharak","Compare Rochester Hills homes by subdivision, trail access, maintenance and address-specific school boundaries, not neighborhood labels.",["rochester-hills"],"buy"],
  ["modern-farmhouse-trend-oakland-macomb","2025-04-30","Modern Farmhouse Homes: What to Check | Susie Sharak","Like a modern farmhouse? Check layout, materials, drainage and long-term maintenance before choosing a home in Oakland or Macomb County.",["rochester-hills","macomb-township"],"buy"],
  ["investing-waterfront-property-guide","2025-04-12","Buying Waterfront Property in Michigan | Susie Sharak","Check waterfront boundaries, flood exposure, seawalls, insurance and access rights before buying. Start with documents, not the view.",["grosse-pointe","clinton-township"],"buy"],
  ["10-essential-tips-for-home-buyers-in-sterling-heights-michigan","2025-12-20","Buying in Sterling Heights: Local Tips | Susie Sharak","Review Sterling Heights ranches, school districts, road exposure and renovation records before buying. Make an informed local shortlist.",["sterling-heights"],"buy"],
  ["10-essential-tips-for-home-buyers-in-birmingham-michigan","2025-12-22","Buying in Birmingham: 10 Local Checks | Susie Sharak","Before buying in Birmingham, check downtown parking, infill construction, lot coverage, older systems and the property’s school assignment.",["birmingham"],"buy"],
  ["10-essential-tips-for-home-buyers-in-bloomfield-hills-michigan","2025-12-24","Buying in Bloomfield Hills: Local Tips | Susie Sharak","Distinguish Bloomfield Hills city from township addresses. Check large-lot upkeep, utilities, surveys and comparable sales before buying.",["bloomfield-hills"],"buy"],
  ["10-essential-tips-for-home-buyers-in-rochester-hills-michigan","2025-12-26","Buying in Rochester Hills: Local Tips | Susie Sharak","Check Rochester Hills school boundaries, trail access, sloping lots, drainage and association rules before choosing your next home.",["rochester-hills"],"buy"],
  ["selling-luxury-homes-bloomfield-hills","2026-01-05","Selling a Bloomfield Hills Home | Susie Sharak","Prepare a Bloomfield Hills home for sale with relevant comparable sales, useful repair records and a clear plan for pricing and showings.",["bloomfield-hills"],"sell"],
  ["macomb-county-real-estate-trends-2026","2026-01-12","Understanding Macomb County Home Trends | Susie Sharak","Learn how to use Macomb County housing reports without treating county averages as a home valuation. Compare property-specific evidence.",["macomb-township","sterling-heights"],"sell"],
  ["top-school-districts-oakland-county","2026-01-18","Checking Oakland County School Boundaries | Susie Sharak","Find the right school district for a specific Oakland County address. Confirm boundaries and enrollment directly instead of using rankings.",["troy","rochester-hills","bloomfield-hills"],"buy"],
  ["relocating-to-sterling-heights-guide","2026-01-25","Moving to Sterling Heights: A Guide | Susie Sharak","Plan a move to Sterling Heights around your actual commute, housing budget, utilities and timing. Get help comparing specific properties.",["sterling-heights"],"buy"],
  ["waterfront-living-lake-st-clair","2026-02-02","Lake St. Clair Homes: Ownership Checks | Susie Sharak","Explore Lake St. Clair ownership questions, including public versus private access, flood insurance, shoreline maintenance and boat rights.",["grosse-pointe","clinton-township"],"buy"],
  ["new-construction-vs-historic-royal-oak","2026-02-08","New or Older Homes in Royal Oak? | Susie Sharak","Weigh Royal Oak new construction against older homes. Compare inspections, warranties, lot use, maintenance and the total cost of ownership.",["royal-oak"],"buy"],
  ["birmingham-lifestyle-guide","2026-02-12","Living in Birmingham: Daily-Life Checks | Susie Sharak","Try Birmingham’s daily routes before choosing a home. Compare walking access, parking, parks, errands and the upkeep each property needs.",["birmingham"],"buy"],
  ["preparing-home-for-sale-troy","2026-02-15","Preparing Your Troy Home for Sale | Susie Sharak","Get your Troy home ready to sell with a practical repair, document, photography and pricing checklist. Focus on useful work before listing.",["troy"],"sell"],
  ["luxury-condo-living-oakland-macomb","2026-02-20","Buying a Condo: Documents to Review | Susie Sharak","Review condo budgets, reserves, assessments, insurance and ownership rules in Oakland and Macomb County before committing to a purchase.",["birmingham","clinton-township"],"buy"],
  ["oakland-county-executive-relocation","2026-02-25","Relocating to Oakland County for Work | Susie Sharak","Moving for work? Compare Oakland County commutes, housing costs and relocation timing before choosing a home. Make a realistic local plan.",["troy","birmingham","rochester-hills"],"buy"]
].map(([id,publishedOn,title,description,areas,intent]) => ({
  id, path:`/blog/${id}`, publishedOn, title, description, areas, intent,
  modifiedOn:"2026-11-20"
}));

export const articleById = Object.fromEntries(articles.map(article => [article.id,article]));
export const latestArticles = [...articles].sort((a,b) =>
  b.publishedOn.localeCompare(a.publishedOn) || a.id.localeCompare(b.id)
).slice(0,6);

export const communityNames = {
  "shelby-township":"Shelby Township",
  "sterling-heights":"Sterling Heights",
  "royal-oak":"Royal Oak",
  "rochester-hills":"Rochester Hills",
  "troy":"Troy",
  "macomb-township":"Macomb Township",
  "clinton-township":"Clinton Township",
  "birmingham":"Birmingham",
  "bloomfield-hills":"Bloomfield Hills",
  "washington-twp":"Washington Township",
  "grosse-pointe":"Grosse Pointe"
};

export const nearbyCommunities = {
  "shelby-township":["sterling-heights","rochester-hills","washington-twp","macomb-township"],
  "sterling-heights":["shelby-township","troy","clinton-township","macomb-township"],
  "royal-oak":["troy","birmingham","bloomfield-hills"],
  "rochester-hills":["troy","shelby-township","washington-twp","bloomfield-hills"],
  "troy":["rochester-hills","royal-oak","birmingham","bloomfield-hills"],
  "macomb-township":["shelby-township","sterling-heights","clinton-township","washington-twp"],
  "clinton-township":["sterling-heights","macomb-township","shelby-township","grosse-pointe"],
  "birmingham":["bloomfield-hills","troy","royal-oak"],
  "bloomfield-hills":["birmingham","troy","rochester-hills"],
  "washington-twp":["shelby-township","macomb-township","rochester-hills"],
  "grosse-pointe":["clinton-township","sterling-heights","royal-oak"]
};

// These are actual content edit dates, not the build date. Navigation/footer-only
// changes do not refresh the substantive modification date of every page.
export const coreMetadata = {
  "/": {
    title:"Susie Sharak | Oakland & Macomb County Real Estate Agent",
    description:"Buying or selling in Oakland or Macomb County, Michigan? Get local guidance, explore communities and contact Realtor Susie Sharak.",
    modifiedOn:"2026-11-20"
  },
  "/buy": {
    title:"Buy a Home in Oakland & Macomb County | Susie Sharak",
    description:"Find a home that fits your plans in Oakland or Macomb County. Tell Susie Sharak your budget, preferred areas and what matters most.",
    modifiedOn:"2026-11-09"
  },
  "/sell": {
    // Intentional exception to the general under-60-character rule:
    // the user's specifically requested title is 65 characters.
    title:"Sell Your Home in Sterling Heights & Macomb County | Susie Sharak",
    description:"Selling in Sterling Heights or Macomb County? Request a free home valuation from Susie Sharak and plan pricing, preparation and your next move.",
    modifiedOn:"2026-11-20"
  },
  "/home-value": {
    title:"What’s My Home Worth? | Susie Sharak",
    description:"Request a free home valuation for your Oakland or Macomb County property. Share your address so Susie can review relevant local sales.",
    modifiedOn:"2026-11-09"
  },
  "/contact": {
    title:"Contact Susie Sharak | Oakland & Macomb County",
    description:"Ask Susie Sharak about buying or selling in Oakland and Macomb County. Find contact details, service areas and a simple inquiry form.",
    modifiedOn:"2026-11-20"
  },
  "/about": {
    title:"Meet Susie Sharak | Michigan Realtor",
    description:"Meet Susie Sharak of Golden Key Realty Group LLC. Get clear, personal guidance for buying or selling in Oakland and Macomb County, Michigan.",
    modifiedOn:"2026-11-09"
  },
  "/communities": {
    title:"Oakland & Macomb County Communities | Susie Sharak",
    description:"Compare 11 local community guides, from Troy and Royal Oak to Sterling Heights, Shelby Township and Grosse Pointe. Explore Susie’s service areas.",
    modifiedOn:"2026-11-20"
  },
  "/market-update": {
    title:"Oakland & Macomb County Market Update | Susie Sharak",
    description:"Read the dated Oakland and Macomb County housing snapshot. Understand what county prices can tell you and when to request a local comparison.",
    modifiedOn:"2026-11-09"
  },
  "/blog": {
    title:"Buying & Selling Tips Blog | Susie Sharak",
    description:"Read Susie Sharak’s local real estate blog: home buying checks, selling preparation, community advice and ownership questions in Metro Detroit.",
    modifiedOn:"2026-11-20"
  },
  "/privacy": {
    title:"Privacy Policy | Susie Sharak Real Estate",
    description:"Learn how this website handles inquiry details and optional source information when you contact Susie Sharak about your real estate plans.",
    modifiedOn:"2026-11-09"
  },
  "/terms": {
    title:"Website Terms | Susie Sharak Real Estate",
    description:"Read the terms for using Susie Sharak’s real estate website, including informational content, outside links and property-specific verification.",
    modifiedOn:"2026-11-09"
  },
  "/thank-you": {
    title:"Thanks for Your Message | Susie Sharak",
    description:"Thank you for contacting Susie Sharak. Find contact details and local community guides while you wait to discuss your real estate plans.",
    modifiedOn:"2026-11-09"
  },
  "/404": {
    title:"Page Not Found | Susie Sharak",
    description:"This page could not be found. Visit Susie Sharak’s home page, explore community guides or get in touch about buying or selling a home.",
    modifiedOn:"2026-11-09"
  }
};
