const PublicHolidayView = () => import("~/hr/views/PublicHolidayView.vue");

export const publicHolidayRoutes = [
  {
    // Example: /iam/roles
    path: "/hr/public-holidays",
    name: "hr-public-holidays",
    component: PublicHolidayView,
  }
];