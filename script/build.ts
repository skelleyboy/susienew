import { mkdir, rm, writeFile, copyFile, access, cp, readFile } from "node:fs/promises";
import { createHash } from "node:crypto";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { pages, header, footer } from "../site/pages.mjs";

const output = resolve("dist/public");
const origin = "https://susiesharak.com";
const escape = (value: unknown) => String(value ?? "").replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]!));
const plain = (value: string) => value.replace(/<[^>]*>/g, "").replace(/&amp;/g, "&").replace(/&quot;/g, '"').replace(/&#39;/g, "'");
const json = (value: unknown) => JSON.stringify(value).replace(/</g, "\\u003c");

function structuredData(page: any) {
  const business = {
    "@type": "RealEstateAgent", "@id": `${origin}/#business`,
    name: "Susie Sharak Real Estate", url: origin,
    telephone: "+1-248-943-6906", email: "susie@propertypro1.com",
    image: `${origin}/assets/susie.webp`,
    areaServed: ["Oakland County, Michigan", "Macomb County, Michigan"],
    sameAs: ["https://www.instagram.com/susiesharak/", "https://www.facebook.com/susie.sharakzetouna/"],
  };
  const graph: any[] = [
    business,
    { "@type": "Person", "@id": `${origin}/#susie`, name: "Susie Sharak", url: `${origin}/about`, image: `${origin}/assets/susie.webp`, worksFor: { "@type": "Organization", name: "Golden Realty" } },
    { "@type": "WebSite", "@id": `${origin}/#website`, url: origin, name: "Susie Sharak Real Estate", publisher: { "@id": `${origin}/#business` } },
    { "@type": "WebPage", "@id": `${origin}${page.path}#page`, url: `${origin}${page.path}`, name: page.title, description: page.description, isPartOf: { "@id": `${origin}/#website` }, about: { "@id": `${origin}/#susie` }, inLanguage: "en-US" },
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
  const css = `${await readFile("site/styles.css", "utf8")}\n${await readFile("site/layout.css", "utf8")}`;
  const stylesheet = `/assets/site-${createHash("sha256").update(css).digest("hex").slice(0, 10)}.css`;
  await writeFile(`${output}${stylesheet}`, css);
  // Keep a stable stylesheet for the development server's error responses.
  await writeFile(`${output}/assets/site.css`, css);
  await copyFile("site/assets/favicon.svg", `${output}/favicon.svg`);
  await copyFile("site/assets/social-share.jpg", `${output}/social-share.jpg`);
  try { await access("site/site.js"); await copyFile("site/site.js", `${output}/assets/site.js`); } catch {}
  const routes = new Set<string>();
  for (const page of pages) {
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
<meta name="theme-color" content="#35362f">
<title>${escape(page.title)}</title>
<meta name="description" content="${escape(page.description)}">
<meta name="robots" content="${page.noindex ? "noindex, follow" : "index, follow, max-image-preview:large"}">
<link rel="canonical" href="${origin}${page.path}">
<meta property="og:site_name" content="Susie Sharak Real Estate">
<meta property="og:type" content="website">
<meta property="og:title" content="${escape(page.title)}">
<meta property="og:description" content="${escape(page.description)}">
<meta property="og:url" content="${origin}${page.path}">
<meta property="og:image" content="${origin}/social-share.jpg">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${escape(page.title)}">
<meta name="twitter:description" content="${escape(page.description)}">
<meta name="twitter:image" content="${origin}/social-share.jpg">
<link rel="icon" href="/favicon.svg" type="image/svg+xml">
<link rel="stylesheet" href="${stylesheet}">
${page.path === "/" ? '<link rel="preload" href="/assets/susie.webp" as="image" fetchpriority="high">' : ""}
<script type="application/ld+json">${structuredData(page)}</script>
</head>
<body>
${header(page.path)}
<main id="main">${page.body}</main>
${footer()}
<!-- preview-notice -->
</body>
</html>`;
    await writeFile(target, html);
  }
  if (!routes.has("/404")) throw new Error("A real 404 page is required");
  const indexed = pages.filter((p: any) => !p.noindex && p.path !== "/404");
  await writeFile(`${output}/sitemap.xml`, `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${indexed.map((p: any) => `<url><loc>${origin}${p.path}</loc></url>`).join("\n")}\n</urlset>`);
  await writeFile(`${output}/robots.txt`, `User-agent: *\nAllow: /\n\nSitemap: ${origin}/sitemap.xml\n`);
  await writeFile(`${output}/llms.txt`, `# Susie Sharak Real Estate\n\nSusie Sharak is a real estate agent with Golden Realty serving Oakland and Macomb County, Michigan. Contact: 248-943-6906 or susie@propertypro1.com.\n\n## Services and local resources\n${indexed.filter((p: any) => !p.path.startsWith("/blog/")).map((p: any) => `- [${p.title}](${origin}${p.path}): ${p.description}`).join("\n")}\n\nMarket figures are dated county-level residential and condominium aggregates, not live listings or property valuations. See the market update page for the reporting period and original Realcomp source.\n`);
  // Explicit per-page rewrites, not a catch-all homepage fallback.
  await writeFile(`${output}/_redirects`, pages.filter((p: any) => p.path !== "/" && p.path !== "/404").map((p: any) => `${p.path} ${p.path}.html 200`).join("\n") + "\n/* /404.html 404\n");
  await writeFile(`${output}/_headers`, `/assets/*\n  Cache-Control: public, max-age=86400\n/*\n  X-Content-Type-Options: nosniff\n  Referrer-Policy: strict-origin-when-cross-origin\n  X-Frame-Options: SAMEORIGIN\n  Permissions-Policy: camera=(), microphone=(), geolocation=()\n`);
  console.log(`Built ${pages.length} complete HTML pages with sitemap, structured data, and native forms.`);
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  buildSite().catch(error => { console.error(error); process.exitCode = 1; });
}
