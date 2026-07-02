const layout = "LayoutBackendBoxed";

export default [
  {
    path: "/billing",
    name: "billing/dashboard",
    component: () => import("../views/BillingDashboardView.vue"),
    meta: { title: "Afya365 - Billing Dashboard", layout },
  },
  {
    path: "/billing/queue",
    name: "billing/queue",
    component: () => import("../views/BillingQueueView.vue"),
    meta: { title: "Afya365 - Billing Queue", layout },
  },
  {
    path: "/billing/invoice/:encounterId",
    name: "billing/invoice",
    component: () => import("../views/InvoiceView.vue"),
    meta: { title: "Afya365 - Invoice", layout },
    props: true,
  },
  {
    path: "/billing/receipt/:invoiceId",
    name: "billing/receipt",
    component: () => import("../views/ReceiptView.vue"),
    meta: { title: "Afya365 - Receipt", layout },
    props: true,
  },
];
