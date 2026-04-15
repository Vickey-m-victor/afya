const layout = 'LayoutSimple';

export default [
  {
    path: '/iam/auth/signin',
    name: 'iam/auth/signin',
    component: () => import('../views/auth/SignIn3View.vue'),
    meta: { title: 'Afya365 - Sign In', layout: layout, requiresAuth: false }
  },
  {
    path: '/iam/auth/signup',
    name: 'iam/auth/signup',
    component: () => import('../views/auth/SignUp3View.vue'),
    meta: { title: 'Afya365 - Sign Up', layout: layout, requiresAuth: false }
  },
  {
    path: '/iam/auth/lock',
    name: 'iam/auth/lock',
    component: () => import('../views/auth/Lock3View.vue'),
    meta: { title: 'Afya365 - Lock Screen', layout: layout, requiresAuth: false }
  },
  {
    path: '/iam/auth/reminder',
    name: 'iam/auth/reminder',
    component: () => import('../views/auth/Reminder3View.vue'),
    meta: { title: 'Afya365 - Password Reminder', layout: layout, requiresAuth: false }
  },
  {
    path: '/iam/auth/two-factor',
    name: 'iam/auth/two-factor',
    component: () => import('../views/auth/TwoFactor3View.vue'),
    meta: { title: 'Afya365 - Two Factor', layout: layout, requiresAuth: false }
  },
];
