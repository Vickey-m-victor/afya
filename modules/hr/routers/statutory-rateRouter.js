const StatutoryRateView = () => import("~/hr/views/StatutoryRateView.vue");

export const statutoryRateRoutes = [
  {
    // Example: /iam/roles
    path: "/hr/statutory-rates",
    name: "hr-statutory-rates",
    component: StatutoryRateView,
  }
];