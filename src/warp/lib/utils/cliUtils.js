import fs from 'fs';
import path from 'path';
import chalk from 'chalk';
import pageTemplate from '../templates/pageTemplate.js';

/**
 * Capitalizes the first letter of a string.
 */
function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function lowercase(str) {
  return str.toLowerCase();
}

function splitWords(input = '') {
  return String(input)
    .replace(/([a-z0-9])([A-Z])/g, '$1 $2')
    .replace(/[^a-zA-Z0-9]+/g, ' ')
    .trim()
    .split(/\s+/)
    .filter(Boolean);
}

function toPascalCase(input = '') {
  const words = splitWords(input);
  if (words.length === 0) return 'Item';

  let value = words
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join('');

  if (/^[0-9]/.test(value)) {
    value = `M${value}`;
  }

  return value;
}

function toCamelCase(input = '') {
  const pascal = toPascalCase(input);
  return pascal.charAt(0).toLowerCase() + pascal.slice(1);
}

function toKebabCase(input = '') {
  const words = splitWords(input);
  if (words.length === 0) return 'item';
  return words.map((word) => word.toLowerCase()).join('-');
}

/**
* Creates the folders for a new module.
*/
export function createFolders(modulePath, selectedFolders, moduleName) {
  selectedFolders.forEach(folder => {
    const fullPath = path.join(modulePath, folder);
    fs.mkdirSync(fullPath, { recursive: true });
    console.log(chalk.yellow(`📂 Created: ${fullPath}`));
  });
}

// Store and service generators removed — generated views use useApi directly.

/**
 * Generates Vue route files from Swagger schema.
 *
 * @param {Object} schema - The Swagger module schema.
 * @param {string} modulePath - Path to the module directory.
 */
export const generateModuleRoutes = (schema, modulePath, moduleName, apiEndpoints) => {
  if (!schema || !schema.components || !schema.components.schemas) {
    console.error(chalk.red('❌ Invalid schema: Missing components or schemas.'));
    return;
  }

  const routeImports = [];
  const generatedRouteNames = [];
  const routesIndexPath = path.join(modulePath, 'router', 'index.js');

  // Ensure router directory exists
  fs.mkdirSync(path.join(modulePath, 'router'), { recursive: true });

  Object.keys(schema.components.schemas).forEach(route => {
    const schemaProperties = schema.components.schemas[route]?.properties || {};
    const routeKey = toKebabCase(route);
    const routeViewName = toPascalCase(route);
    const routeImportName = `${routeViewName}Routes`;
    const endpoints = apiEndpoints[route] || {};
    const systemFields = new Set(['created_at', 'updated_at', 'is_deleted']);

    // Map page type → required endpoint key
    const pageEndpointMap = { index: 'list', create: 'create', update: 'update', view: 'view' };

    // Generate tableColumns dynamically (ignore backend-managed fields)
    const tableColumns = Object.keys(schemaProperties)
      .filter((key) => !systemFields.has(key))
      .map(key => ({
        key,
        label: key.replace(/_/g, ' ').replace(/\b\w/g, char => char.toUpperCase()) // Convert snake_case to "Title Case"
      }));

    const routePath = path.join(modulePath, 'views', routeViewName);
    const routerPath = path.join(modulePath, 'router', `${routeViewName}.js`);
    fs.mkdirSync(routePath, { recursive: true });

    const generatedPages = new Set();

    // Create Vue files using the page template — only when the API endpoint exists
    ['index', 'create', 'update', 'view'].forEach(file => {
      const requiredEndpoint = pageEndpointMap[file];
      if (!endpoints[requiredEndpoint]) {
        console.log(chalk.gray(`🚫 Skipping ${file}.vue for "${route}" — no "${requiredEndpoint}" endpoint.`));
        return;
      }

      const filePath = path.join(routePath, `${file}.vue`);
      const pageContent = pageTemplate(
        routeViewName,
        file,
        tableColumns,
        moduleName,
        endpoints,
        routeKey
      );

      fs.writeFileSync(filePath, pageContent);
      generatedPages.add(file);
      console.log(chalk.blue(`📄 Created: ${filePath}`));
    });

    // Generate form.vue only when create or update pages were generated
    if (generatedPages.has('create') || generatedPages.has('update')) {
      const formPath = path.join(routePath, 'form.vue');
      if (!fs.existsSync(formPath)) {
        const formContent = `<script setup>\n</script>\n<template>\n  <div class="container">\n    <form>\n      <!-- Form content here -->\n    </form>\n  </div>\n</template>\n\n<style scoped></style>\n`;
        fs.writeFileSync(formPath, formContent);
        console.log(chalk.blue(`📄 Created: ${formPath}`));
      }
    }

    // Skip router file entirely if no pages were generated
    if (generatedPages.size === 0) {
      console.log(chalk.yellow(`⚠️  No pages generated for "${route}" — skipping router entry.`));
      return;
    }

    // Build router entries only for generated pages
    const routeTitle = route.replace(/([a-z])([A-Z])/g, '$1 $2');
    const routeEntries = [];

    if (generatedPages.has('create')) {
      routeEntries.push(`  {
    path: '/${moduleName}/${routeKey}/create',
    name: '${moduleName}/${routeKey}/create',
    component: () => import('../views/${routeViewName}/create.vue'),
    meta: { title: 'Afya365 - Create ${routeTitle}', layout: layout }
  }`);
    }

    if (generatedPages.has('view')) {
      routeEntries.push(`  {
    path: '/${moduleName}/${routeKey}/view/:id',
    name: '${moduleName}/${routeKey}/view',
    component: () => import('../views/${routeViewName}/view.vue'),
    props: true,
    meta: { title: 'Afya365 - View ${routeTitle}', layout: layout }
  }`);
    }

    if (generatedPages.has('update')) {
      routeEntries.push(`  {
    path: '/${moduleName}/${routeKey}/update/:id',
    name: '${moduleName}/${routeKey}/update',
    component: () => import('../views/${routeViewName}/update.vue'),
    props: true,
    meta: { title: 'Afya365 - Update ${routeTitle}', layout: layout }
  }`);
    }

    if (generatedPages.has('index')) {
      routeEntries.push(`  {
    path: '/${moduleName}/${routeKey}',
    name: '${moduleName}/${routeKey}',
    component: () => import('../views/${routeViewName}/index.vue'),
    meta: { title: 'Afya365 - ${routeTitle}', layout: layout }
  }`);
    }

    const routerContent = `const layout = 'LayoutBackend'\nexport default [\n${routeEntries.join(',\n')}\n];`;
    fs.writeFileSync(routerPath, routerContent);
    console.log(chalk.blue(`📄 Created: ${routerPath}`));

    // Store route import for index.js
    routeImports.push(`import ${routeImportName} from './${routeViewName}.js';`);
    generatedRouteNames.push(`${routeViewName}Routes`);
  });

  // Create index.js to export only routes that were actually generated
  const indexContent = `
${routeImports.join('\n')}

export default [
  ${generatedRouteNames.map(name => `...${name}`).join(',\n  ')}
];
`;
  fs.writeFileSync(routesIndexPath, indexContent.trim());
  console.log(chalk.green(`✅ Generated router index: ${routesIndexPath}`));
};


