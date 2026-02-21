// src/router/guard.js
import { useAuthStore } from "@/stores/auth";

export function setupAuthGuard(router) {
  router.beforeEach((to, from, next) => {
    const authStore = useAuthStore(); 
    const isAuthenticated = authStore.isAuthenticated;

    // Fix: Use exact route names as defined in src/router/index.js
    const isAuthRoute = to.path.startsWith('/auth');
    const isErrorRoute = to.path.startsWith('/errors');
    const isSpecialRoute = to.path.startsWith('/specials');
    
    const isPublicRoute = isAuthRoute || isErrorRoute || isSpecialRoute;

    if (!isAuthenticated && !isPublicRoute) {
      // Redirect to Sign In if not authenticated
      return next({ name: 'auth-signin3' });
    } 
    
    if (isAuthenticated && isAuthRoute) {
      // Redirect to Dashboard if already authenticated
      return next({ name: 'dashboard' });
    } 
    
    // Crucial: Always call next() for normal navigation
    next();
  });
}