const layout = 'LayoutBackend';

export default [
  {
    path: '/tests/components',
    name: 'tests/components',
    component: () => import('../views/Tests/ComponentsTest.vue'),
    meta: { title: 'Afya365 - Component Tests', layout: layout }
  },
  
  {
    path: '/tests/global-modal',
    name: 'tests/global-modal',
    component: () => import('../../../src/views/GlobalModalDemo.vue'),
    meta: { title: 'Afya365 - Global Modal Test', layout: layout }
  }
];
