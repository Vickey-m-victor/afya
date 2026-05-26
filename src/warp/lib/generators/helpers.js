import fs from 'fs';
import path from 'path';
import formTemplate from '../templates/form.js';

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

export function createFormTemplate(name, module, route, savePath, schema) {
    try {
        if (!schema || !schema.properties) {
            console.log(`⚠️ No properties found for ${route}. Skipping form generation.`);
            return false;
        }

        const formComponent = formTemplate(name, schema);
        const routeViewName = toPascalCase(route);
        const formPath = path.join(savePath, 'views', routeViewName, 'form.vue');

        // Ensure directory exists
        fs.mkdirSync(path.dirname(formPath), { recursive: true });

        // Overwrite form.vue with the new template
        fs.writeFileSync(formPath, formComponent, 'utf-8');
        console.log(`✅ form.vue for "${route}" has been created/overwritten.`);

        return true;
    } catch (error) {
        console.error('❌ Error generating form:', error);
        return false;
    }
}



export function createLayout(){

}