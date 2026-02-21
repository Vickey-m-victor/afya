const layout = 'LayoutBackend';

export default [
  {
    path: '/iam/users',
    name: 'iam/users',
    component: () => import('../views/users/IndexView.vue'),
    meta: { title: 'Afya365 - Users Management', layout: layout }
  },
  {
    path: '/iam/users/roles',
    name: 'iam/users/roles',
    component: () => import('../views/users/RolesView.vue'),
    meta: { title: 'Afya365 - User Roles', layout: layout }
  },
  {
    path: '/iam/users/permissions',
    name: 'iam/users/permissions',
    component: () => import('../views/users/PermissionsView.vue'),
    meta: { title: 'Afya365 - User Permissions', layout: layout }
  },
];
