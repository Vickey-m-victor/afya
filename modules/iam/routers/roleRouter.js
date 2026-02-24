const RoleView = () => import("~/iam/views/RoleView.vue");

export const roleRoutes = [
  {
    // Example: /iam/roles
    path: "/iam/roles",
    name: "iam-roles",
    component: RoleView,
  }
];