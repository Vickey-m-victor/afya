const DepartmentView = () => import("~/hr/views/DepartmentView.vue");

export const departmentRoutes = [
  {
    // Example: /iam/roles
    path: "/hr/departments",
    name: "hr-departments",
    component: DepartmentView,
  }
];