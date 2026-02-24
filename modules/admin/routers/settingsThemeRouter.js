const SettingsThemeView = () => import("~/admin/views/SettingsThemeView.vue");

export const settingsThemeRoutes = [
  {
    // Example: /iam/roles
    path: "/admin/settings-themes",
    name: "admin-settings-themes",
    component: SettingsThemeView,
  }
];