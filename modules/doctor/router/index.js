const layout = 'LayoutDoctor';

export default [
  {
    path: '/doctor/dashboard',
    name: 'doctor-dashboard',
    component: () => import('../views/DashboardView.vue'),
    meta: { title: 'Doctor Dashboard', layout: layout }
  }
];
