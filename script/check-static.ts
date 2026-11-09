import { readFile, access } from "node:fs/promises";
import { resolve } from "node:path";
import assert from "node:assert/strict";
import { pages } from "../site/pages.mjs";
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

for (const page of pages) {
  const html = docs.get(page.path)!;
  assert.equal((html.match(/<h1(?:\s|>)/g) || []).length, 1, `${page.path}: exactly one visible H1 required`);
  assert(html.includes('<main id="main">'), `${page.path}: main landmark missing`);
  assert(!/ai-seo-content|createRoot|type="module"|\/src\/main/.test(html), `${page.path}: old client-only rendering remains`);
  assert(!html.includes("—"), `${page.path}: em dash`);
  assert(!titles.has(page.title), `Duplicate title: ${page.title}`); titles.add(page.title);
  assert(!descriptions.has(page.description), `Duplicate description: ${page.path}`); descriptions.add(page.description);
  assert(html.includes(`rel="canonical" href="https://susiesharak.com${page.path}"`), `Wrong canonical: ${page.path}`);
  for (const script of html.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script>/g)) {
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
    for (const field of match[2].matchAll(/<(?:input|select|textarea)\b[^>]*>/g)) {
      const fieldName = attr(field[0], "name");
      if (fieldName) fieldNames.add(fieldName);
      if (fieldName === "form-name") assert.equal(attr(field[0], "value"), name);
      if (attr(field[0], "type") === "hidden") continue;
      const id = attr(field[0], "id");
      if (id) assert(new RegExp(`<label\\b[^>]*for=["']${id}["']`).test(match[2]), `${page.path}: unlabeled field ${id}`);
    }
    for (const field of ["form-name", "bot-field", "name", "email"]) assert(fieldNames.has(field), `${name}: missing ${field}`);
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
assert(!redirects.includes("/* /index.html"), "SPA catch-all must not return");
assert(redirects.includes("/* /404.html 404"));
console.log(`PASS: ${pages.length} static pages, all legacy URLs, unique metadata, local links/assets, visible FAQs, structured data, ${forms.size} native lead forms, sitemap, and real 404 configuration.`);

const httpArg = process.argv.find(arg => arg.startsWith("--http="));
if (httpArg) {
  const base = httpArg.slice("--http=".length);
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
