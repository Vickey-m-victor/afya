const layout = 'LayoutBackend'
export default [
  {
    path: '/hr/residential-status/create',
    name: 'hr/residential-status/create',
    component: () => import('../views/ResidentialStatus/create.vue'),
    meta: { title: 'Afya365 - Create Residential Status', layout: layout }
  },
  {
    path: '/hr/residential-status/view/:id',
    name: 'hr/residential-status/view',
    component: () => import('../views/ResidentialStatus/view.vue'),
    props: true,
    meta: { title: 'Afya365 - View Residential Status', layout: layout }
  },
  {
    path: '/hr/residential-status/update/:id',
    name: 'hr/residential-status/update',
    component: () => import('../views/ResidentialStatus/update.vue'),
    props: true,
    meta: { title: 'Afya365 - Update Residential Status', layout: layout }
  },
  {
    path: '/hr/residential-status',
    name: 'hr/residential-status',
    component: () => import('../views/ResidentialStatus/index.vue'),
    meta: { title: 'Afya365 - Residential Status', layout: layout }
  }
];