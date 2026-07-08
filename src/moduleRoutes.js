import adminRoutes from '~/admin/router/index.js';
import hrRoutes from '~/hr/router/index.js';
import iamRoutes from '~/iam/router/index.js';
import mainRoutes from '~/main/router/index.js';
import outpatientRoutes from '~/outpatient/router/index.js';
import doctorRoutes from '~/doctor/router/index.js';
import billingRoutes from '~/billing/router/index.js';
import pharmacyRoutes from '~/pharmacy/router/index.js';

export default [
  ...adminRoutes,
  ...hrRoutes, 
  ...iamRoutes,
  ...mainRoutes,
  ...outpatientRoutes,
  ...doctorRoutes,
  ...billingRoutes,
  ...pharmacyRoutes,
];