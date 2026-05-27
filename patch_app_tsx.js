const fs = require('fs');
let content = fs.readFileSync('client/src/App.tsx', 'utf-8');

if (!content.includes('useCanonical')) {
  // Add import
  content = content.replace(
    'import { Suspense, lazy } from "react";',
    'import { Suspense, lazy } from "react";\nimport { useCanonical } from "./hooks/useCanonical";'
  );
  
  // Add hook to Router
  content = content.replace(
    'function Router() {',
    'function Router() {\n  useCanonical();'
  );
  
  fs.writeFileSync('client/src/App.tsx', content);
  console.log('Added useCanonical hook to App.tsx');
}
