const layout = 'LayoutBackend';

export default [
  {
    path: '/main/reception',
    name: 'main/reception',
    component: () => import('../views/ReceptionView.vue'),
    meta: { title: 'Afya365 - Patient Reception', layout: layout }
  }
];
