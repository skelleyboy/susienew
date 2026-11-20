import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { pages } from "../site/pages.mjs";
import { articles, latestArticles, communityNames, nearbyCommunities } from "../site/content-catalog.mjs";
import { areaGuides } from "../site/local-content.mjs";
import { localMarkets } from "../site/local-markets.mjs";
import { buyerChecklists } from "../site/buyer-checklists.mjs";

const origin = "https://susiesharak.com";
const output = new Map(await Promise.all(pages.map(async page => [
  page.path, await readFile(`dist/public/${page.path==="/" ? "index" : page.path.slice(1)}.html`,"utf8")
])));
const main = path => output.get(path).match(/<main\b[^>]*>([\s\S]*?)<\/main>/)[1];
const hrefs = html => [...html.matchAll(/<a\b[^>]*href="([^"]+)"/g)].map(match=>match[1].replaceAll("&amp;","&"));
const plain = html => html.replace(/<[^>]+>/g," ").replace(/\s+/g," ").trim();
const section = (html,className) => {
  const escaped = className.replace(/[.*+?^${}()|[\]\\]/g,"\\$&");
  const match = html.match(new RegExp(`<section class="${escaped}">([\\s\\S]*?)<\\/section>`));
  assert(match,`Missing ${className} section`);
  return match[1];
};
const words = value => value.trim().split(/\s+/).length;
const routeSet = new Set(pages.map(page=>page.path));
const titles = new Set(), descriptions = new Set(), headings = new Set();
const requiredFooterLinks = ["/buy","/sell","/home-value","/communities","/blog","/about","/contact"];
const exactSellTitle = "Sell Your Home in Sterling Heights & Macomb County | Susie Sharak";

for (const page of pages) {
  assert(page.title.length > 0 && (page.path==="/sell" ? page.title===exactSellTitle : page.title.length<60),`Title length: ${page.path}`);
  assert(page.description.length > 0 && page.description.length<155,`Description length: ${page.path}`);
  assert(!titles.has(page.title),`Duplicate title: ${page.path}`);
  assert(!descriptions.has(page.description),`Duplicate description: ${page.path}`);
  titles.add(page.title); descriptions.add(page.description);
  const html = output.get(page.path);
  const canonicalTag = [...html.matchAll(/<link\b[^>]*>/g)].find(match=>/rel="canonical"/.test(match[0]))?.[0];
  assert(canonicalTag?.includes(`href="${origin}${page.path}"`),`Self canonical: ${page.path}`);
  const footer = html.match(/<footer\b[^>]*>([\s\S]*?)<\/footer>/)[1];
  for(const path of requiredFooterLinks) assert(hrefs(footer).includes(path),`Footer missing ${path} on ${page.path}`);
  const schema = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map(match=>JSON.parse(match[1]));
  const graph = schema.flatMap(data=>data["@graph"] ?? [data]);
  const agent = graph.find(node=>node["@type"]==="RealEstateAgent");
  assert(agent?.name && agent.url===origin && agent.telephone==="+1-248-943-6906",`Agent schema: ${page.path}`);
  assert(agent.areaServed.length>=13,`All service areas in schema: ${page.path}`);
  if(page.path.startsWith("/area/") || page.path.startsWith("/blog/")) {
    const breadcrumb = graph.find(node=>node["@type"]==="BreadcrumbList");
    assert.equal(breadcrumb?.itemListElement.length,3,`Breadcrumb depth: ${page.path}`);
    assert.equal(breadcrumb.itemListElement.at(-1).item,origin+page.path);
    const heading = plain(main(page.path).match(/<h1\b[^>]*>([\s\S]*?)<\/h1>/)[1]);
    assert(!headings.has(heading),`Duplicate local/article H1: ${page.path}`);
    headings.add(heading);
  }
}
assert.match(pages.find(page=>page.path==="/sell").description,/free home valuation/i);

const home = main("/");
assert.match(plain(home),/Communities we serve/);
const latest = section(home,"home-latest site-shell");
const homeArticlePaths = [...new Set(hrefs(latest).filter(path=>path.startsWith("/blog/")))];
assert.deepEqual(homeArticlePaths,latestArticles.map(article=>article.path),"Homepage must link exactly the six newest articles in publication order");
assert.equal(homeArticlePaths.length,6);
assert.equal(articles.length,22);
for(const article of articles) assert(hrefs(main("/blog")).includes(article.path),`Blog directory missing ${article.id}`);

