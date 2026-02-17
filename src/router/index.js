import { createRouter, createWebHashHistory } from "vue-router";

import NProgress from "nprogress/nprogress.js";

// Main layout variations
import LayoutSimple from "@/layouts/variations/Simple.vue";
// import LayoutLanding from "@/layouts/variations/Landing.vue";
import LayoutBackend from "@/layouts/variations/Backend.vue";

// Backend: Dashboard
const BackendDashboard = () => import("@/views/backend/DashboardView.vue");

// Specials
const SpecialsMaintenance = () =>
  import("@/views/specials/MaintenanceView.vue");
const SpecialsStatus = () => import("@/views/specials/StatusView.vue");
const SpecialsInstallation = () =>
  import("@/views/specials/InstallationView.vue");
const SpecialsComingSoon = () => import("@/views/specials/ComingSoonView.vue");

// Auth

const AuthSignIn3 = () => import("@/views/auth/SignIn3View.vue");

const AuthSignUp3 = () => import("@/views/auth/SignUp3View.vue");

const AuthLock3 = () => import("@/views/auth/Lock3View.vue");

const AuthReminder3 = () => import("@/views/auth/Reminder3View.vue");

const AuthTwoFactor3 = () => import("@/views/auth/TwoFactor3View.vue");

// Errors
const Error400 = () => import("@/views/errors/400View.vue");
const Error401 = () => import("@/views/errors/401View.vue");
const Error403 = () => import("@/views/errors/403View.vue");
const Error404 = () => import("@/views/errors/404View.vue");
const Error500 = () => import("@/views/errors/500View.vue");
const Error503 = () => import("@/views/errors/503View.vue");


//Tests
import TestView from "@/views/Tests/ComponentsTest.vue"

// Set all routes
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
      }

      // other pages can be added here
    ],
  },

  
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
    path: "/auth",
    component: LayoutSimple,
    children: [
      {
        path: "signin3",
        name: "auth-signin3",
        component: AuthSignIn3,
      },

      {
        path: "signup3",
        name: "auth-signup3",
        component: AuthSignUp3,
      },

      {
        path: "lock3",
        name: "auth-lock3",
        component: AuthLock3,
      },

      {
        path: "reminder3",
        name: "auth-reminder3",
        component: AuthReminder3,
      },

      {
        path: "two-factor3",
        name: "auth-two-factor3",
        component: AuthTwoFactor3,
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
