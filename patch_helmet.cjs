const fs = require('fs');

let appContent = fs.readFileSync('client/src/App.tsx', 'utf-8');

if (!appContent.includes('HelmetProvider')) {
  appContent = appContent.replace(
    'import { QueryClientProvider } from "@tanstack/react-query";',
    'import { QueryClientProvider } from "@tanstack/react-query";\nimport { HelmetProvider } from "react-helmet-async";'
  );
  
  appContent = appContent.replace(
    '<QueryClientProvider client={queryClient}>',
    '<QueryClientProvider client={queryClient}>\n      <HelmetProvider>'
  );
  
  appContent = appContent.replace(
    '</QueryClientProvider>',
    '      </HelmetProvider>\n    </QueryClientProvider>'
  );
  
  fs.writeFileSync('client/src/App.tsx', appContent);
  console.log('Added HelmetProvider to App.tsx');
}
