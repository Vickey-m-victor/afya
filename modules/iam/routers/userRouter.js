const UserView = () => import("~/iam/views/UserView.vue");

export const userRoutes = [
  {
    // Example: /iam/roles
    path: "/iam/users",
    name: "iam-users",
    component: UserView,
  }
];