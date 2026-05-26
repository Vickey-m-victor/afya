const layout = 'LayoutBackend'
export default [
  {
    path: '/hr/statutory-rate/create',
    name: 'hr/statutory-rate/create',
    component: () => import('../views/StatutoryRate/create.vue'),
    meta: { title: 'Afya365 - Create Statutory Rate', layout: layout }
  },
  {
    path: '/hr/statutory-rate/view/:id',
    name: 'hr/statutory-rate/view',
    component: () => import('../views/StatutoryRate/view.vue'),
    props: true,
    meta: { title: 'Afya365 - View Statutory Rate', layout: layout }
  },
  {
    path: '/hr/statutory-rate/update/:id',
    name: 'hr/statutory-rate/update',
    component: () => import('../views/StatutoryRate/update.vue'),
    props: true,
    meta: { title: 'Afya365 - Update Statutory Rate', layout: layout }
  },
  {
    path: '/hr/statutory-rate',
    name: 'hr/statutory-rate',
    component: () => import('../views/StatutoryRate/index.vue'),
    meta: { title: 'Afya365 - Statutory Rate', layout: layout }
  }
];