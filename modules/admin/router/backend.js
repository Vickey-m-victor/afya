const layout = 'LayoutBackend';

export default [
  {
    path: '/admin/dashboard',
    name: 'dashboard',
    component: () => import('../views/backend/DashboardView.vue'),
    meta: { title: 'Afya365 - Dashboard', layout: layout }
  },
  {
    path: '/admin/task-manager',
    name: 'admin/task-manager',
    component: () => import('../views/task/TaskManagerView.vue'),
    meta: { title: 'Afya365 - Task Manager', layout: layout }
  },
  {
    path: '/admin/profile',
    name: 'admin/profile',
    component: () => import('../views/profile/ProfileView.vue'),
    meta: { title: 'Afya365 - Profile', layout: layout }
  },
];
