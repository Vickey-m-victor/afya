import backendRoutes from './backend.js';
import settingsRoutes from './settings.js';
import logsRoutes from './logs.js';
import testRoutes from './test.js';

export default [
  ...backendRoutes,
  ...settingsRoutes,
  ...logsRoutes,
  ...testRoutes 
];
