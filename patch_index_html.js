const fs = require('fs');
let content = fs.readFileSync('client/index.html', 'utf-8');

// Replace canonical to not have trailing slash initially
content = content.replace(
  '<link rel="canonical" href="https://susiesharak.com/" />',
  '<link rel="canonical" href="https://susiesharak.com" />'
);

fs.writeFileSync('client/index.html', content);
console.log('Fixed initial canonical URL in index.html');
