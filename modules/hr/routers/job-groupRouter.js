const JobGroupView = () => import("~/hr/views/JobGroupView.vue");

export const jobGroupRoutes = [
  {
    // Example: /iam/roles
    path: "/hr/job-groups",
    name: "hr-job-groups",
    component: JobGroupView,
  }
];