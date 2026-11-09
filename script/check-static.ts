import { readFile, access } from "node:fs/promises";
import { resolve } from "node:path";
import { createHash } from "node:crypto";
import assert from "node:assert/strict";
import { pages } from "../site/pages.mjs";
import { agentProfiles } from "../site/profiles.mjs";
import { socialProfiles } from "../site/profiles.mjs";
import { legacyRedirects } from "./legacy-redirects";
import { blogImages } from "../site/blog-images.mjs";
import { BLOG_POSTS } from "../client/src/data/blog";

const root = resolve("dist/public");
const areas = JSON.parse(await readFile("client/src/data/areas.json", "utf8"));
const required = ["/", "/buy", "/sell", "/home-value", "/contact", "/about", "/communities", "/blog", "/privacy", "/terms", "/market-update", "/thank-you", "/404", ...areas.map((a: any) => `/area/${a.slug}`), ...BLOG_POSTS.map(p => `/blog/${p.id}`)];
const routes = new Set(pages.map((p: any) => p.path));
for (const path of required) assert(routes.has(path), `Lost route ${path}`);
const titles = new Set();
const descriptions = new Set();
const forms = new Map<string, Set<string>>();
const docs = new Map<string, string>();
const attr = (html: string, name: string) => html.match(new RegExp(`(?:^|\\s)${name}=["']([^"']*)["']`, "i"))?.[1];
const fileFor = (path: string) => path === "/" ? `${root}/index.html` : `${root}${path}.html`;
for (const page of pages) docs.set(page.path, await readFile(fileFor(page.path), "utf8"));
const stylesheetPath = docs.get("/")!.match(/rel="stylesheet" href="([^"]+)"/)?.[1];
assert(stylesheetPath?.startsWith("/assets/site-"), "Versioned shared brand stylesheet missing");
const css = await readFile(resolve(root, "." + stylesheetPath), "utf8");
const logo = await readFile(resolve(root, "assets/brand-lockup.svg"), "utf8");
assert(logo.includes("m35.05 25.53"), "The SS monogram is missing from the logo");
for (const profile of agentProfiles) {
  assert(profile.logo?.startsWith("/assets/"), `${profile.name}: logo must be hosted locally`);
  await access(resolve(root, "." + profile.logo));
}
for (const profile of socialProfiles) {
  assert(profile.logo.startsWith("/assets/"), `${profile.name}: social logo must be local`);
  await access(resolve(root, "." + profile.logo));
}
for (const image of css.matchAll(/url\(["']?(\/assets\/[^"')]+)["']?\)/g)) {
  await access(resolve(root, "." + image[1]));
}
await access(`${root}/favicon.svg`);
await access(`${root}/social-share.jpg`);

