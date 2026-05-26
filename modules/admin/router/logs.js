const layout = 'LayoutBackend';

export default [
  {
    path: '/admin/logs/access',
    name: 'admin/logs/access',
    component: () => import('../views/log/AccessLogsView.vue'),
    meta: { title: 'Afya365 - Access Logs', layout: layout }
  },
  {
    path: '/admin/logs/audit',
    name: 'admin/logs/audit',
    component: () => import('../views/log/AuditTrailView.vue'),
    meta: { title: 'Afya365 - Audit Trail', layout: layout }
  },
  {
    path: '/admin/logs/errors',
    name: 'admin/logs/errors',
    component: () => import('../views/log/ErrorLogsView.vue'),
    meta: { title: 'Afya365 - Error Logs', layout: layout }
  },
];
