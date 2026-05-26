const layout = 'LayoutBackend'
export default [
  {
    path: '/hr/education-level/create',
    name: 'hr/education-level/create',
    component: () => import('../views/EducationLevel/create.vue'),
    meta: { title: 'Afya365 - Create Education Level', layout: layout }
  },
  {
    path: '/hr/education-level/view/:id',
    name: 'hr/education-level/view',
    component: () => import('../views/EducationLevel/view.vue'),
    props: true,
    meta: { title: 'Afya365 - View Education Level', layout: layout }
  },
  {
    path: '/hr/education-level/update/:id',
    name: 'hr/education-level/update',
    component: () => import('../views/EducationLevel/update.vue'),
    props: true,
    meta: { title: 'Afya365 - Update Education Level', layout: layout }
  },
  {
    path: '/hr/education-level',
    name: 'hr/education-level',
    component: () => import('../views/EducationLevel/index.vue'),
    meta: { title: 'Afya365 - Education Level', layout: layout }
  }
];