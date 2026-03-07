const JobTitleView = () => import("~/hr/views/JobTitleView.vue");

export const jobTitleRoutes = [
  {
    // Example: /iam/roles
    path: "/hr/job-titles",
    name: "hr-job-titles",
    component: JobTitleView,
  }
];