import { createServer } from "node:http";
import { readFile, stat } from "node:fs/promises";
import { resolve, extname, sep } from "node:path";
import { buildSite } from "./build";
import { legacyRedirects } from "./legacy-redirects";
import { wantsMarkdown, markdownPath } from "../site/markdown.mjs";

await buildSite();
const root = resolve("dist/public");
const types: Record<string, string> = { ".html": "text/html; charset=utf-8", ".css": "text/css; charset=utf-8", ".js": "text/javascript; charset=utf-8", ".webp": "image/webp", ".png": "image/png", ".jpg": "image/jpeg", ".svg": "image/svg+xml", ".xml": "application/xml", ".txt": "text/plain; charset=utf-8", ".md": "text/markdown; charset=utf-8" };
const preview = !process.argv.includes("--production");
createServer(async (req, res) => {
  try {
    if (req.method !== "GET" && req.method !== "HEAD") {
      // Netlify captures native form POSTs in production. Do not fake delivery locally.
      req.resume();
      res.writeHead(501, { "Content-Type": "text/html; charset=utf-8", "Cache-Control": "no-store" });
      res.end(`<!doctype html><html lang="en"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="format-detection" content="telephone=no"><title>Form delivery unavailable in preview</title><link rel="stylesheet" href="/assets/site.css"><main style="max-width:640px;margin:10vh auto;padding:32px"><h1>This preview cannot send your request.</h1><p>Your information has not been submitted. Form delivery is handled by Netlify on the published site.</p><p>You can email Susie at <a href="mailto:susie@propertypro1.com">susie@propertypro1.com</a>.</p><a href="/contact#contact-form">Back to contact</a></main></html>`);
      return;
    }
    const url = new URL(req.url || "/", "http://preview");
    let pathname = decodeURIComponent(url.pathname);
    const legacyTarget = legacyRedirects[pathname.replace(/\/$/, "")];
    if (legacyTarget) {
      res.writeHead(301, { Location: legacyTarget + url.search }); res.end(); return;
    }
    if (pathname !== "/" && pathname.endsWith("/")) {
      res.writeHead(301, { Location: pathname.slice(0, -1) + url.search }); res.end(); return;
    }
    const negotiated = wantsMarkdown(req.headers.accept || "") && !extname(pathname) && pathname !== "/404";
    const requestedFile = negotiated ? markdownPath(pathname) : pathname === "/" ? "/index.html" : pathname;
    let path = resolve(root, "." + requestedFile);
    if (path !== root && !path.startsWith(root + sep)) { res.writeHead(403); res.end(); return; }
    if (!extname(path)) path += ".html";
    let status = pathname === "/404" || pathname === "/404.html" ? 404 : 200;
    try { if (!(await stat(path)).isFile()) throw new Error("Not file"); } catch { path = resolve(root, "404.html"); status = 404; }
    const content = await readFile(path);
    const isMarkdown = extname(path) === ".md";
    const canonicalPath = pathname.endsWith(".md") ? pathname === "/index.md" ? "/" : pathname.slice(0, -3) : pathname;
    res.writeHead(status, { "Content-Type": types[extname(path)] || "application/octet-stream", "Cache-Control": preview ? "no-store" : "public, max-age=300", "X-Content-Type-Options": "nosniff", "Vary": "Accept", ...(isMarkdown ? { "X-Robots-Tag": "noindex", "Link": `<https://susiesharak.com${canonicalPath}>; rel="canonical"` } : {}) });
    res.end(req.method === "HEAD" ? undefined : content);
  } catch {
    res.writeHead(400, { "Content-Type": "text/plain" }); res.end("Bad request");
  }
}).listen(5000, "0.0.0.0", () => console.log("Static HTML site serving on port 5000"));
