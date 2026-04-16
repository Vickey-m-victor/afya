const layout = 'LayoutSimple';

export default [
  {
    path: '/errors/400',
    name: 'errors/400',
    component: () => import('../views/errors/400View.vue'),
    meta: { title: 'Afya365 - 400 Bad Request', layout: layout, requiresAuth: false }
  },
  {
    path: '/errors/401',
    name: 'errors/401',
    component: () => import('../views/errors/401View.vue'),
    meta: { title: 'Afya365 - 401 Unauthorized', layout: layout, requiresAuth: false }
  },
  {
    path: '/errors/403',
    name: 'errors/403',
    component: () => import('../views/errors/403View.vue'),
    meta: { title: 'Afya365 - 403 Forbidden', layout: layout, requiresAuth: false }
  },
  {
    path: '/errors/404',
    name: 'errors/404',
    component: () => import('../views/errors/404View.vue'),
    meta: { title: 'Afya365 - 404 Not Found', layout: layout, requiresAuth: false }
  },
  {
    path: '/errors/500',
    name: 'errors/500',
    component: () => import('../views/errors/500View.vue'),
    meta: { title: 'Afya365 - 500 Server Error', layout: layout, requiresAuth: false }
  },
  {
    path: '/errors/503',
    name: 'errors/503',
    component: () => import('../views/errors/503View.vue'),
    meta: { title: 'Afya365 - 503 Service Unavailable', layout: layout, requiresAuth: false }
  },
];
