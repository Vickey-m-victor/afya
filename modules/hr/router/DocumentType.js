const layout = 'LayoutBackend'
export default [
  {
    path: '/hr/document-type/create',
    name: 'hr/document-type/create',
    component: () => import('../views/DocumentType/create.vue'),
    meta: { title: 'Afya365 - Create Document Type', layout: layout }
  },
  {
    path: '/hr/document-type/view/:id',
    name: 'hr/document-type/view',
    component: () => import('../views/DocumentType/view.vue'),
    props: true,
    meta: { title: 'Afya365 - View Document Type', layout: layout }
  },
  {
    path: '/hr/document-type/update/:id',
    name: 'hr/document-type/update',
    component: () => import('../views/DocumentType/update.vue'),
    props: true,
    meta: { title: 'Afya365 - Update Document Type', layout: layout }
  },
  {
    path: '/hr/document-type',
    name: 'hr/document-type',
    component: () => import('../views/DocumentType/index.vue'),
    meta: { title: 'Afya365 - Document Type', layout: layout }
  }
];