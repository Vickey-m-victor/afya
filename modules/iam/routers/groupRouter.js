const GroupView = () => import("~/iam/views/GroupView.vue");

export const groupRoutes = [
  {
    // Example: /iam/roles
    path: "/iam/groups",
    name: "iam-groups",
    component: GroupView,
  }
];