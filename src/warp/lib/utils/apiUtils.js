import dotenv from 'dotenv';

dotenv.config({ path: './afya365.cfg' });

export const fetchSwaggerJson = async (moduleName, routeName = '', isModule = false) => {
    try {
        const baseUrl = process.env.API_BASE_URL || 'http://localhost:8082/';
        const endpoint = new URL('/v2/docs/openapi-resource.json', baseUrl);
        endpoint.searchParams.set('mod', moduleName);

        const url = endpoint.toString();
        console.log(`Fetching Swagger JSON from: ${url}`);
        const response = await fetch(url)

        if (!response.ok) {
            throw new Error(`Failed to fetch Swagger JSON: HTTP ${response.status} ${response.statusText}`);
        }

        const data = await response.json()

        if (isModule) {
            return data
        }

        if (!data.components || !data.components.schemas) {
            throw new Error(`Module '${moduleName}' not found in Swagger JSON.`)
        }

        routeName = routeName.charAt(0).toUpperCase() + routeName.slice(1);
        const schema = data.components.schemas[routeName]

        if (!schema) {
            throw new Error(`Route '${routeName}' not found in module '${moduleName}'.`)
        }

        console.log('Swagger JSON Schema:', schema)
        return schema

    } catch (error) {
        console.error('Error:', error.message)
        return { error: error.message }
    }
}