export const getApiEndpoints = (openApiSpec) => {
  const paths = openApiSpec.paths || {};
  const schemas = new Set(Object.keys(openApiSpec.components?.schemas || {}));

  // Patterns that indicate utility/non-CRUD endpoints — skip these for list mapping
  const utilityPatterns = [
    /\/search-dropdown$/,
    /\/search$/,
    /\/export$/,
    /\/import$/,
    /\/bulk$/,
  ];

  let endPoints = {};

  Object.keys(paths).forEach(path => {
    Object.keys(paths[path]).forEach(method => {
      const operation = paths[path][method];

      if (!operation.tags || operation.tags.length === 0) return;

      const resourceName = operation.tags[0]; // Assuming the first tag is the main resource

      if (schemas.has(resourceName)) {
        if (!endPoints[resourceName]) {
          endPoints[resourceName] = {};
        }

        // Determine CRUD operation
        let action = "";
        if (method === "post") {
          action = "create";
        } else if (method === "get") {
          if (path.includes("{id}")) {
            action = "view";
          } else if (utilityPatterns.some(pattern => pattern.test(path))) {
            // Skip utility/dropdown endpoints — not the CRUD list
            return;
          } else {
            // For the list action, prefer the plural endpoint (e.g. /hr/departments)
            // over the singular base (e.g. /hr/department) if both exist
            if (endPoints[resourceName].list) {
              // Only overwrite if this path looks more like a plural listing
              const existingPath = endPoints[resourceName].list;
              const lastSegment = path.split('/').pop();
              const existingLastSegment = existingPath.split('/').pop();
              // Prefer the path whose last segment ends with 's' (plural)
              if (lastSegment.endsWith('s') && !existingLastSegment.endsWith('s')) {
                action = "list";
              } else {
                return; // keep the existing list endpoint
              }
            } else {
              action = "list";
            }
          }
        } else if (method === "put") {
          action = "update";
        } else if (method === "delete") {
          action = "delete";
        }

        endPoints[resourceName][action] = path;
      }
    });
  });

  return endPoints;
}

/**
 * Extracts field/property definitions from the list endpoint response schema.
 * Looks in: responses.200.content.application/json.schema.properties.dataPayload.properties.data.items.properties
 * Falls back to components.schemas[resourceName].properties when available.
 */
export const enrichSchemaProperties = (openApiSpec) => {
  const paths = openApiSpec.paths || {};
  const schemas = openApiSpec.components?.schemas || {};
  const endpoints = getApiEndpoints(openApiSpec);

  for (const resourceName in endpoints) {
    const schema = schemas[resourceName];
    if (!schema) continue;

    // If properties already exist on the schema, skip
    if (schema.properties && Object.keys(schema.properties).length > 0) continue;

    // Try to extract properties from the list endpoint's response schema
    const listPath = endpoints[resourceName]?.list;
    if (!listPath || !paths[listPath]?.get) continue;

    try {
      const respSchema = paths[listPath].get.responses['200'].content['application/json'].schema;
      const itemProps = respSchema?.properties?.dataPayload?.properties?.data?.items?.properties;

      if (itemProps && Object.keys(itemProps).length > 0) {
        schema.properties = itemProps;
        console.log(chalk.cyan(`📋 Extracted ${Object.keys(itemProps).length} field(s) for "${resourceName}" from response schema`));
      }
    } catch (_) {
      // Could not extract — leave schema.properties as-is
    }
  }
}



