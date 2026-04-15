import authRoutes from './auth.js';
import usersRoutes from './users.js';
import rolesRoutes from './roles.js';
import permissionsRoutes from './permissions.js';
import groupsRoutes from './groups.js';
import rulesRoutes from './rules.js';

export default [
  ...authRoutes,
  ...usersRoutes,
  ...rolesRoutes,
  ...permissionsRoutes,
  ...groupsRoutes,
  ...rulesRoutes
];
