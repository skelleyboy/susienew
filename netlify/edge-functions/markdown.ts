import { wantsMarkdown, markdownPath } from "../../site/markdown.mjs";

type Context = { next: () => Promise<Response> };

export default async function markdown(request: Request, context: Context) {
  const url = new URL(request.url);
  if (!["GET", "HEAD"].includes(request.method) || /\.[^/]+$/.test(url.pathname)) return context.next();
  const path = url.pathname === "/" ? "/" : url.pathname.replace(/\/$/, "");
  let response: Response;
  if (wantsMarkdown(request.headers.get("accept") || "") && path !== "/404") {
    const source = new URL(markdownPath(path), url);
    response = await fetch(source, { method: request.method, headers: { Accept: "text/plain" } });
    if (!response.ok) return context.next();
    const headers = new Headers(response.headers);
    headers.set("Content-Type", "text/markdown; charset=utf-8");
    headers.set("Link", `<https://susiesharak.com${path}>; rel="canonical"`);
    headers.set("X-Robots-Tag", "noindex");
    headers.set("Vary", "Accept");
    return new Response(response.body, { status: response.status, headers });
  }
  response = await context.next();
  const headers = new Headers(response.headers);
  const vary = new Set((headers.get("Vary") || "").split(",").map(value => value.trim()).filter(Boolean));
  vary.add("Accept");
  headers.set("Vary", [...vary].join(", "));
  return new Response(response.body, { status: response.status, headers });
}
