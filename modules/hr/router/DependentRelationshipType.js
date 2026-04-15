const layout = 'LayoutBackend'
export default [
  {
    path: '/hr/dependent-relationship-type/create',
    name: 'hr/dependent-relationship-type/create',
    component: () => import('../views/DependentRelationshipType/create.vue'),
    meta: { title: 'Afya365 - Create Dependent Relationship Type', layout: layout }
  },
  {
    path: '/hr/dependent-relationship-type/view/:id',
    name: 'hr/dependent-relationship-type/view',
    component: () => import('../views/DependentRelationshipType/view.vue'),
    props: true,
    meta: { title: 'Afya365 - View Dependent Relationship Type', layout: layout }
  },
  {
    path: '/hr/dependent-relationship-type/update/:id',
    name: 'hr/dependent-relationship-type/update',
    component: () => import('../views/DependentRelationshipType/update.vue'),
    props: true,
    meta: { title: 'Afya365 - Update Dependent Relationship Type', layout: layout }
  },
  {
    path: '/hr/dependent-relationship-type',
    name: 'hr/dependent-relationship-type',
    component: () => import('../views/DependentRelationshipType/index.vue'),
    meta: { title: 'Afya365 - Dependent Relationship Type', layout: layout }
  }
];