for (const page of pages) {
  const html = docs.get(page.path)!;
  assert.equal((html.match(/<h1(?:\s|>)/g) || []).length, 1, `${page.path}: exactly one visible H1 required`);
  assert(html.includes('<main id="main">'), `${page.path}: main landmark missing`);
  assert(html.includes("/assets/brand-lockup.svg"), `${page.path}: shared logo missing`);
  assert(html.includes("/assets/brand-lockup-light.svg"), `${page.path}: shared reverse footer logo missing`);
  const footerHtml = html.match(/<footer class="site-footer">[\s\S]*?<\/footer>/)?.[0] || "";
  assert(!/href="\/[^"]*#/.test(footerHtml), `${page.path}: footer navigation must start at the top`);
  const headerHtml = html.match(/<header class="site-header">[\s\S]*?<\/header>/)?.[0] || "";
  assert(!headerHtml.includes('class="header-phone"'), `${page.path}: removed header phone strip returned`);
  assert(footerHtml.includes("(248) 943-6906"), `${page.path}: footer phone number missing`);
  assert(!/href=["']tel:/i.test(html), `${page.path}: click-to-call link remains`);
  assert(!html.includes("/assets/twilight.webp"), `${page.path}: rejected sunset house photo must not be used`);
  assert(!html.includes("/assets/home.webp"), `${page.path}: rejected white mansion photo must not be used`);
  assert(!/class="eyebrow"/.test(html), `${page.path}: topper text remains`);
  assert(!/Illustrative home|Illustrative architecture|not a local listing|not an available property/i.test(html), `${page.path}: unwanted photo caption remains`);
  assert(html.includes('class="floating-contact"'), `${page.path}: scroll contact button missing`);
  if (html.includes('class="capture-copy"')) {
    assert(html.includes('<div class="capture-copy"><img class="page-headshot" src="/assets/susie-headshot.webp"'), `${page.path}: shared contact section needs Susie’s photo`);
  }
  assert(html.includes('class="desktop-nav"'), `${page.path}: desktop navigation missing`);
  assert(html.includes('class="menu-icon"'), `${page.path}: hamburger menu missing`);
  assert(!html.includes("Development preview: forms send only"), `${page.path}: removed preview banner returned`);
  const pageHeader = html.match(/<header class="site-header">[\s\S]*?<\/header>/)?.[0];
  assert(pageHeader && !pageHeader.includes("Golden Realty"), `${page.path}: brokerage text must not return to header`);
  if (!page.noindex && !["/privacy", "/terms"].includes(page.path)) {
    assert(/<form\b/.test(html), `${page.path}: marketing page has no inquiry form`);
  }
  assert(!/ai-seo-content|createRoot|type="module"|\/src\/main/.test(html), `${page.path}: old client-only rendering remains`);
  assert(!html.includes("—"), `${page.path}: em dash`);
  assert(!titles.has(page.title), `Duplicate title: ${page.title}`); titles.add(page.title);
  assert(!descriptions.has(page.description), `Duplicate description: ${page.path}`); descriptions.add(page.description);
  assert(html.includes(`rel="canonical" href="https://susiesharak.com${page.path}"`), `Wrong canonical: ${page.path}`);
  for (const script of html.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script>/g)) {
    if (attr(script[1], "src")) {
      assert.match(attr(script[1], "src")!, /^\/assets\/interactions-[a-f0-9]{10}\.js$/, `${page.path}: unexpected client script`);
      assert(/\bdefer\b/.test(script[1]), `${page.path}: enhancement script must be deferred`);
      assert.equal(script[2], "", `${page.path}: unexpected inline JavaScript`);
      continue;
    }
    assert.equal(attr(script[1], "type"), "application/ld+json", `${page.path}: JavaScript should not be required`);
    const data = JSON.parse(script[2]);
    assert.equal(data["@context"], "https://schema.org");
    assert(data["@graph"].some((node: any) => node["@type"] === "WebPage"));
  }
  for (const image of html.matchAll(/<img\b[^>]*>/g)) assert(attr(image[0], "alt") !== undefined, `${page.path}: image without alt`);
  const ids = [...html.matchAll(/\bid=["']([^"']+)["']/g)].map(m => m[1]);
  assert.equal(ids.length, new Set(ids).size, `${page.path}: duplicate id`);
  for (const match of html.matchAll(/\b(?:href|src)=["']([^"']+)["']/g)) {
    const value = match[1].replaceAll("&amp;", "&");
    if (/^(https?:|mailto:|tel:|data:)/.test(value)) continue;
    const url = new URL(value, `https://susiesharak.com${page.path}`);
    if (url.pathname.startsWith("/assets/") || /\.\w+$/.test(url.pathname)) {
      await access(resolve(root, "." + url.pathname));
    } else {
      assert(routes.has(url.pathname), `${page.path}: broken link ${value}`);
      if (url.hash) assert(docs.get(url.pathname)?.includes(`id="${url.hash.slice(1)}"`), `${page.path}: missing anchor ${value}`);
    }
  }
  for (const match of html.matchAll(/<form\b([^>]*)>([\s\S]*?)<\/form>/g)) {
    const name = attr(match[1], "name");
    assert(name, `${page.path}: unnamed form`);
    assert.equal(attr(match[1], "method")?.toLowerCase(), "post");
    assert.equal(attr(match[1], "action"), "/thank-you");
    assert.equal(attr(match[1], "data-netlify"), "true");
    assert.equal(attr(match[1], "netlify-honeypot"), "bot-field");
    const fieldNames = new Set<string>();
    assert(match[2].includes(`name="source_page" value="${page.path}"`), `${page.path}: inquiry source is missing or incorrect`);
    for (const field of match[2].matchAll(/<(?:input|select|textarea)\b[^>]*>/g)) {
      const fieldName = attr(field[0], "name");
      if (fieldName) fieldNames.add(fieldName);
      if (fieldName === "form-name") assert.equal(attr(field[0], "value"), name);
      if (attr(field[0], "type") === "hidden") continue;
      const id = attr(field[0], "id");
      if (id) assert(new RegExp(`<label\\b[^>]*for=["']${id}["']`).test(match[2]), `${page.path}: unlabeled field ${id}`);
    }
    for (const field of ["form-name", "bot-field", "name", "email", "source_page", "landing_page", "referrer_host", "utm_source", "utm_medium", "utm_campaign"]) assert(fieldNames.has(field), `${name}: missing ${field}`);
    if (name === "home-valuation") assert(fieldNames.has("address"), "Valuation address missing");
    if (forms.has(name)) assert.deepEqual(fieldNames, forms.get(name), `Inconsistent fields for Netlify form ${name}`);
    forms.set(name, fieldNames);
  }
  for (const faq of page.faq || []) {
    assert(html.includes(faq.question), `${page.path}: structured FAQ question not visible`);
    assert(html.includes(faq.answer), `${page.path}: structured FAQ answer not visible`);
  }
}
for (const name of ["contact", "home-valuation", "buyer-inquiry", "seller-inquiry"]) assert(forms.has(name), `Lead form ${name} missing`);
const sitemap = await readFile(`${root}/sitemap.xml`, "utf8");
for (const page of pages) assert.equal(sitemap.includes(`<loc>https://susiesharak.com${page.path}</loc>`), !page.noindex && page.path !== "/404", `Sitemap indexing mismatch: ${page.path}`);
const redirects = await readFile(`${root}/_redirects`, "utf8");
for (const [from,to] of Object.entries(legacyRedirects)) {
  assert(routes.has(to), `Missing legacy redirect target ${to}`);
  assert(redirects.includes(`${from} ${to} 301\n`));
  assert(redirects.includes(`${from}/ ${to} 301\n`));
  assert(!sitemap.includes(`<loc>https://susiesharak.com${from}</loc>`), "Redirected aliases must not be in the sitemap");
}
const homeHtml = docs.get("/")!;
const navHtml = homeHtml.match(/<header class="site-header">[\s\S]*?<\/header>/)?.[0] || "";
for (const html of docs.values()) {
  assert(!/instagram\.com|tiktok\.com|social-instagram\.svg|social-tiktok\.svg/.test(html), "Removed social networks must not appear on the site");
}
for (const {logo} of [...agentProfiles,...socialProfiles]) assert(navHtml.includes(`src="${logo}"`), `Menu is missing logo ${logo}`);
assert(homeHtml.includes("/assets/garden-living-room.webp"), "Updated testimonial photo missing");
assert(homeHtml.includes('src="/assets/zillow-top-agent.png"'), "Verified Zillow badge missing");
assert(!homeHtml.includes('<source media="(max-width: 699px)"'), "Homepage should retain its rectangular portrait on mobile");
for (const page of pages.filter(page => !page.noindex && !["/", "/about", "/contact", "/privacy", "/terms"].includes(page.path))) {
  const html = docs.get(page.path) || "";
  assert(html.includes('class="page-headshot"'), `${page.path}: introductory headshot missing`);
  if (["/buy", "/sell", "/home-value"].includes(page.path)) {
    assert(/<div class="personal-heading"><img class="page-headshot"[^>]+><h1/.test(html), `${page.path}: photo must sit beside the main heading`);
  } else {
    assert(html.indexOf('class="page-headshot"') < html.indexOf("<h1"), `${page.path}: headshot must appear above the heading`);
  }
}
const communitiesHtml = docs.get("/communities") || "";
const blogHtml = docs.get("/blog") || "";
const articlePhotos = new Set();
const articlePhotoHashes = new Set();
for (const [slug, photo] of Object.entries(blogImages)) {
  const articleHtml = docs.get(`/blog/${slug}`) || "";
  assert(articleHtml.includes(`<figure class="article-image"><img src="${photo.src}"`), `${slug}: article photo missing`);
  const card = blogHtml.match(new RegExp(`<a class="blog-card-image" href="/blog/${slug}"[^>]*><img src="([^"]+)"`));
  assert.equal(card?.[1], photo.src, `${slug}: thumbnail and article photo must match`);
  assert(!articlePhotos.has(photo.src), `${slug}: article image reused`);
  articlePhotos.add(photo.src);
  const bytes = await readFile(`${root}${photo.src}`);
  const hash = createHash("sha256").update(bytes).digest("hex");
  assert(!articlePhotoHashes.has(hash), `${slug}: duplicate photo file under another name`);
  articlePhotoHashes.add(hash);
}
assert.equal(articlePhotos.size, pages.filter(page => page.path.startsWith("/blog/")).length, "Every article needs its own photo");
assert(communitiesHtml.includes('name="community-map-frame"'), "Communities Google map missing");
assert(communitiesHtml.includes('title="Google map of Susie Sharak’s communities in southeast Michigan"'), "Map needs an accessible title");
const mapLinks = [...communitiesHtml.matchAll(/<a href="https:\/\/maps\.google\.com\/maps\?q=[^"]+" target="community-map-frame"/g)];
const communityGuides = pages.filter(page => page.path.startsWith("/area/"));
assert.equal(mapLinks.length, communityGuides.length, "Every community needs a working native map link");
assert(docs.get("/area/grosse-pointe")?.includes('id="contact-form"'), "Grosse Pointe needs a real inquiry form");
assert(!redirects.includes("/* /index.html"), "SPA catch-all must not return");
assert(redirects.includes("/* /404.html 404"));
console.log(`PASS: ${pages.length} static pages, all legacy URLs, unique metadata, local links/assets, visible FAQs, structured data, ${forms.size} native lead forms, sitemap, and real 404 configuration.`);

const httpArg = process.argv.find(arg => arg.startsWith("--http="));
if (httpArg) {
  const base = httpArg.slice("--http=".length);
  for (const [from,to] of Object.entries(legacyRedirects)) {
    for (const suffix of ["", "/"]) {
      const response = await fetch(`${base}${from}${suffix}?utm_source=redirect-check`, { redirect: "manual" });
      assert.equal(response.status, 301, `Legacy URL should redirect: ${from}${suffix}`);
      assert.equal(response.headers.get("location"), `${to}?utm_source=redirect-check`, "Legacy redirect should preserve campaign parameters");
    }
    assert.equal((await fetch(`${base}${to}`)).status, 200, `Legacy target must load: ${to}`);
  }
  for (const path of required) {
    const response = await fetch(`${base}${path}`);
    assert.equal(response.status, path === "/404" ? 404 : 200, `HTTP failure ${path}`);
    const body = await response.text();
    assert(body.includes("<h1"), `${path}: no HTML content over HTTP`);
    assert(!body.includes('<div id="root">'), `${path}: SPA shell served instead of page`);
  }
  const missing = await fetch(`${base}/not-a-real-page-check`);
  assert.equal(missing.status, 404, "Unknown route must return HTTP 404");
  const post = await fetch(`${base}/thank-you`, { method: "POST", headers: { "Content-Type": "application/x-www-form-urlencoded" }, body: "form-name=contact&name=Preview+Test&email=preview%40example.com&message=No+delivery+expected" });
  assert.equal(post.status, 501, "Development preview must not fake successful lead delivery");
  console.log(`PASS: ${required.length} routes served as HTML, unknown URL HTTP 404, preview POST explicitly refuses unsupported delivery.`);
}
