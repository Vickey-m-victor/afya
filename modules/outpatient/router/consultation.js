const layout = "LayoutBackendBoxed";

export default [
  {
    path: "/outpatient/consultation/queue",
    name: "outpatient/consultation/queue",
    component: () => import("../views/consultation/DoctorQueueView.vue"),
    meta: { title: "Afya365 - Doctor Queue", layout },
  },
];

