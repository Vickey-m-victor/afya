const layout = 'LayoutSimple';

export default [
  {
    path: '/specials/coming-soon',
    name: 'specials/coming-soon',
    component: () => import('../views/specials/ComingSoonView.vue'),
    meta: { title: 'Afya365 - Coming Soon', layout: layout }
  },
  {
    path: '/specials/installation',
    name: 'specials/installation',
    component: () => import('../views/specials/InstallationView.vue'),
    meta: { title: 'Afya365 - Installation', layout: layout }
  },
  {
    path: '/specials/maintenance',
    name: 'specials/maintenance',
    component: () => import('../views/specials/MaintenanceView.vue'),
    meta: { title: 'Afya365 - Maintenance', layout: layout }
  },
  {
    path: '/specials/status',
    name: 'specials/status',
    component: () => import('../views/specials/StatusView.vue'),
    meta: { title: 'Afya365 - Status', layout: layout }
  },
];
