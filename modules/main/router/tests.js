const layout = 'LayoutBackend';

export default [
  {
    path: '/tests/components',
    name: 'tests/components',
    component: () => import('../views/Tests/ComponentsTest.vue'),
    meta: { title: 'Afya365 - Component Tests', layout: layout }
  },
];
