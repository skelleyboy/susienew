---
name: Netlify redirect safety
description: Production redirect-loop constraint and the user's restricted redirect scope.
---

Netlify owns HTTPS. Do not force HTTPS or non-www in application middleware, and never redirect based on forwarded-protocol headers.

**Why:** The bare-domain HTTP-to-HTTPS rule was followed by production HTTPS responses redirecting to their own paths, including sitemap and robots requests, with `netlify-vary: header=x-forwarded-proto`. A scheme-aware local rule simulation did not catch the hosting behavior.

**How to apply:** Keep only the user-approved two www-to-apex rules and the exact trailing-slash Novi and Dearborn aliases to the communities index. All redirect destinations must be absolute, and none may equal its source. Internal 200 rewrites and the true 404 are not redirects. Do not restore generic slash normalization or additional legacy redirects without permission. Verify actual production HEAD responses after deployment, not just generated-rule tests, and distinguish a workspace fix from a live resolution.
