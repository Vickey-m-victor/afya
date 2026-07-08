const layout = "LayoutBackend";

export default [
  {
    path: "/pharmacy/inventory",
    name: "pharmacy/inventory",
    component: () => import("../views/inventory/MedicineCatalogView.vue"),
    meta: { title: "Afya365 - Medicine Catalog", layout },
  },
  {
    path: "/pharmacy/inventory/receive",
    name: "pharmacy/inventory/receive",
    component: () => import("../views/inventory/StockReceiveView.vue"),
    meta: { title: "Afya365 - Receive Stock (GRN)", layout },
  },
];
