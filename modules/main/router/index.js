import errorsRoutes from './errors.js';
import receptionRoutes from './reception.js';
import specialsRoutes from './specials.js';
import testsRoutes from './tests.js';

export default [
  ...errorsRoutes,
  ...receptionRoutes,
  ...specialsRoutes,
  ...testsRoutes
];
