const RuleView = () => import("~/iam/views/RuleView.vue");

export const ruleRoutes = [
  {
    // Example: /iam/roles
    path: "/iam/rules",
    name: "iam-rules",
    component: RuleView,
  }
];