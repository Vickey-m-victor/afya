const layout = "LayoutBackend";

export default [
  {
    path: "/pharmacy/dashboard",
    name: "pharmacy/dashboard",
    component: () => import("../views/dashboard/PharmacyDashboardView.vue"),
    meta: { title: "Afya365 - Pharmacy Dashboard", layout },
  },
  {
    path: "/pharmacy/dispensing",
    name: "pharmacy/dispensing",
    component: () => import("../views/dispensing/DispensingDeskView.vue"),
    meta: { title: "Afya365 - Pharmacy Dispensing Desk", layout },
  },
  {
    path: "/pharmacy/dispensing/:prescriptionId",
    name: "pharmacy/dispensing/workspace",
    component: () => import("../views/dispensing/DispenseFormPanel.vue"),
    meta: { title: "Afya365 - Dispense Prescription", layout },
    props: true,
  },
];
