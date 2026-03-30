const layout = 'LayoutBackend'
export default [
  {
    path: '/hr/employer-type/create',
    name: 'hr/employer-type/create',
    component: () => import('../views/EmployerType/create.vue'),
    meta: { title: 'Afya365 - Create Employer Type', layout: layout }
  },
  {
    path: '/hr/employer-type/view/:id',
    name: 'hr/employer-type/view',
    component: () => import('../views/EmployerType/view.vue'),
    props: true,
    meta: { title: 'Afya365 - View Employer Type', layout: layout }
  },
  {
    path: '/hr/employer-type/update/:id',
    name: 'hr/employer-type/update',
    component: () => import('../views/EmployerType/update.vue'),
    props: true,
    meta: { title: 'Afya365 - Update Employer Type', layout: layout }
  },
  {
    path: '/hr/employer-type',
    name: 'hr/employer-type',
    component: () => import('../views/EmployerType/index.vue'),
    meta: { title: 'Afya365 - Employer Type', layout: layout }
  }
];