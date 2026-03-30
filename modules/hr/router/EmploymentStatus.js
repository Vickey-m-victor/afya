const layout = 'LayoutBackend'
export default [
  {
    path: '/hr/employment-status/create',
    name: 'hr/employment-status/create',
    component: () => import('../views/EmploymentStatus/create.vue'),
    meta: { title: 'Afya365 - Create Employment Status', layout: layout }
  },
  {
    path: '/hr/employment-status/view/:id',
    name: 'hr/employment-status/view',
    component: () => import('../views/EmploymentStatus/view.vue'),
    props: true,
    meta: { title: 'Afya365 - View Employment Status', layout: layout }
  },
  {
    path: '/hr/employment-status/update/:id',
    name: 'hr/employment-status/update',
    component: () => import('../views/EmploymentStatus/update.vue'),
    props: true,
    meta: { title: 'Afya365 - Update Employment Status', layout: layout }
  },
  {
    path: '/hr/employment-status',
    name: 'hr/employment-status',
    component: () => import('../views/EmploymentStatus/index.vue'),
    meta: { title: 'Afya365 - Employment Status', layout: layout }
  }
];