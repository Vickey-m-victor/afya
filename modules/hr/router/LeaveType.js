const layout = 'LayoutBackend'
export default [
  {
    path: '/hr/leave-type/create',
    name: 'hr/leave-type/create',
    component: () => import('../views/LeaveType/create.vue'),
    meta: { title: 'Afya365 - Create Leave Type', layout: layout }
  },
  {
    path: '/hr/leave-type/view/:id',
    name: 'hr/leave-type/view',
    component: () => import('../views/LeaveType/view.vue'),
    props: true,
    meta: { title: 'Afya365 - View Leave Type', layout: layout }
  },
  {
    path: '/hr/leave-type/update/:id',
    name: 'hr/leave-type/update',
    component: () => import('../views/LeaveType/update.vue'),
    props: true,
    meta: { title: 'Afya365 - Update Leave Type', layout: layout }
  },
  {
    path: '/hr/leave-type',
    name: 'hr/leave-type',
    component: () => import('../views/LeaveType/index.vue'),
    meta: { title: 'Afya365 - Leave Type', layout: layout }
  }
];