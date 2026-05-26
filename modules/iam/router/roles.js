const layout = 'LayoutBackend';

export default [
  {
    path: '/iam/rbac/roles',
    name: 'iam/rbac/roles',
    component: () => import('../views/rbac/roles/IndexView.vue'),
    meta: { title: 'Afya365 - Roles Management', layout: layout }
  },
];
