const layout = 'LayoutBackend'
export default [
  {
    path: '/hr/worker-union/create',
    name: 'hr/worker-union/create',
    component: () => import('../views/WorkerUnion/create.vue'),
    meta: { title: 'Afya365 - Create Worker Union', layout: layout }
  },
  {
    path: '/hr/worker-union/view/:id',
    name: 'hr/worker-union/view',
    component: () => import('../views/WorkerUnion/view.vue'),
    props: true,
    meta: { title: 'Afya365 - View Worker Union', layout: layout }
  },
  {
    path: '/hr/worker-union/update/:id',
    name: 'hr/worker-union/update',
    component: () => import('../views/WorkerUnion/update.vue'),
    props: true,
    meta: { title: 'Afya365 - Update Worker Union', layout: layout }
  },
  {
    path: '/hr/worker-union',
    name: 'hr/worker-union',
    component: () => import('../views/WorkerUnion/index.vue'),
    meta: { title: 'Afya365 - Worker Union', layout: layout }
  }
];