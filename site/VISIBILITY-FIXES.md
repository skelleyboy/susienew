# Visibility report fixes

Reviewed on November 9, 2026 against the supplied FIMO report and the live Netlify site.

## Changes

- Sitemap entries now carry actual content revision dates. These are stored with the page definition and do not change just because the site is rebuilt. When editing a page, supply its real revision date as the final `page()` argument.
- The personal brand has explicit Organization structured data with its real local logo, URL and verified profile links. The agent and brokerage remain separate identities.
- Navigation group labels no longer appear as document headings before the main H1. Their accessible group labels and visual styling are preserved.
- The three homepage service-image links have accessible names and descriptive image alternatives.
- The homepage title and description are clearer about the person, location and service.
- Production CSS and JavaScript are minified with the existing esbuild dependency before content hashes are calculated.
- `llms.txt` has a title, blockquote summary and organized links, including all blog articles.
- Every public reading page has a Markdown export generated from its existing main HTML content, an alternate discovery link and a visible “Text version” footer link. It is not a separate set of crawler-targeted claims.
- Explicit `Accept: text/markdown` requests receive that export with `Vary: Accept`. Netlify handles this through the included edge function; the preview server implements the same behavior. HTML, images, native Netlify form POSTs and real 404 responses retain their existing behavior.
- Markdown exports are excluded from the sitemap and carry noindex headers to avoid competing with canonical HTML pages.

## Findings not caused by broken site pages

The live homepage's internal page links returned HTTP 200 during the review. Zillow, Homes.com and FastExpert returned automated-access denials (403); Realtor.com returned rate limiting (429); LinkedIn returned its bot-block status (999). These responses do not establish that the linked public profiles are missing. Do not replace authentic profile URLs with generic directory homepages just to satisfy an automated checker.

The existing live `llms.txt` already had a title, summary and sections, despite the report's warning. Its format is now more explicit.

Google rankings and AI recommendations cannot be forced through metadata or promised from a third-party score. Verify them with Search Console and repeated relevant local searches after publishing. Markdown and llms.txt are optional reading aids, not Google ranking requirements.

## Verification

Run `npm run build`, `npm run test:static`, `npm run test:seo`, `node script/check-interactions.mjs`, `node script/check-lead-attribution.mjs`, and `npm run check`.

Publish through Netlify's project build so it includes `netlify.toml` and the edge function. Uploading only `dist/public` includes the static Markdown files but does not deploy the Accept-header handler.

After publishing on Netlify, confirm `/index.md`, the `text/markdown` response for `/`, sitemap dates, native form receipt and the new asset hashes on the live site. The edge function is tested locally with mocked responses, but its production execution requires that publish.
