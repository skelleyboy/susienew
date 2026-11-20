// Transcribed from the linked Realcomp Local Market Updates, October 2026.
// Verified against the source PDFs on 2026-11-20. These are medians, not
// minimum/maximum listing prices, appraisals, or an automated feed.
export const localMarkets = Object.fromEntries([
  ["sterling-heights","Sterling-Heights",329000,235750,90,22],
  ["troy","Troy",475000,360000,59,28],
  ["shelby-township","Shelby-Twp",465000,260000,55,35],
  ["royal-oak","Royal-Oak",350000,196500,67,26],
  ["rochester-hills","Rochester-Hills",478500,293000,44,31],
  ["macomb-township","Macomb-Twp",504500,320000,51,38],
  ["birmingham","Birmingham",950000,400000,29,48],
  ["washington-twp","Washington-Twp-Macomb-County",597500,455000,18,46],
  ["bloomfield-hills","Bloomfield-Hills",662500,269900,26,48],
  ["clinton-township","Clinton-Twp-Macomb-County",294000,227000,58,21],
  ["grosse-pointe","Grosse-Pointe",537500,415000,8,24]
].map(([slug,file,residentialMedian,condoMedian,closedSales,daysOnMarket]) => [
  slug, {
    period:"October 2026", residentialMedian, condoMedian, closedSales, daysOnMarket,
    source:`https://marketstatsreports.showingtime.com/REALCOMP_190/sst/202610/${file}.pdf`
  }
]));
