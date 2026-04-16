const layout = 'LayoutBackend';

export default [
  {
    path: '/hr',
    name: 'hr',
    component: () => import('../../main/views/DashboardView.vue'),
    meta: { title: 'Afya365 - HR Dashboard', layout: layout }
  }
];
