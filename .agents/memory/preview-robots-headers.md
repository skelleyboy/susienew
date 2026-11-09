---
name: Preview crawler headers
description: Development proxy headers differ from the app's own indexing headers.
---

Use the live domain to judge production indexability, not development proxy headers.

**Why:** The development proxy adds multiple restrictive X-Robots-Tag values independently of the server. A request can contain both the proxy's noindex/nofollow directives and the app's own noindex header, so checking a single exact header value gives a false failure.

**How to apply:** Inspect all header values when testing development responses. Keep the preview protected and do not weaken its crawler restrictions to address a production SEO report.
