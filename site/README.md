# Static real estate website

The active website is built from `pages.mjs` and `styles.css`. The old React source is retained for reference but is not shipped to visitors.

- `npm run build`: generates full HTML pages in `dist/public`, plus assets, sitemap, robots, structured data, and Netlify routing.
- `npm run dev:client`: serves the generated website on port 5000. Changes to imported templates restart the build.
- `npm run test:static`: checks route preservation, links, metadata, forms, and crawler-readable content.
- `npx tsc -p tsconfig.static.json`: checks the static build tooling.

## Content

Update the actual visible content, not a separate crawler-only block. Market figures must state their reporting period, scope, and original source. A county median is not a home valuation. Do not add invented listings, sales results, reviews, rankings, or guarantees.

## Netlify forms

Lead forms are real HTML forms with `data-netlify="true"`, `form-name`, and a honeypot. Netlify detects them from the generated HTML after deployment. Keep field names identical wherever a named form repeats.

The development server deliberately returns an error for POST requests rather than claiming a lead was delivered. Production delivery depends on Netlify Forms being enabled for the site. After publishing, check that all four forms appear in Netlify, then configure submission email notifications to the intended recipients and verify with a real submission. Email notifications cannot be configured by this static site's HTML.

Do not restore a single-page-app catch-all redirect. Unknown pages must return 404 instead of a duplicate homepage.
