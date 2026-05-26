const layout = "LayoutBackendBoxed";

export default [
  {
    path: "/outpatient/triage/queue",
    name: "outpatient/triage/queue",
    component: () => import("../views/triage/TriageQueueView.vue"),
    meta: { title: "Afya365 - OPD Triage Queue", layout },
  },
];
