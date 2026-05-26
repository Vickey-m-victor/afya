const layout = "LayoutBackendBoxed";

export default [
  {
    path: "/outpatient/registration",
    name: "outpatient/registration",
    component: () => import("../views/registration/RegistrationDeskView.vue"),
    meta: { title: "Afya365 - OPD Registration", layout },
  },
  {
    path: "/outpatient/registration/patient/:patientId",
    name: "outpatient/registration/patient",
    component: () => import("../views/registration/PatientProfileView.vue"),
    meta: { title: "Afya365 - Patient Profile", layout },
    props: true,
  },
];

