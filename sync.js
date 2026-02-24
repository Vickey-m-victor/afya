// sync.js
import fs from 'fs';
import { execSync } from 'child_process';

// Your live backend API documentation URLs
const ENDPOINTS = {
  iam: 'http://localhost:8086/v2/docs/openapi-resource.json?mod=iam',
  admin: 'http://localhost:8086/v2/docs/openapi-resource.json?mod=admin'
};

// Helper: Formats the name (e.g., /admin/logs/access -> accessLog)
function extractEntityName(path) {
  const parts = path.split('/').filter(Boolean);
  
  if (parts.includes('settings')) {
    // e.g., settingsGeneral
    return 'settings' + parts[parts.length - 1].charAt(0).toUpperCase() + parts[parts.length - 1].slice(1);
  }
  if (parts.includes('logs')) {
    // e.g., accessLog
    return parts[parts.length - 1] + 'Log';
  }
  if (parts.includes('task')) return 'taskManager';
  if (parts.includes('audit')) return 'auditTrail';

  // Fallback: take the last word and remove 's' (roles -> role)
  let lastPart = parts[parts.length - 1];
  if (lastPart.endsWith('s')) lastPart = lastPart.slice(0, -1);
  return lastPart;
}

async function runSync() {
  console.log('📡 Fetching live API Blueprints from backend...');
  const manifest = { modules: [] };

  for (const [moduleName, url] of Object.entries(ENDPOINTS)) {
    try {
      const response = await fetch(url);
      const swagger = await response.json();
      const submodulesMap = new Map();

      // Loop through every path in the backend
      for (const [path, methods] of Object.entries(swagger.paths)) {
        // Skip endpoints with {id} variables (we just need the base endpoint)
        // Skip manual Auth endpoints (login, register)
        if (path.includes('{') || path.includes('/auth/')) continue;
        
        // Find GET lists or Settings POST endpoints
        if (methods.get || (methods.post && path.includes('/settings/'))) {
          const entityName = extractEntityName(path);
          // If the URL has 'settings', it's a form. Otherwise, it's a table.
          const type = path.includes('/settings/') ? 'form' : 'table';
          
          if (!submodulesMap.has(entityName)) {
            submodulesMap.set(entityName, { name: entityName, endpoint: path, type: type });
          }
        }
      }
      
      manifest.modules.push({
        name: moduleName,
        submodules: Array.from(submodulesMap.values())
      });
      
    } catch (error) {
      console.error(`❌ Failed to fetch ${moduleName} from ${url}. Is your backend running?`);
    }
  }

  // Write the Shopping List
  fs.writeFileSync('./modules-manifest.json', JSON.stringify(manifest, null, 2));
  console.log('✅ modules-manifest.json updated successfully!');

  // Trigger Plop to build the files
  console.log('🚀 Triggering the Builder (Plop) to generate Vue files...');
  execSync('npm run generate', { stdio: 'inherit' });
}

runSync();