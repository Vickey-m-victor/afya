const LeaveTypeView = () => import("~/hr/views/LeaveTypeView.vue");

export const leaveTypeRoutes = [
  {
    // Example: /iam/roles
    path: "/hr/leave-types",
    name: "hr-leave-types",
    component: LeaveTypeView,
  }
];