const layout = 'LayoutBackend';

export default [
    {
      path: '/admin/test/tests',
      name: 'admin/test/tests',
      component: () => import('../views/tests/Tests.vue'),
      meta: { title: 'Afya365 - Tests', layout: layout }
    },
];