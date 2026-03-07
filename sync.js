// sync.js
import fs from "fs";
import { execSync } from "child_process";

// Your live backend API documentation URLs
const ENDPOINTS = {
  iam: "http://localhost:9365/v2/docs/openapi-resource.json?mod=iam",
  admin: "http://localhost:9365/v2/docs/openapi-resource.json?mod=admin",
  hr: "http://localhost:9365/v2/docs/openapi-resource.json?mod=hr",
};

// Helper: Formats the name (e.g., /admin/logs/access -> accessLog)
function extractEntityName(path) {
  const parts = path.split("/").filter(Boolean);

  if (parts.includes("settings")) {
    // e.g., settingsGeneral
    return (
      "settings" +
      parts[parts.length - 1].charAt(0).toUpperCase() +
      parts[parts.length - 1].slice(1)
    );
  }
  if (parts.includes("logs")) {
    // e.g., accessLog
    return parts[parts.length - 1] + "Log";
  }
  if (parts.includes("task")) return "taskManager";
  if (parts.includes("audit")) return "auditTrail";

  // Fallback: take the last word and remove 's' (roles -> role)
  let lastPart = parts[parts.length - 1];
  if (lastPart.endsWith("s")) lastPart = lastPart.slice(0, -1);
  return lastPart;
}


//NEW: Smart Field Extractor
function extractFields(schema, swaggerDoc) {
  let fields = [];
  if (!schema) return fields;

  // If it's a reference, go find the actual object in the components list
  if (schema.$ref) {
    const refName = schema.$ref.split('/').pop();
    if (swaggerDoc.components && swaggerDoc.components.schemas[refName]) {
      return extractFields(swaggerDoc.components.schemas[refName], swaggerDoc);
    }
  }

  if (schema.properties) {
    for (const [key, prop] of Object.entries(schema.properties)) {
      // If it's a nested object (like "profile"), extract its children
      if (prop.properties || prop.$ref) {
        const nested = extractFields(prop, swaggerDoc);
        nested.forEach(n => {
          fields.push({ field: `${key}.${n.field}`, label: n.label, type: n.type });
        });
      } else {
        // Determine input type
        let type = 'text';
        if (prop.type === 'integer' || prop.type === 'number') type = 'number';
        if (prop.format === 'email') type = 'email';
        if (prop.format === 'password') type = 'password';

        // Create a nice label (e.g., "first_name" -> "First Name")
        const label = prop.title || key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
        fields.push({ field: key, label: label, type: type });
      }
    }
  }
  return fields;
}
async function runSync() {
  console.log(" Fetching live API Blueprints from backend...");
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
        if (path.includes("{") || path.includes("/auth/")) continue;

        // Find GET lists or Settings POST endpoints
        if (methods.get || (methods.post && path.includes("/settings/"))) {
          const entityName = extractEntityName(path);
          // If the URL has 'settings', it's a form. Otherwise, it's a table.
          const type = path.includes("/settings/") ? "form" : "table";

         //  NEW: Extract Table Columns from GET response
         let columns = [];
         if (methods.get?.responses?.['200']?.content?.['application/json']?.schema) {
           let resSchema = methods.get.responses['200'].content['application/json'].schema;
           let dataSchema = resSchema.properties?.dataPayload?.properties?.data;
           if (dataSchema?.type === 'array' && dataSchema.items) dataSchema = dataSchema.items;
           columns = extractFields(dataSchema, swagger);
         }

         //  NEW: Extract Form Fields from POST request
         let formFields = [];
         if (methods.post?.requestBody?.content?.['application/json']?.schema) {
           formFields = extractFields(methods.post.requestBody.content['application/json'].schema, swagger);
         }

         if (!submodulesMap.has(entityName)) {
           submodulesMap.set(entityName, { 
             name: entityName, 
             endpoint: path, 
             type: type,
             columns: columns,
             formFields: formFields
           });
         }
       }
     }
     
     manifest.modules.push({
       name: moduleName,
       submodules: Array.from(submodulesMap.values())
     });
     
   } catch (error) {
     console.error(`Failed to fetch ${moduleName}. Make sure backend is running.`);
   }
 }

 fs.writeFileSync('./modules-manifest.json', JSON.stringify(manifest, null, 2));
 console.log(' modules-manifest.json updated with dynamic fields!');
 console.log(' Regenerating Vue files...');
 execSync('npm run generate', { stdio: 'inherit' });
}

runSync();