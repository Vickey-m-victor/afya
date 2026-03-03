import { useAuthStore } from "~/iam/stores/auth";

export function setupAuthGuard(router) {
  router.beforeEach((to, from, next) => {
    const authStore = useAuthStore(); 
    const isAuthenticated = authStore.isAuthenticated;

    const isAuthRoute = to.path.startsWith('/auth');
    const isErrorRoute = to.path.startsWith('/errors');
    const isSpecialRoute = to.path.startsWith('/specials');
    
    const isPublicRoute = isAuthRoute || isErrorRoute || isSpecialRoute;

    if (!isAuthenticated && !isPublicRoute) {
      return next({ name: 'auth-signin3' });
    } 
    
    // 💡 FIX: Allow users to visit the Lock Screen! 
    if (isAuthenticated && isAuthRoute && to.name !== 'auth-lock3') {
      return next({ name: 'dashboard' });
    } 
    
    next();
  });
}