import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';

//Load .env only if it exists
if (fs.existsSync('afya365.cfg')) {
    dotenv.config({ path: 'afya365.cfg' });
} else {
    console.warn('⚠️ Warning: config file not found! Using default settings.');
}

const __dirname = path.dirname(new URL(import.meta.url).pathname);

export const config = {
    API_BASE_URL: process.env.API_BASE_URL,
    CLI_NAME: process.env.CLI_NAME || 'Warp CLI',
    VERSION: process.env.VERSION || '1.0.0',
    LOG_LEVEL: process.env.LOG_LEVEL || 'info',
    ENABLE_INQUIRY: process.env.ENABLE_INQUIRY?.trim().toLowerCase() === 'true',
    MODULES_PATH: path.resolve(__dirname, '../../../../modules'),  // Default modules directory
    MODULE_ROUTES_PATH: path.resolve(__dirname, '../../../moduleRoutes.js'),
    FEATURE_FLAGS: {
        ENABLE_SWAGGER: process.env.ENABLE_SWAGGER === 'true',
        DEBUG_MODE: process.env.DEBUG_MODE === 'true',
    }
};

