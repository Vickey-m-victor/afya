export default [
  {
    path: '/doctor/dashboard',
    name: 'DoctorDashboard',
    component: () => import('@/themes/doccure/views/frontend/pages/doctors/dashboard/doctor-dashboard.vue'),
    meta: {
      layout: 'LayoutDoccure'
    }
  },
  {
    path: '/doctor/test-page',
    name: 'DoctorTestPage',
    component: () => import('@/themes/doccure/views/TestDoccurePage.vue'),
    meta: {
      layout: 'LayoutDoccure'
    }
  }
];
