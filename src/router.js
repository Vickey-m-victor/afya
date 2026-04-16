import { createRouter, createWebHashHistory } from "vue-router";
import NProgress from "nprogress/nprogress.js";
import moduleRoutes from "./moduleRoutes.js";
import appConfig from "./config/app.js";
import { useAuthStore } from "./stores/auth.js";


// Set all routes
const routes = [
  {
    path: "/",
    redirect: "/admin/dashboard",
  },

  // Module-generated routes
  ...moduleRoutes,

  // Fallback 404
  {
    path: "/:pathMatch(.*)*",
    redirect: "/errors/404",
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
NProgress.configure({ showSpinner: false });

// Authentication Guard
router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();
  const safeRoutes = appConfig.safeRoutes || [];
  const routePath = to.path.replace(/^\//, ""); // Normalize path for comparison
  
  // Check if route requires authentication
  const requiresAuth = to.meta?.requiresAuth !== false && !safeRoutes.includes(routePath);
  
  // If route requires auth and user is not authenticated, redirect to signin
  if (requiresAuth && !authStore.isAuthenticated) {
    next("/iam/auth/signin");
    return;
  }
  
  // Check role-based access control (RBAC)
  if (to.meta?.requiresRoles && authStore.isAuthenticated) {
    const requiredRoles = Array.isArray(to.meta.requiresRoles) 
      ? to.meta.requiresRoles 
      : [to.meta.requiresRoles];
    
    const hasRequiredRole = requiredRoles.some(role => authStore.hasRole(role));
    
    if (!hasRequiredRole) {
      next("/errors/403");
      return;
    }
  }
  
  // If already authenticated, redirect away from signin
  if (to.path === "/iam/auth/signin" && authStore.isAuthenticated) {
    next("/admin/dashboard");
    return;
  }
  
  next();
});

router.beforeResolve((to, from, next) => {
  if (to.name) {
    NProgress.start();
  }
  next();
});

router.afterEach((to) => {
  NProgress.done();
  
  // Update document title
  if (to.meta?.title) {
    document.title = to.meta.title;
  }
});

export default router;

