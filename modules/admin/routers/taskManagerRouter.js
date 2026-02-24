const TaskManagerView = () => import("~/admin/views/TaskManagerView.vue");

export const taskManagerRoutes = [
  {
    // Example: /iam/roles
    path: "/admin/task-managers",
    name: "admin-task-managers",
    component: TaskManagerView,
  }
];