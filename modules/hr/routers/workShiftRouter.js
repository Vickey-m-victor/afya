const WorkShiftView = () => import("~/hr/views/WorkShiftView.vue");

export const workShiftRoutes = [
  {
    // Example: /iam/roles
    path: "/hr/work-shifts",
    name: "hr-work-shifts",
    component: WorkShiftView,
  }
];