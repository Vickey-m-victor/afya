const layout = 'LayoutBackend'
export default [
  {
    path: '/hr/job-group/create',
    name: 'hr/job-group/create',
    component: () => import('../views/JobGroup/create.vue'),
    meta: { title: 'Afya365 - Create Job Group', layout: layout }
  },
  {
    path: '/hr/job-group/view/:id',
    name: 'hr/job-group/view',
    component: () => import('../views/JobGroup/view.vue'),
    props: true,
    meta: { title: 'Afya365 - View Job Group', layout: layout }
  },
  {
    path: '/hr/job-group/update/:id',
    name: 'hr/job-group/update',
    component: () => import('../views/JobGroup/update.vue'),
    props: true,
    meta: { title: 'Afya365 - Update Job Group', layout: layout }
  },
  {
    path: '/hr/job-group',
    name: 'hr/job-group',
    component: () => import('../views/JobGroup/index.vue'),
    meta: { title: 'Afya365 - Job Group', layout: layout }
  }
];