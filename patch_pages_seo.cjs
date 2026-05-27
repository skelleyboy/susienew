const fs = require('fs');
const path = require('path');

const pagesDir = 'client/src/pages';
const files = fs.readdirSync(pagesDir).filter(f => f.endsWith('.tsx'));

for (const file of files) {
  const filePath = path.join(pagesDir, file);
  let content = fs.readFileSync(filePath, 'utf-8');
  let modified = false;

  // Add import if not present and if there's a Helmet tag
  if (content.includes('Helmet') && !content.includes('SEO') && !content.includes('import { SEO }')) {
    content = content.replace(
      'import { Helmet } from "react-helmet-async";',
      'import { SEO } from "@/components/SEO";\nimport { Helmet } from "react-helmet-async";'
    );
    modified = true;
  } else if (!content.includes('import { SEO }') && !content.includes('react-helmet-async')) {
    content = content.replace(
      'import',
      'import { SEO } from "@/components/SEO";\nimport'
    );
    modified = true;
  }

  // Find simple <Helmet> blocks with title and description
  const helmetMatch = content.match(/<Helmet>[\s\S]*?<title>(.*?)<\/title>[\s\S]*?<meta name="description" content="(.*?)" \/>[\s\S]*?<\/Helmet>/);
  if (helmetMatch) {
    const fullMatch = helmetMatch[0];
    const title = helmetMatch[1];
    const description = helmetMatch[2];
    
    // Convert to SEO component
    const seoComponent = `<SEO title="${title}" description="${description}" />`;
    content = content.replace(fullMatch, seoComponent);
    modified = true;
  }
  
  // Find <Helmet> blocks with title and description where title uses expressions
  const helmetMatchExpr = content.match(/<Helmet>[\s\S]*?<title>(\{.*?\})<\/title>[\s\S]*?<meta name="description" content="([^"]+)" \/>[\s\S]*?<\/Helmet>/);
  if (helmetMatchExpr) {
    const fullMatch = helmetMatchExpr[0];
    const title = helmetMatchExpr[1].replace(/^{|}$/g, ''); // remove {}
    const description = helmetMatchExpr[2];
    
    const seoComponent = `<SEO title={${title}} description="${description}" />`;
    content = content.replace(fullMatch, seoComponent);
    modified = true;
  }
  
  // Find <Helmet> blocks with title and description where both use expressions
  const helmetMatchBothExpr = content.match(/<Helmet>[\s\S]*?<title>(\{.*?\})<\/title>[\s\S]*?<meta name="description" content=(\{.*?\}) \/>[\s\S]*?<\/Helmet>/);
  if (helmetMatchBothExpr) {
    const fullMatch = helmetMatchBothExpr[0];
    const title = helmetMatchBothExpr[1].replace(/^{|}$/g, ''); 
    const description = helmetMatchBothExpr[2].replace(/^{|}$/g, ''); 
    
    const seoComponent = `<SEO title={${title}} description={${description}} />`;
    content = content.replace(fullMatch, seoComponent);
    modified = true;
  }

  if (modified) {
    fs.writeFileSync(filePath, content);
    console.log(`Updated SEO for ${file}`);
  }
}
