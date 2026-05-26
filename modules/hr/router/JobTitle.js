const layout = 'LayoutBackend'
export default [
  {
    path: '/hr/job-title/create',
    name: 'hr/job-title/create',
    component: () => import('../views/JobTitle/create.vue'),
    meta: { title: 'Afya365 - Create Job Title', layout: layout }
  },
  {
    path: '/hr/job-title/view/:id',
    name: 'hr/job-title/view',
    component: () => import('../views/JobTitle/view.vue'),
    props: true,
    meta: { title: 'Afya365 - View Job Title', layout: layout }
  },
  {
    path: '/hr/job-title/update/:id',
    name: 'hr/job-title/update',
    component: () => import('../views/JobTitle/update.vue'),
    props: true,
    meta: { title: 'Afya365 - Update Job Title', layout: layout }
  },
  {
    path: '/hr/job-title',
    name: 'hr/job-title',
    component: () => import('../views/JobTitle/index.vue'),
    meta: { title: 'Afya365 - Job Title', layout: layout }
  }
];