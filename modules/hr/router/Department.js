const layout = 'LayoutBackend'
export default [
  {
    path: '/hr/department/create',
    name: 'hr/department/create',
    component: () => import('../views/Department/create.vue'),
    meta: { title: 'Afya365 - Create Department', layout: layout }
  },
  {
    path: '/hr/department/view/:id',
    name: 'hr/department/view',
    component: () => import('../views/Department/view.vue'),
    props: true,
    meta: { title: 'Afya365 - View Department', layout: layout }
  },
  {
    path: '/hr/department/update/:id',
    name: 'hr/department/update',
    component: () => import('../views/Department/update.vue'),
    props: true,
    meta: { title: 'Afya365 - Update Department', layout: layout }
  },
  {
    path: '/hr/department',
    name: 'hr/department',
    component: () => import('../views/Department/index.vue'),
    meta: { title: 'Afya365 - Department', layout: layout }
  }
];