const layout = 'LayoutDoctor';

export default [
  {
    path: '/doctor/dashboard',
    name: 'doctor-dashboard',
    component: () => import('../views/DashboardView.vue'),
    meta: { title: 'Doctor Dashboard', layout: layout }
  },
  {
    path: '/doctor/appointments',
    name: 'doctor-appointments',
    component: () => import('../views/AppointmentsView.vue'),
    meta: { title: 'Doctor Appointments', layout: layout }
  }
];
