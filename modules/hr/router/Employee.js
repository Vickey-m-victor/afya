const layout = 'LayoutBackend'
export default [
  {
    path: '/hr/employee/onboard/:id?',
    name: 'hr/employee/onboard',
    component: () => import('../views/Employee/OnboardingView.vue'),
    props: true,
    meta: { title: 'Afya365 - Onboard Employee', layout: layout }
  },
  {
    path: '/hr/employee/create',
    name: 'hr/employee/create',
    component: () => import('../views/Employee/create.vue'),
    meta: { title: 'Afya365 - Create Employee', layout: layout }
  },
  {
    path: '/hr/employee/view/:id',
    name: 'hr/employee/view',
    component: () => import('../views/Employee/view.vue'),
    props: true,
    meta: { title: 'Afya365 - View Employee', layout: layout }
  },
  {
    path: '/hr/employee',
    name: 'hr/employee',
    component: () => import('../views/Employee/index.vue'),
    meta: { title: 'Afya365 - Employee', layout: layout }
  }
];