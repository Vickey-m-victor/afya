const SettingsGeneralView = () => import("~/admin/views/SettingsGeneralView.vue");

export const settingsGeneralRoutes = [
  {
    // Example: /iam/roles
    path: "/admin/settings-generals",
    name: "admin-settings-generals",
    component: SettingsGeneralView,
  }
];