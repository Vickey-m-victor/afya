const layout = 'LayoutBackend'
export default [
  {
    path: '/hr/work-shift/create',
    name: 'hr/work-shift/create',
    component: () => import('../views/WorkShift/create.vue'),
    meta: { title: 'Afya365 - Create Work Shift', layout: layout }
  },
  {
    path: '/hr/work-shift/view/:id',
    name: 'hr/work-shift/view',
    component: () => import('../views/WorkShift/view.vue'),
    props: true,
    meta: { title: 'Afya365 - View Work Shift', layout: layout }
  },
  {
    path: '/hr/work-shift/update/:id',
    name: 'hr/work-shift/update',
    component: () => import('../views/WorkShift/update.vue'),
    props: true,
    meta: { title: 'Afya365 - Update Work Shift', layout: layout }
  },
  {
    path: '/hr/work-shift',
    name: 'hr/work-shift',
    component: () => import('../views/WorkShift/index.vue'),
    meta: { title: 'Afya365 - Work Shift', layout: layout }
  }
];