const layout = 'LayoutBackend'
export default [
  {
    path: '/hr/payroll-setting/create',
    name: 'hr/payroll-setting/create',
    component: () => import('../views/PayrollSetting/create.vue'),
    meta: { title: 'Afya365 - Create Payroll Setting', layout: layout }
  },
  {
    path: '/hr/payroll-setting/view/:id',
    name: 'hr/payroll-setting/view',
    component: () => import('../views/PayrollSetting/view.vue'),
    props: true,
    meta: { title: 'Afya365 - View Payroll Setting', layout: layout }
  },
  {
    path: '/hr/payroll-setting/update/:id',
    name: 'hr/payroll-setting/update',
    component: () => import('../views/PayrollSetting/update.vue'),
    props: true,
    meta: { title: 'Afya365 - Update Payroll Setting', layout: layout }
  },
  {
    path: '/hr/payroll-setting',
    name: 'hr/payroll-setting',
    component: () => import('../views/PayrollSetting/index.vue'),
    meta: { title: 'Afya365 - Payroll Setting', layout: layout }
  }
];