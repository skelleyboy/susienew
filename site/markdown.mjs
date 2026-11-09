export const markdownPath = path => path === "/" ? "/index.md" : `${path}.md`;

export function wantsMarkdown(accept = "") {
  const types = new Map(accept.toLowerCase().split(",").map(part => {
    const [type, ...options] = part.trim().split(";");
    const quality = options.find(option => option.trim().startsWith("q="));
    return [type, quality ? Number(quality.trim().slice(2)) : 1];
  }));
  const markdown = types.get("text/markdown") || 0;
  return markdown > 0 && markdown >= (types.get("text/html") || 0);
}

const decode = text => text
  .replace(/&#x([0-9a-f]+);/gi, (_, value) => String.fromCodePoint(parseInt(value, 16)))
  .replace(/&#(\d+);/g, (_, value) => String.fromCodePoint(Number(value)))
  .replace(/&(amp|lt|gt|quot|apos|nbsp);/g, (_, name) => ({ amp: "&", lt: "<", gt: ">", quot: '"', apos: "'", nbsp: " " })[name]);
const attribute = (tag, name) => decode(tag.match(new RegExp(`\\b${name}=["']([^"']*)["']`, "i"))?.[1] || "");

// A readable export of the same main content, not alternate crawler-only copy.
export function pageMarkdown(page, origin) {
  const formId = page.body.match(/\bid="((?:contact|buyer|seller|valuation)-form)"/)?.[1];
  const content = page.body
    .replace(/<(script|style|svg)\b[^>]*>[\s\S]*?<\/\1>/gi, "")
    .replace(/<form\b[^>]*>[\s\S]*?<\/form>/gi, `\n\n[Use the inquiry form](${origin}${page.path}${formId ? `#${formId}` : ""})\n\n`)
    .replace(/<img\b[^>]*>/gi, tag => {
      const alt = attribute(tag, "alt");
      return alt ? `![${alt.replace(/[\[\]]/g, "")}](${new URL(attribute(tag, "src"), origin).href})` : "";
    })
    .replace(/<a\b([^>]*)>([\s\S]*?)<\/a>/gi, (_, attrs, label) => {
      const text = label.replace(/<[^>]+>/g, "").replace(/[↗→]/g, "").trim() || attribute(attrs, "aria-label");
      const href = attribute(attrs, "href");
      return text && href ? `[${decode(text)}](${new URL(href, `${origin}${page.path}`).href})` : text;
    })
    .replace(/<h([1-6])\b[^>]*>([\s\S]*?)<\/h\1>/gi, (_, level, text) => `\n\n${"#".repeat(Number(level))} ${text.replace(/<br\s*\/?>/gi, " ").replace(/<[^>]+>/g, "")}\n\n`)
    .replace(/<(strong|b)\b[^>]*>([\s\S]*?)<\/\1>/gi, "**$2**")
    .replace(/<li\b[^>]*>/gi, "\n- ")
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<\/(?:p|div|section|article|figure|ul|ol|details|summary)>/gi, "\n\n")
    .replace(/<[^>]+>/g, "")
    .replace(/[↗→]/g, "");
  return `Source: ${origin}${page.path}\nLast updated: ${page.dateModified}\n\n${decode(content).split("\n").map(line => line.trim()).join("\n").replace(/\n{3,}/g, "\n\n").trim()}\n`;
}
