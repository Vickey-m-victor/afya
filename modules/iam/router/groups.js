const layout = 'LayoutBackend';

export default [
  {
    path: '/iam/rbac/groups',
    name: 'iam/rbac/groups',
    component: () => import('../views/rbac/groups/IndexView.vue'),
    meta: { title: 'Afya365 - Groups Management', layout: layout }
  },
];
