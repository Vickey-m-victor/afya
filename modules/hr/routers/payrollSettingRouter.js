const PayrollSettingView = () => import("~/hr/views/PayrollSettingView.vue");

export const payrollSettingRoutes = [
  {
    // Example: /iam/roles
    path: "/hr/payroll-settings",
    name: "hr-payroll-settings",
    component: PayrollSettingView,
  }
];