const PermissionView = () => import("~/iam/views/PermissionView.vue");

export const permissionRoutes = [
  {
    // Example: /iam/roles
    path: "/iam/permissions",
    name: "iam-permissions",
    component: PermissionView,
  }
];