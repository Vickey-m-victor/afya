const AccessLogView = () => import("~/admin/views/AccessLogView.vue");

export const accessLogRoutes = [
  {
    // Example: /iam/roles
    path: "/admin/access-logs",
    name: "admin-access-logs",
    component: AccessLogView,
  }
];