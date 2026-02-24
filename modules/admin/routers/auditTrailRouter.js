const AuditTrailView = () => import("~/admin/views/AuditTrailView.vue");

export const auditTrailRoutes = [
  {
    // Example: /iam/roles
    path: "/admin/audit-trails",
    name: "admin-audit-trails",
    component: AuditTrailView,
  }
];