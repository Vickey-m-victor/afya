import { fetchSwaggerJson } from '../utils/apiUtils.js';
import path from 'path';
import chalk from 'chalk';
import { generateModuleRoutes, createFolders, getApiEndpoints, enrichSchemaProperties } from '../utils/cliUtils.js';
import { createFormTemplate } from './helpers.js';

export async function generateModule(moduleName, selectedFolders) {

    console.log(chalk.yellow(`🚀 Fetching schema for module: ${moduleName}...`));

    const moduleData = await fetchSwaggerJson(moduleName, '', true);


    if (moduleData.error) {
        console.error(chalk.red(`❌ ${moduleData.error}`));
        throw new Error(moduleData.error);
    }

    if (!moduleData || Object.keys(moduleData).length === 0) {
        throw new Error(`No schema found for module: ${moduleName}`);
    }

    // Extract valid API endpoints
    const apiEndpoints = getApiEndpoints(moduleData, moduleName);

    // Enrich empty schemas with properties from the API response definitions
    enrichSchemaProperties(moduleData);

    const modulePath = path.resolve(`modules/${moduleName}`);

    console.log(chalk.green(`🚀 Generating module: ${moduleName}...`));

    // Create only selected folders
    createFolders(modulePath, selectedFolders, moduleName);

    // Generate Routes (if "router" is selected)
    if (selectedFolders.includes('router')) {
        generateModuleRoutes(moduleData, modulePath, moduleName, apiEndpoints);
        console.log(chalk.yellow(`📌 Routes generated`));
    }

    // Generate Form (if "views" is selected) — only for schemas with create or update endpoints
    if (selectedFolders.includes('views')) {
        console.log(chalk.yellow(`📝 Generating form for module: ${moduleName}...`));
        for (const schemaName in moduleData.components.schemas) {
            const schema = moduleData.components.schemas[schemaName];
            const schemaEndpoints = apiEndpoints[schemaName] || {};
            const hasMutableEndpoint = schemaEndpoints.create || schemaEndpoints.update;

            if (!hasMutableEndpoint) {
                console.log(chalk.gray(`🚫 Skipping form for "${schemaName}" — no create/update endpoint.`));
                continue;
            }

            if (!schema.properties || Object.keys(schema.properties).length === 0) {
                console.log(`⚠️ No properties found for ${schemaName}. Skipping form generation.`);
                continue;
            }

            // Call createFormTemplate with schemaName and properties
            createFormTemplate('Form', moduleName, schemaName, modulePath, schema);
            console.log(chalk.green(`✅ Form for "${schemaName}" created successfully!`));
        }
    }


    console.log(chalk.green(`✅ Module "${moduleName}" generated successfully!`));
    return true;
}

function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}
