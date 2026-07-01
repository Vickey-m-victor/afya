const layout = 'LayoutDoctor';

export default [
  {
    path: '/doctor/dashboard',
    name: 'doctor-dashboard',
    component: () => import('../views/DashboardView.vue'),
    meta: { title: 'Doctor Dashboard', layout: layout, requiresAuth: false }
  },
  {
    path: '/doctor/appointments',
    name: 'doctor-appointments',
    component: () => import('../views/AppointmentsView.vue'),
    meta: { title: 'Doctor Appointments', layout: layout, requiresAuth: false }
  },
  {
    path: '/doctor/appointment-start',
    name: 'doctor-appointment-start',
    component: () => import('../views/DoctorAppointmentStartView.vue'),
    meta: { title: 'Doctor Start Appointment', layout: layout, requiresAuth: false }
  }
];
