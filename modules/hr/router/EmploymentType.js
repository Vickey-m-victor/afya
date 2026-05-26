const layout = 'LayoutBackend'
export default [
  {
    path: '/hr/employment-type/create',
    name: 'hr/employment-type/create',
    component: () => import('../views/EmploymentType/create.vue'),
    meta: { title: 'Afya365 - Create Employment Type', layout: layout }
  },
  {
    path: '/hr/employment-type/view/:id',
    name: 'hr/employment-type/view',
    component: () => import('../views/EmploymentType/view.vue'),
    props: true,
    meta: { title: 'Afya365 - View Employment Type', layout: layout }
  },
  {
    path: '/hr/employment-type/update/:id',
    name: 'hr/employment-type/update',
    component: () => import('../views/EmploymentType/update.vue'),
    props: true,
    meta: { title: 'Afya365 - Update Employment Type', layout: layout }
  },
  {
    path: '/hr/employment-type',
    name: 'hr/employment-type',
    component: () => import('../views/EmploymentType/index.vue'),
    meta: { title: 'Afya365 - Employment Type', layout: layout }
  }
];