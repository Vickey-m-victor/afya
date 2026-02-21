const layout = 'LayoutBackend';

export default [
  {
    path: '/iam/rbac/rules',
    name: 'iam/rbac/rules',
    component: () => import('../views/rbac/rules/IndexView.vue'),
    meta: { title: 'Afya365 - Business Rules Management', layout: layout }
  },
];
