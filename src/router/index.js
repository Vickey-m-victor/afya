import { createRouter, createWebHashHistory } from "vue-router";

import NProgress from "nprogress/nprogress.js";
import LayoutSimple from "@/layouts/variations/Simple.vue";
import LayoutBackend from "@/layouts/variations/Backend.vue";

// Backend: Dashboard
const BackendDashboard = () => import("@/views/backend/DashboardView.vue");
import { authRoutes } from "~/iam/router.js";
import {groupRoutes } from "~/iam/routers/groupRouter.js";
import { permissionRoutes } from "~/iam/routers/permissionRouter.js";
import { roleRoutes } from "~/iam/routers/roleRouter.js";
import { ruleRoutes } from "~/iam/routers/ruleRouter";
import { userRoutes } from "~/iam/routers/userRouter.js";
import { accessLogRoutes } from "~/admin/routers/accessLogRouter";
import { auditTrailRoutes } from "~/admin/routers/auditTrailRouter";
import { errorLogRoutes } from "~/admin/routers/errorLogRouter";
import { settingsGeneralRoutes } from "~/admin/routers/settingsGeneralRouter";
import { settingsMailerRoutes } from "~/admin/routers/settingsMailerRouter";
import { settingsSecurityRoutes } from "~/admin/routers/settingsSecurityRouter";
import { settingsThemeRoutes } from "~/admin/routers/settingsThemeRouter";
import { taskManagerRoutes } from "~/admin/routers/taskManagerRouter";


import TestComponents from "@/views/Tests/TestView.vue";
// Specials
const SpecialsMaintenance = () =>
  import("@/views/specials/MaintenanceView.vue");
const SpecialsStatus = () => import("@/views/specials/StatusView.vue");
const SpecialsInstallation = () =>
  import("@/views/specials/InstallationView.vue");
const SpecialsComingSoon = () => import("@/views/specials/ComingSoonView.vue");

// Errors
const Error400 = () => import("@/views/errors/400View.vue");
const Error401 = () => import("@/views/errors/401View.vue");
const Error403 = () => import("@/views/errors/403View.vue");
const Error404 = () => import("@/views/errors/404View.vue");
const Error500 = () => import("@/views/errors/500View.vue");
const Error503 = () => import("@/views/errors/503View.vue");

//Tests
import TestView from "@/views/Tests/ComponentsTest.vue";

const routes = [
  {
    path: "/",
    // redirect: "/backend/dashboard",
    component: LayoutBackend,
    children: [
      {
        path: "dashboard",
        name: "dashboard",
        component: BackendDashboard,
      },
      {
        path: "tests",
        name: "tests",
        component: TestView,
      },
      {
        path: "components",
        name: "components",
        component: TestComponents,
      },

      ...groupRoutes,
      ...permissionRoutes,
      ...roleRoutes,
      ...ruleRoutes,
      ...userRoutes,
      ...accessLogRoutes,
      ...auditTrailRoutes,
      ...errorLogRoutes,
      ...settingsGeneralRoutes,
      ...settingsMailerRoutes,
      ...settingsSecurityRoutes,
      ...settingsThemeRoutes,
      ...taskManagerRoutes,
      // other pages can be added here
    ],
  },

  ...authRoutes,
  {
    path: "/specials",
    component: LayoutSimple,
    children: [
      {
        path: "maintenance",
        name: "specials-maintenance",
        component: SpecialsMaintenance,
      },
      {
        path: "status",
        name: "specials-status",
        component: SpecialsStatus,
      },
      {
        path: "installation",
        name: "specials-installation",
        component: SpecialsInstallation,
      },

      {
        path: "coming-soon",
        name: "specials-coming-soon",
        component: SpecialsComingSoon,
      },
    ],
  },

  {
    path: "/errors",
    component: LayoutSimple,
    children: [
      {
        path: "400",
        name: "error-400",
        component: Error400,
      },
      {
        path: "401",
        name: "error-401",
        component: Error401,
      },
      {
        path: "403",
        name: "error-403",
        component: Error403,
      },
      {
        path: "404",
        name: "error-404",
        component: Error404,
      },
      {
        path: "500",
        name: "error-500",
        component: Error500,
      },
      {
        path: "503",
        name: "error-503",
        component: Error503,
      },
    ],
  },
];

// Create Router
const router = createRouter({
  history: createWebHashHistory(),
  linkActiveClass: "active",
  linkExactActiveClass: "",
  scrollBehavior() {
    return { left: 0, top: 0 };
  },
  routes,
});

// NProgress
/*eslint-disable no-unused-vars*/
NProgress.configure({ showSpinner: false });

router.beforeResolve((to, from, next) => {
  if (to.name) {
    NProgress.start();
  }

  next();
});

router.afterEach(() => {
  NProgress.done();
});
/*eslint-enable no-unused-vars*/

export default router;
