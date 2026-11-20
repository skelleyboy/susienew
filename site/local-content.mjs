import { macombGuides } from "./guides/macomb.mjs";
import { oaklandGuides } from "./guides/oakland.mjs";
import { grossePointeGuide } from "./guides/grosse-pointe.mjs";
import { localMarkets } from "./local-markets.mjs";
import { articles, articleById, latestArticles, communityNames, nearbyCommunities } from "./content-catalog.mjs";
import { blogImages } from "./blog-images.mjs";

const esc = value => String(value).replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const link = (path,label) => `<a href="${esc(path)}">${esc(label)}</a>`;
const money = value => new Intl.NumberFormat("en-US",{style:"currency",currency:"USD",maximumFractionDigits:0}).format(value);
export const areaGuides = {...macombGuides,...oaklandGuides,"grosse-pointe":grossePointeGuide};

const descriptions = {
  "sterling-heights":"Explore Sterling Heights homes, established neighborhoods, school boundaries and local prices. Get help buying or selling with Susie Sharak.",
  "troy":"Compare Troy neighborhoods, six school district boundaries, commute routes and local home prices. Plan your purchase or sale with Susie Sharak.",
  "shelby-township":"Explore Shelby Township homes, subdivision costs, school boundaries and local prices. Ask Susie Sharak for help comparing specific properties.",
  "royal-oak":"Compare Royal Oak bungalows, condos and new homes. Review downtown access, older-home checks and local prices with Realtor Susie Sharak.",
  "rochester-hills":"Explore Rochester Hills homes, parks, school districts and local prices. Compare lot conditions and daily routes with help from Susie Sharak.",
  "macomb-township":"Compare Macomb Township homes and new construction. Check schools, builder costs and local price context before buying or selling.",
  "birmingham":"Explore Birmingham homes, downtown access, condos and infill construction. Get local price context and personal buying or selling guidance.",
  "washington-twp":"Explore Washington Township homes in Macomb County. Compare acreage, utilities, school boundaries and local prices with Susie Sharak.",
  "bloomfield-hills":"Compare Bloomfield Hills homes, city versus township boundaries, property upkeep and local prices. Plan your next move with Susie Sharak.",
  "clinton-township":"Explore Clinton Township ranches, condos, school boundaries and local prices. Get practical help comparing homes or preparing to sell.",
  "grosse-pointe":"Compare the five Grosse Pointes, older-home upkeep, school boundaries and waterfront access. Ask Susie Sharak about your next move."
};
export const areaMetadata = Object.fromEntries(Object.entries(communityNames).map(([slug,name]) => [
  slug, {title:`Homes for Sale in ${name}, MI | Susie Sharak`,description:descriptions[slug],modifiedOn:"2026-11-20"}
]));

const budgetNotes = {
  "sterling-heights":"Keep a smaller established ranch, a larger colonial and a condo in separate comparisons. Renovation quality and road exposure can matter more than a citywide price change.",
  "shelby-township":"Separate condos from detached subdivision homes, and compare similar lot sizes. Association costs and the amount of exterior maintenance you take on can change the useful purchase budget.",
  "macomb-township":"Builder base prices and finished resale homes need a complete cost comparison. Allowances, lot premiums and remaining site work can move a new house into a different budget.",
  "clinton-township":"Compare the same housing type and neighborhood setting. A condo’s dues, insurance arrangement and possible assessments can change its affordability relative to a detached ranch.",
  "washington-twp":"Land, utility arrangements and outbuildings can substantially change the comparison. An acreage property should not be valued from subdivision sales alone, even when the bedroom counts match.",
  "troy":"Check district, subdivision and lot exposure along with size and updates. The price of a condo, an established colonial and a newly built house can answer three different budget questions.",
  "royal-oak":"Keep bungalows, downtown condos and new infill construction distinct. The City of Royal Oak figures below do not describe Royal Oak Township or every downtown property.",
  "rochester-hills":"Compare similar lots, construction and school boundaries. A walkout lower level, wooded site or association obligation can change both the comparable sales and the money needed after closing.",
  "birmingham":"A downtown condo, an original house and new infill construction do not share one useful price range. Check lot dimensions, condition and the building’s relationship to downtown before comparing.",
  "bloomfield-hills":"These figures are labeled Bloomfield Hills in the source report, not Bloomfield Township. Confirm the reporting geography against the parcel before using them; postal names can be misleading.",
  "grosse-pointe":"These figures cover Grosse Pointe City only, not all five Pointes. Request the matching municipality’s comparison for a home in the Farms, Park, Woods or Shores."
};