const guideLengths = [];
for(const [slug,name] of Object.entries(communityNames)) {
  const path = `/area/${slug}`;
  const html = main(path), links = hrefs(html), guide = areaGuides[slug];
  assert(hrefs(home).includes(path),`Homepage missing ${slug}`);
  assert(hrefs(main("/communities")).includes(path),`Community directory missing ${slug}`);
  assert(plain(main("/communities")).includes(guide.summary),`Unique directory description: ${slug}`);
  const authoredWords = words([guide.summary,...guide.sections.flatMap(item=>item.slice(1))].join(" "));
  assert(authoredWords>=500,`Thin city guide: ${slug} (${authoredWords} words without shared market text/forms/footer)`);
  guideLengths.push(authoredWords);
  for(const [, ...paragraphs] of guide.sections) {
    for(const paragraph of paragraphs) assert(plain(html).includes(paragraph),`Local prose missing from static HTML: ${slug}`);
  }
  assert.match(plain(html),new RegExp(name.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")));
  assert(nearbyCommunities[slug].length>=3 && nearbyCommunities[slug].length<=4);
  for(const nearby of nearbyCommunities[slug]) {
    assert.notEqual(nearby,slug);
    assert(links.includes(`/area/${nearby}`),`Nearby guide missing from ${slug}: ${nearby}`);
  }
  for(const article of articles.filter(article=>article.areas.includes(slug))) {
    assert(links.includes(article.path),`City-to-article link missing: ${slug} -> ${article.id}`);
  }
  assert(html.includes(localMarkets[slug].source),`Missing original price source: ${slug}`);
  assert.match(plain(html),/October 2026/);
  assert.match(plain(html),/not the lowest and highest home prices/);
}

for(const article of articles) {
  const html = main(article.path), links = hrefs(html);
  assert(links.includes(`/${article.intent}`),`Missing buy/sell path: ${article.id}`);
  for(const area of article.areas) assert(links.includes(`/area/${area}`),`Article-to-city link missing: ${article.id} -> ${area}`);
  const related = hrefs(section(html,"article-related"));
  assert.equal(related.length,3,`Three related posts: ${article.id}`);
  assert.equal(new Set(related).size,3);
  assert(!related.includes(article.path),`Self-related post: ${article.id}`);
  related.forEach(path=>assert(routeSet.has(path),`Missing related article: ${path}`));
}
const checklistParagraphs = [];
for(const [slug,checklist] of Object.entries(buyerChecklists)) {
  assert.equal(checklist.tips.length,10,`Ten locally authored tips: ${slug}`);
  checklistParagraphs.push(...checklist.tips.map(([,text])=>text));
  const article = articles.find(article=>article.id.startsWith("10-essential") && article.areas[0]===slug);
  const html = main(article.path);
  assert.match(html,/<ol class="buyer-checklist">/);
  for(const [heading] of checklist.tips) assert(plain(html).includes(heading),`Missing checklist tip: ${slug}`);
}
assert.equal(checklistParagraphs.length,70);
assert.equal(new Set(checklistParagraphs).size,70,"Do not recycle identical tip paragraphs across cities");

const contact = main("/contact");
assert(plain(contact).includes("Contact me to confirm availability."));
assert.match(contact,/<iframe\b[^>]*title="Google map/);
assert.match(contact,/<form\b[^>]*method="POST"[^>]*action="\/thank-you"/);
for(const slug of Object.keys(communityNames)) assert(hrefs(contact).includes(`/area/${slug}`));

// A crawler following ordinary anchors reaches every indexable page in at most
// two clicks from the homepage. No JS interaction or sitemap-only discovery.
const depths = new Map([["/",0]]), queue = ["/"];
while(queue.length) {
  const path = queue.shift();
  for(const href of hrefs(output.get(path))) {
    const target = new URL(href,origin+path);
    if(target.origin!==origin || !routeSet.has(target.pathname) || depths.has(target.pathname)) continue;
    depths.set(target.pathname,depths.get(path)+1); queue.push(target.pathname);
  }
}
for(const page of pages.filter(page=>!page.noindex)) assert(depths.has(page.path) && depths.get(page.path)<=2,`Weak discovery path: ${page.path}`);

const sitemap = await readFile("dist/public/sitemap.xml","utf8");
const entries = [...sitemap.matchAll(/<url><loc>([^<]+)<\/loc><lastmod>([^<]+)<\/lastmod><\/url>/g)];
assert.equal(entries.length,pages.filter(page=>!page.noindex).length);
const revisionDates = new Set();
for(const [,url,date] of entries) {
  const page = pages.find(page=>origin+page.path===url);
  assert(page && !page.noindex,`Unexpected sitemap URL: ${url}`);
  assert.equal(date,page.dateModified);
  assert.match(date,/^\d{4}-\d{2}-\d{2}$/);
  revisionDates.add(date);
}
assert(revisionDates.size>1,"Do not replace all modification dates with the build date");

// Exercise first-match ordering in the generated Netlify rules. A later rule
// in netlify.toml cannot rescue a canonical redirect shadowed by a page rewrite.
const rules = (await readFile("dist/public/_redirects","utf8")).trim().split("\n").map(line=>line.trim().split(/\s+/));
function firstRule(input) {
  const url = new URL(input,origin);
  for(const [from,to,status] of rules) {
    const pattern = from.split("*").map(part=>part.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")).join("(.*)");
    const match = (from.startsWith("http") ? url.origin+url.pathname : url.pathname).match(new RegExp(`^${pattern}$`));
    if(match) return {status:Number.parseInt(status),location:to.replace(":splat",match[1] ?? "")+url.search};
  }
}
for(const host of ["http://susiesharak.com","http://www.susiesharak.com","https://www.susiesharak.com"]) {
  assert.deepEqual(firstRule(`${host}/area/troy?utm_source=test`),{status:301,location:`${origin}/area/troy?utm_source=test`});
}
for(const slug of ["novi","dearborn"]) {
  for(const suffix of ["","/"]) assert.deepEqual(firstRule(`/${slug}-real-estate${suffix}?source=test`),{status:301,location:"/communities?source=test"});
}
assert.deepEqual(firstRule("/area/troy/"),{status:301,location:"/area/troy"});
assert.deepEqual(firstRule("/this-page-does-not-exist"),{status:404,location:"/404.html"});

console.log(`Local SEO passed: ${Object.keys(communityNames).length} guides (${Math.min(...guideLengths)}–${Math.max(...guideLengths)} authored words), ${articles.length} linked articles, seven distinct 10-tip checklists.`);
console.log(`All ${entries.length} indexable URLs are reachable within two clicks. Metadata, footer links, breadcrumbs, canonical redirect order and per-page lastmod passed.`);
console.log("Intentional title exception: the exact requested /sell title is 65 characters; all other titles are under 60 and all descriptions are under 155.");
