const layout = 'LayoutBackend';

export default [
  {
    path: '/iam/rbac/permissions',
    name: 'iam/rbac/permissions',
    component: () => import('../views/rbac/permissions/IndexView.vue'),
    meta: { title: 'Afya365 - Permissions Management', layout: layout }
  },
];
