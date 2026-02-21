const layout = 'LayoutBackend';

export default [
  {
    path: '/admin/dashboard',
    name: 'dashboard',
    component: () => import('../views/backend/DashboardView.vue'),
    meta: { title: 'Afya365 - Dashboard', layout: layout }
  },
];