export function areaGuideContent(slug) {
  const guide = areaGuides[slug];
  const market = localMarkets[slug];
  const name = communityNames[slug];
  if (!guide || !market || !name) throw new Error(`Missing local guide data: ${slug}`);
  return `<div class="area-guide-copy">
    ${guide.sections.map(([heading,...paragraphs]) => `<section><h2>${esc(heading)}</h2>${paragraphs.map(p=>`<p>${esc(p)}</p>`).join("")}</section>`).join("")}
    <section class="local-price-context"><h2>Price range and local market context</h2>
      <p>${esc(budgetNotes[slug])}</p>
      <p>For dated budget context, the ${market.period} category medians ranged from ${money(market.condoMedian)} for condos to ${money(market.residentialMedian)} for residential sales in the linked Realcomp report. Those are two category medians, not the lowest and highest home prices. Individual homes can sell below or above either figure.</p>
      <p>The report recorded ${market.closedSales} residential sales and ${market.daysOnMarket} days on market until sale for that month. This is a historical snapshot, not a promise about today’s inventory or how quickly your home will sell. For a current ${esc(name)} price range, share your budget and the kind of property you want; I can help compare relevant available homes and recent sales.</p>
      <p><a href="${market.source}" target="_blank" rel="noopener noreferrer">Read the ${market.period} Realcomp local market report (PDF)</a>. Figures were reported as of November 6, 2026 and do not account for sale concessions or down payment assistance.</p>
    </section>
    <section class="guide-sources"><h2>Local sources to check</h2><ul>${guide.sources.map(([label,url])=>`<li><a href="${esc(url)}" target="_blank" rel="noopener noreferrer">${esc(label)}</a></li>`).join("")}</ul></section>
  </div>`;
}

export function areaReadingLinks(slug, blogData) {
  const titles = Object.fromEntries(blogData.map(([id,title])=>[id,title]));
  const relevant = articles.filter(article=>article.areas.includes(slug));
  return `<section class="inline-places area-reading"><h2>More about buying or selling here</h2>
    ${relevant.length ? `<ul>${relevant.map(article=>`<li>${link(article.path,titles[article.id])}</li>`).join("")}</ul>` : `<p>${link("/buy","Plan your home search")} or ${link("/sell","talk through your selling options")}.</p>`}
    <h2>Nearby and regional communities to compare</h2><div class="place-links">${nearbyCommunities[slug].map(other=>link(`/area/${other}`,communityNames[other])).join("")}</div>
  </section>`;
}

export function articleConnections(id, blogData) {
  const current = articleById[id];
  if (!current) throw new Error(`Missing article metadata: ${id}`);
  const titles = Object.fromEntries(blogData.map(([key,title])=>[key,title]));
  const relevance = candidate => candidate.areas.filter(area=>current.areas.includes(area)).length * 5 + Number(candidate.intent===current.intent);
  const related = articles.filter(article=>article.id!==id).sort((a,b)=>
    relevance(b)-relevance(a) || b.publishedOn.localeCompare(a.publishedOn) || a.id.localeCompare(b.id)
  ).slice(0,3);
  return `<section class="article-local-links"><h2>Local guides for your next step</h2>
    <ul>${current.areas.map(slug=>`<li>${link(`/area/${slug}`,`${communityNames[slug]} homes and community guide`)}</li>`).join("")}</ul>
    <p>${current.intent==="sell"
      ? `${link("/sell","Planning to sell? Let’s talk about your home")} and the preparation, price and timing that fit your move.`
      : `${link("/buy","Planning to buy? Tell me what you are looking for")} so we can compare homes, costs and the local details that matter to you.`}</p>
    </section><section class="article-related"><h2>Related posts</h2><ul>${related.map(article=>`<li>${link(article.path,titles[article.id])}</li>`).join("")}</ul></section>`;
}

export function latestArticleSection(blogData) {
  const records = Object.fromEntries(blogData.map(record=>[record[0],record]));
  return `<section class="home-latest site-shell"><div class="home-latest-heading"><h2>Latest articles</h2>${link("/blog","Read the buying & selling blog")}</div>
    <div class="blog-list">${latestArticles.map(article=>{
      const [,title,,intro] = records[article.id];
      const image = blogImages[article.id];
      return `<article><a class="blog-card-image" href="${article.path}" aria-label="${esc(`Read ${title}`)}"><img src="${image.src}" width="800" height="560" loading="lazy" alt="${esc(image.alt)}"></a><div class="blog-card-copy"><h3>${link(article.path,title)}</h3><p>${esc(intro)}</p>${link(article.path,"Read the article")}</div></article>`;
    }).join("")}</div></section>`;
}
