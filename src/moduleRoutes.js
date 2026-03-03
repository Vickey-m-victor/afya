import adminRoutes from '~/admin/router/index.js';
import hrRoutes from '~/hr/router/index.js';
import iamRoutes from '~/iam/router/index.js';
import mainRoutes from '~/main/router/index.js';

export default [
  ...adminRoutes,
  ...hrRoutes,
  ...iamRoutes,
  ...mainRoutes
];