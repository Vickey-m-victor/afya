const ErrorLogView = () => import("~/admin/views/ErrorLogView.vue");

export const errorLogRoutes = [
  {
    // Example: /iam/roles
    path: "/admin/error-logs",
    name: "admin-error-logs",
    component: ErrorLogView,
  }
];