const layout = 'LayoutBackend'
export default [
  {
    path: '/hr/public-holiday/create',
    name: 'hr/public-holiday/create',
    component: () => import('../views/PublicHoliday/create.vue'),
    meta: { title: 'Afya365 - Create Public Holiday', layout: layout }
  },
  {
    path: '/hr/public-holiday/view/:id',
    name: 'hr/public-holiday/view',
    component: () => import('../views/PublicHoliday/view.vue'),
    props: true,
    meta: { title: 'Afya365 - View Public Holiday', layout: layout }
  },
  {
    path: '/hr/public-holiday/update/:id',
    name: 'hr/public-holiday/update',
    component: () => import('../views/PublicHoliday/update.vue'),
    props: true,
    meta: { title: 'Afya365 - Update Public Holiday', layout: layout }
  },
  {
    path: '/hr/public-holiday',
    name: 'hr/public-holiday',
    component: () => import('../views/PublicHoliday/index.vue'),
    meta: { title: 'Afya365 - Public Holiday', layout: layout }
  }
];