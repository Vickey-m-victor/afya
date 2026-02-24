const SettingsMailerView = () => import("~/admin/views/SettingsMailerView.vue");

export const settingsMailerRoutes = [
  {
    // Example: /iam/roles
    path: "/admin/settings-mailers",
    name: "admin-settings-mailers",
    component: SettingsMailerView,
  }
];