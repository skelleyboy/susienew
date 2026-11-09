import { createServer } from "node:http";
import { readFile, stat } from "node:fs/promises";
import { resolve, extname, sep } from "node:path";
import { buildSite } from "./build";

await buildSite();
const root = resolve("dist/public");
const types: Record<string, string> = { ".html": "text/html; charset=utf-8", ".css": "text/css; charset=utf-8", ".js": "text/javascript; charset=utf-8", ".webp": "image/webp", ".jpg": "image/jpeg", ".svg": "image/svg+xml", ".xml": "application/xml", ".txt": "text/plain; charset=utf-8" };
const preview = !process.argv.includes("--production");
createServer(async (req, res) => {
  try {
    if (req.method !== "GET" && req.method !== "HEAD") {
      // Netlify captures native form POSTs in production. Do not fake delivery locally.
      req.resume();
      res.writeHead(501, { "Content-Type": "text/html; charset=utf-8", "Cache-Control": "no-store" });
      res.end(`<!doctype html><html lang="en"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Form delivery unavailable in preview</title><link rel="stylesheet" href="/assets/site.css"><main style="max-width:640px;margin:10vh auto;padding:24px"><h1>This preview cannot send your request.</h1><p>Your information has not been submitted. Form delivery is handled by Netlify on the published site.</p><p>You can reach Susie directly at <a href="tel:+12489436906">248-943-6906</a> or <a href="mailto:susie@propertypro1.com">susie@propertypro1.com</a>.</p><a href="/contact">Back to contact</a></main></html>`);
      return;
    }
    const url = new URL(req.url || "/", "http://preview");
    let pathname = decodeURIComponent(url.pathname);
    if (pathname !== "/" && pathname.endsWith("/")) {
      res.writeHead(301, { Location: pathname.slice(0, -1) + url.search }); res.end(); return;
    }
    let path = resolve(root, "." + (pathname === "/" ? "/index.html" : pathname));
    if (path !== root && !path.startsWith(root + sep)) { res.writeHead(403); res.end(); return; }
    if (!extname(path)) path += ".html";
    let status = pathname === "/404" || pathname === "/404.html" ? 404 : 200;
    try { if (!(await stat(path)).isFile()) throw new Error("Not file"); } catch { path = resolve(root, "404.html"); status = 404; }
    let content: Buffer | string = await readFile(path);
    if (preview && path.endsWith(".html") && content.includes(Buffer.from("<form"))) {
      content = content.toString().replace("<!-- preview-notice -->", `<aside style="padding:12px 20px;background:#f8edcf;color:#302d24;text-align:center;font:14px/1.5 system-ui">Development preview: forms send only on the published Netlify site. No request will be delivered from this preview.</aside>`);
    }
    res.writeHead(status, { "Content-Type": types[extname(path)] || "application/octet-stream", "Cache-Control": preview ? "no-store" : "public, max-age=300", "X-Content-Type-Options": "nosniff" });
    res.end(req.method === "HEAD" ? undefined : content);
  } catch {
    res.writeHead(400, { "Content-Type": "text/plain" }); res.end("Bad request");
  }
}).listen(5000, "0.0.0.0", () => console.log("Static HTML site serving on port 5000"));
