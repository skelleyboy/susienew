import fs from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Read blog.ts to extract slugs
const blogContent = fs.readFileSync(path.join(__dirname, 'client/src/data/blog.ts'), 'utf-8');
const idMatches = [...blogContent.matchAll(/id:\s*"([^"]+)"/g)];
const slugs = idMatches.map(match => match[1]);

const staticRoutes = [
  '',
  '/buy',
  '/sell',
  '/communities',
  '/about',
  '/home-value',
  '/contact',
  '/blog',
  '/privacy',
  '/terms',
  // areas
  '/area/royal-oak',
  '/area/troy',
  '/area/sterling-heights',
  '/area/birmingham',
  '/area/bloomfield-hills',
  '/area/rochester-hills',
  '/area/ferndale'
];

const baseUrl = 'https://susiesharak.com';
const today = new Date().toISOString().split('T')[0];

let sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

staticRoutes.forEach(route => {
  sitemap += `  <url>\n    <loc>${baseUrl}${route}</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>weekly</changefreq>\n    <priority>${route === '' ? '1.0' : '0.8'}</priority>\n  </url>\n`;
});

slugs.forEach(slug => {
  sitemap += `  <url>\n    <loc>${baseUrl}/blog/${slug}</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>monthly</changefreq>\n    <priority>0.7</priority>\n  </url>\n`;
});

sitemap += `</urlset>`;

fs.writeFileSync(path.join(__dirname, 'client/public/sitemap.xml'), sitemap);
console.log('Sitemap generated!');
