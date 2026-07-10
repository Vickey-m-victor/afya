const layout = "LayoutBackend";

export default [
  {
    path: "/laboratory/dashboard",
    name: "laboratory/dashboard",
    component: () => import("../views/dashboard/LabDashboardView.vue"),
    meta: { title: "Afya365 - Laboratory Dashboard", layout },
  },
  {
    path: "/laboratory/worklist",
    name: "laboratory/worklist",
    component: () => import("../views/worklist/LabWorklistView.vue"),
    meta: { title: "Afya365 - Laboratory Worklist Desk", layout },
  },
  {
    path: "/laboratory/worklist/:orderId",
    name: "laboratory/worklist/workspace",
    component: () => import("../views/worklist/LabTestWorkspace.vue"),
    meta: { title: "Afya365 - Laboratory Test Workspace", layout },
    props: true,
  },
  {
    path: "/laboratory/inventory",
    name: "laboratory/inventory",
    component: () => import("../views/inventory/ReagentCatalogView.vue"),
    meta: { title: "Afya365 - Reagent & Supply Catalog", layout },
  },
  {
    path: "/laboratory/inventory/receive",
    name: "laboratory/inventory/receive",
    component: () => import("../views/inventory/ReagentStockReceiveView.vue"),
    meta: { title: "Afya365 - Receive Reagents & Supplies", layout },
  },
];
