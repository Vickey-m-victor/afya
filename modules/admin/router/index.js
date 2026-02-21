import backendRoutes from './backend.js';
import settingsRoutes from './settings.js';
import logsRoutes from './logs.js';

export default [
  ...backendRoutes,
  ...settingsRoutes,
  ...logsRoutes
];
