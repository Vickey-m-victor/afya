const SettingsSecurityView = () => import("~/admin/views/SettingsSecurityView.vue");

export const settingsSecurityRoutes = [
  {
    // Example: /iam/roles
    path: "/admin/settings-securitys",
    name: "admin-settings-securitys",
    component: SettingsSecurityView,
  }
];