const FacilitieView = () => import("~/admin/views/FacilitieView.vue");

export const facilitieRoutes = [
  {
    // Example: /iam/roles
    path: "/admin/facilities",
    name: "admin-facilities",
    component: FacilitieView,
  }
];