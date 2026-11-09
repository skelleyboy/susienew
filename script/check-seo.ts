import assert from "node:assert/strict";
import { readFile, access } from "node:fs/promises";
import { pages } from "../site/pages.mjs";
import { markdownPath, pageMarkdown, wantsMarkdown } from "../site/markdown.mjs";
import markdownHandler from "../netlify/edge-functions/markdown";

const origin = "https://susiesharak.com";
const root = "dist/public";
const sitemap = await readFile(`${root}/sitemap.xml`, "utf8");
const llms = await readFile(`${root}/llms.txt`, "utf8");
for (const page of pages) {
  const html = await readFile(`${root}${page.path === "/" ? "/index" : page.path}.html`, "utf8");
  const headings = [...html.matchAll(/<h([1-6])\b/g)].map(match => Number(match[1]));
  assert.equal(headings[0], 1, `${page.path}: the main H1 must precede other document headings`);
  for (let i = 1; i < headings.length; i++) assert(headings[i] <= headings[i-1] + 1, `${page.path}: skipped heading level`);
  const data = JSON.parse(html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/)![1]);
  const organization = data["@graph"].find((node: any) => node["@type"] === "Organization");
  assert.equal(organization.name, "Susie Sharak Real Estate");
  assert.equal(organization.logo.url, `${origin}/assets/brand-lockup.svg`);
  const webPage = data["@graph"].find((node: any) => node["@type"] === "WebPage");
  assert.equal(webPage.dateModified, page.dateModified);
  assert(html.includes('<meta property="og:locale" content="en_US">'));
  if (!page.noindex) assert(sitemap.includes(`<loc>${origin}${page.path}</loc><lastmod>${page.dateModified}</lastmod>`), `${page.path}: missing content revision date`);
  if (page.path === "/404") continue;
  const markdown = await readFile(`${root}${markdownPath(page.path)}`, "utf8");
  assert.equal(markdown, pageMarkdown(page, origin), `${page.path}: text export must come from the same HTML content`);
  assert(markdown.includes(`Source: ${origin}${page.path}`));
  assert(markdown.includes("\n# "), `${page.path}: Markdown needs its original H1`);
  assert(!markdown.includes("<form") && !markdown.includes("bot-field"), "No hidden form fields in the reading export");
  assert(html.includes(`type="text/markdown" href="${origin}${markdownPath(page.path)}"`));
  assert(html.includes(`href="${markdownPath(page.path)}">Text version</a>`));
  for (const match of html.matchAll(/<a\b([^>]*)>([\s\S]*?)<\/a>/g)) {
    if (/aria-hidden="true"/.test(match[1])) continue;
    const label = match[2].replace(/<[^>]*>/g, "").trim();
    assert(label || /aria-label="[^"]+"/.test(match[1]) || /alt="[^"]+"/.test(match[2]), `${page.path}: unnamed link`);
  }
}
assert(!/<loc>[^<]*\.md<\/loc>/.test(sitemap), "Keep alternate text files out of the search sitemap");
assert(/^# Susie Sharak Real Estate\n\n> /m.test(llms));
assert(llms.includes("## Services and local resources") && llms.includes("## Buying and selling articles"));
assert(!wantsMarkdown("text/html,application/xhtml+xml,*/*;q=0.8"));
assert(wantsMarkdown("text/markdown"));
assert(wantsMarkdown("text/html;q=0.4, text/markdown;q=0.8"));
assert(!wantsMarkdown("text/markdown;q=0"));
assert(!wantsMarkdown("text/markdown;q=0.5, text/html;q=1"));
const home = pages.find(page => page.path === "/")!;
assert(home.title.length >= 50 && home.title.length <= 60);
assert(home.description.length >= 120 && home.description.length <= 150);
const homeHtml = await readFile(`${root}/index.html`, "utf8");
const cssPath = homeHtml.match(/rel="stylesheet" href="([^"]+)"/)![1];
const jsPath = homeHtml.match(/<script src="([^"]+)"/)![1];
for (const path of [cssPath, jsPath]) {
  const content = await readFile(`${root}${path}`, "utf8");
  assert(content.split("\n").length <= 3, `${path}: asset should be minified`);
  await access(`${root}${path}`);
}

// Exercise the actual Netlify handler without publishing or making network calls.
const savedFetch = globalThis.fetch;
let fetches = 0;
let htmlRequests = 0;
try {
  globalThis.fetch = async (input, init) => {
    fetches++;
    assert.equal(new URL(String(input)).pathname, "/index.md");
    assert.equal(new Headers(init?.headers).get("Accept"), "text/plain");
    return new Response("# Same homepage\n", { headers: { "Content-Type": "text/plain" } });
  };
  const context = { next: async () => {
    htmlRequests++;
    return new Response("<h1>HTML page</h1>", { headers: { "Content-Type": "text/html", Vary: "Accept-Encoding" } });
  } };
  const markdown = await markdownHandler(new Request(origin, { headers: { Accept: "text/markdown" } }), context);
  assert.equal(markdown.headers.get("Content-Type"), "text/markdown; charset=utf-8");
  assert.equal(markdown.headers.get("Vary"), "Accept");
  assert.equal(markdown.headers.get("X-Robots-Tag"), "noindex");
  assert.equal(markdown.headers.get("Link"), `<${origin}/>; rel="canonical"`);
  assert.equal(await markdown.text(), "# Same homepage\n");
  const html = await markdownHandler(new Request(origin, { headers: { Accept: "text/html" } }), context);
  assert.equal(html.headers.get("Vary"), "Accept-Encoding, Accept");
  assert.equal(await html.text(), "<h1>HTML page</h1>");
  await markdownHandler(new Request(`${origin}/assets/logo.svg`, { headers: { Accept: "text/markdown" } }), context);
  await markdownHandler(new Request(`${origin}/contact`, { method: "POST", body: "form-name=contact" }), context);
  assert.equal(fetches, 1, "Do not intercept assets or native form POSTs");
  assert.equal(htmlRequests, 3);
  globalThis.fetch = async () => new Response("Missing", { status: 404 });
  const missing = await markdownHandler(new Request(`${origin}/missing`, { headers: { Accept: "text/markdown" } }), {
    next: async () => new Response("Not found", { status: 404 }),
  });
  assert.equal(missing.status, 404, "Unknown URLs must remain real 404s");
} finally {
  globalThis.fetch = savedFetch;
}
console.log(`PASS: ${pages.length} pages, sitemap dates, organization logo, heading order, named links, same-content Markdown, content negotiation, native POST passthrough, 404s, and minified assets.`);
