import { mkdir, rm, writeFile, copyFile, access, cp, readFile } from "node:fs/promises";
import { createHash } from "node:crypto";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { pages, header, footer } from "../site/pages.mjs";
import { agentProfiles, socialProfiles, brokerage } from "../site/profiles.mjs";
import { legacyRedirects } from "./legacy-redirects";
import { withSvgArrows } from "../site/icons.mjs";
import { transform } from "esbuild";
import { markdownPath, pageMarkdown } from "../site/markdown.mjs";

const output = resolve("dist/public");
const origin = "https://susiesharak.com";
const escape = (value: unknown) => String(value ?? "").replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]!));
const plain = (value: string) => value.replace(/<[^>]*>/g, "").replace(/&amp;/g, "&").replace(/&quot;/g, '"').replace(/&#39;/g, "'");
const json = (value: unknown) => JSON.stringify(value).replace(/</g, "\\u003c");

function structuredData(page: any) {
  const logo = { "@type": "ImageObject", url: `${origin}/assets/brand-lockup.svg`, width: 475, height: 100 };
  const business = {
    "@type": "RealEstateAgent", "@id": `${origin}/#business`,
    name: "Susie Sharak Real Estate", url: origin,
    telephone: "+1-248-943-6906", email: "susie@propertypro1.com",
    image: `${origin}/assets/susie.webp`,
    logo,
    brand: { "@id": `${origin}/#brand` },
    areaServed: ["Oakland County, Michigan", "Macomb County, Michigan"],
    sameAs: [...socialProfiles.map(profile => profile.url), ...agentProfiles.map(profile => profile.url)],
  };
  const graph: any[] = [
    business,
    { "@type": "Organization", "@id": `${origin}/#brand`, name: "Susie Sharak Real Estate", url: origin, logo, sameAs: business.sameAs },
    { "@type": "Person", "@id": `${origin}/#susie`, name: "Susie Sharak", url: `${origin}/about`, image: `${origin}/assets/susie.webp`, worksFor: { "@type": "Organization", name: brokerage } },
    { "@type": "WebSite", "@id": `${origin}/#website`, url: origin, name: "Susie Sharak Real Estate", publisher: { "@id": `${origin}/#brand` } },
    { "@type": "WebPage", "@id": `${origin}${page.path}#page`, url: `${origin}${page.path}`, name: page.title, description: page.description, dateModified: page.dateModified, isPartOf: { "@id": `${origin}/#website` }, about: { "@id": `${origin}/#susie` }, inLanguage: "en-US" },
  ];
  if (page.path !== "/" && !page.noindex) {
    const parts = page.path.split("/").filter(Boolean);
    const crumbs = [{ "@type": "ListItem", position: 1, name: "Home", item: `${origin}/` }];
    if (parts.length > 1) crumbs.push({ "@type": "ListItem", position: 2, name: parts[0] === "area" ? "Communities" : "Home guides", item: `${origin}/${parts[0] === "area" ? "communities" : "blog"}` });
    crumbs.push({ "@type": "ListItem", position: crumbs.length + 1, name: page.title.split("|")[0].trim(), item: `${origin}${page.path}` });
    graph.push({ "@type": "BreadcrumbList", itemListElement: crumbs });
  }
  if (page.faq?.length) graph.push({
    "@type": "FAQPage", mainEntity: page.faq.map((item: any) => ({
      "@type": "Question", name: plain(item.question),
      acceptedAnswer: { "@type": "Answer", text: plain(item.answer) },
    })),
  });
  return json({ "@context": "https://schema.org", "@graph": graph });
}

export async function buildSite() {
  await rm(output, { recursive: true, force: true });
  await mkdir(`${output}/assets`, { recursive: true });
  await cp("site/assets", `${output}/assets`, { recursive: true });
  const interactionScript = (await transform(await readFile("site/interactions.js", "utf8"), { loader: "js", minify: true, target: "es2020", legalComments: "none" })).code;
  const interactionPath = `/assets/interactions-${createHash("sha256").update(interactionScript).digest("hex").slice(0,10)}.js`;
  await writeFile(`${output}${interactionPath}`, interactionScript);
  const cssSource = `${await readFile("site/styles.css", "utf8")}\n${await readFile("site/layout.css", "utf8")}`;
  const css = (await transform(cssSource, { loader: "css", minify: true, legalComments: "none" })).code;
  const stylesheet = `/assets/site-${createHash("sha256").update(css).digest("hex").slice(0, 10)}.css`;
  await writeFile(`${output}${stylesheet}`, css);
  // Keep a stable stylesheet for the development server's error responses.
  await writeFile(`${output}/assets/site.css`, css);
  await copyFile("site/assets/favicon.svg", `${output}/favicon.svg`);
  await copyFile("site/assets/social-share.jpg", `${output}/social-share.jpg`);
  try { await access("site/site.js"); await copyFile("site/site.js", `${output}/assets/site.js`); } catch {}
  const routes = new Set<string>();
  for (const page of pages) {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(page.dateModified) || !Number.isFinite(Date.parse(page.dateModified)) || page.dateModified > new Date().toISOString().slice(0, 10)) throw new Error(`Invalid content revision date: ${page.path}`);
    if (!/^\/[a-z0-9/-]*$/.test(page.path) || routes.has(page.path)) throw new Error(`Invalid or duplicate page path: ${page.path}`);
    routes.add(page.path);
    const filename = page.path === "/" ? "index.html" : `${page.path.slice(1)}.html`;
    const target = `${output}/${filename}`;
    await mkdir(dirname(target), { recursive: true });
    const html = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="format-detection" content="telephone=no">
<meta name="theme-color" content="#111111">
<title>${escape(page.title)}</title>
<meta name="description" content="${escape(page.description)}">
<meta name="robots" content="${page.noindex ? "noindex, follow" : "index, follow, max-image-preview:large"}">
<link rel="canonical" href="${origin}${page.path}">
<meta property="og:site_name" content="Susie Sharak Real Estate">
<meta property="og:locale" content="en_US">
<meta property="og:type" content="website">
<meta property="og:title" content="${escape(page.title)}">
<meta property="og:description" content="${escape(page.description)}">
<meta property="og:url" content="${origin}${page.path}">
<meta property="og:image" content="${origin}/social-share.jpg">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:image:alt" content="Susie Sharak Real Estate, serving Oakland and Macomb County, Michigan">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${escape(page.title)}">
<meta name="twitter:description" content="${escape(page.description)}">
<meta name="twitter:image" content="${origin}/social-share.jpg">
<link rel="icon" href="/favicon.svg" type="image/svg+xml">
<link rel="stylesheet" href="${stylesheet}">
${page.path !== "/404" ? `<link rel="alternate" type="text/markdown" href="${origin}${markdownPath(page.path)}" title="Plain-text version">` : ""}
${page.path === "/" ? '<link rel="preload" href="/assets/susie.webp" as="image" fetchpriority="high">' : ""}
<script type="application/ld+json">${structuredData(page)}</script>
</head>
<body>
${header(page.path)}
<main id="main">${page.body}</main>
${footer(page.path)}
<a class="floating-contact" href="/contact#contact-form" hidden>Let’s connect <svg viewBox="0 0 20 20" fill="none" aria-hidden="true"><path d="m5 12 5-5 5 5" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg></a>
<script src="${interactionPath}" defer></script>
</body>
</html>`;
    await writeFile(target, withSvgArrows(html));
    if (page.path !== "/404") await writeFile(`${output}${markdownPath(page.path)}`, pageMarkdown(page, origin));
  }
  if (!routes.has("/404")) throw new Error("A real 404 page is required");
  const indexed = pages.filter((p: any) => !p.noindex && p.path !== "/404");
  await writeFile(`${output}/sitemap.xml`, `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${indexed.map((p: any) => `<url><loc>${origin}${p.path}</loc><lastmod>${p.dateModified}</lastmod></url>`).join("\n")}\n</urlset>`);
  await writeFile(`${output}/robots.txt`, `User-agent: *\nAllow: /\n\nSitemap: ${origin}/sitemap.xml\n`);
  await writeFile(`${output}/llms.txt`, `# Susie Sharak Real Estate\n\n> Susie Sharak helps people buy and sell homes in Oakland and Macomb County, Michigan, with ${brokerage}.\n\nContact: 248-943-6906 or susie@propertypro1.com. HTML pages and their linked Markdown versions contain the same public content.\n\n## Services and local resources\n${indexed.filter((p: any) => !p.path.startsWith("/blog/")).map((p: any) => `- [${p.title}](${origin}${p.path}): ${p.description}`).join("\n")}\n\n## Buying and selling articles\n${indexed.filter((p: any) => p.path.startsWith("/blog/")).map((p: any) => `- [${p.title}](${origin}${p.path}): ${p.description}`).join("\n")}\n\n## Plain-text reading\n- [Homepage in Markdown](${origin}/index.md): The same homepage content in a plain-text format.\n\nMarket figures are dated county-level residential and condominium aggregates, not live listings or property valuations. See the market update page for the reporting period and original Realcomp source.\n`);
  // Explicit per-page rewrites, not a catch-all homepage fallback.
  for (const target of Object.values(legacyRedirects)) {
    if (!routes.has(target)) throw new Error(`Legacy redirect points to a missing page: ${target}`);
  }
  const redirects = Object.entries(legacyRedirects).flatMap(([from,to]) => [`${from} ${to} 301`, `${from}/ ${to} 301`]);
  await writeFile(`${output}/_redirects`, [...redirects, ...pages.filter((p: any) => p.path !== "/" && p.path !== "/404").map((p: any) => `${p.path} ${p.path}.html 200`), "/* /404.html 404"].join("\n") + "\n");
  await writeFile(`${output}/_headers`, `/assets/*\n  Cache-Control: public, max-age=86400\n/*.md\n  Content-Type: text/markdown; charset=utf-8\n  X-Robots-Tag: noindex\n/*\n  X-Content-Type-Options: nosniff\n  Referrer-Policy: strict-origin-when-cross-origin\n  X-Frame-Options: SAMEORIGIN\n  Permissions-Policy: camera=(), microphone=(), geolocation=()\n`);
  console.log(`Built ${pages.length} complete HTML pages with sitemap, structured data, and native forms.`);
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  buildSite().catch(error => { console.error(error); process.exitCode = 1; });
}
