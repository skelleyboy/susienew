const fs = require('fs');

const tomlContent = `[build]
  command = "npm run build"
  publish = "dist/public"

# Force HTTPS
[[redirects]]
  from = "http://susiesharak.com/*"
  to = "https://susiesharak.com/:splat"
  status = 301
  force = true

[[redirects]]
  from = "http://www.susiesharak.com/*"
  to = "https://susiesharak.com/:splat"
  status = 301
  force = true

# Strip www
[[redirects]]
  from = "https://www.susiesharak.com/*"
  to = "https://susiesharak.com/:splat"
  status = 301
  force = true

# Redirect old blog format with trailing slash
[[redirects]]
  from = "/blog/*/"
  to = "/blog/:splat"
  status = 301
  force = true

# Strip trailing slashes globally
[[redirects]]
  from = "/*/"
  to = "/:splat"
  status = 301
  force = true

# SPA routing fallback
[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
`;

fs.writeFileSync('netlify.toml', tomlContent);
console.log('Updated netlify.toml with 301 redirects and trailing slash rules');
