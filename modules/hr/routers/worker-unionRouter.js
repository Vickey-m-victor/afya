const WorkerUnionView = () => import("~/hr/views/WorkerUnionView.vue");

export const workerUnionRoutes = [
  {
    // Example: /iam/roles
    path: "/hr/worker-unions",
    name: "hr-worker-unions",
    component: WorkerUnionView,
  }
];