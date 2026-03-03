import axios from "axios";
import router from "@/router";

const api = axios.create({
  baseURL: "/v2", // Proxied to backend
  headers: {
    "Content-Type": "application/json",
  },
});

// 1. Attach token to every outgoing request
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) config.headers["Authorization"] = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error)
);

// Variables to handle the refresh queue
let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach(prom => {
    if (error) prom.reject(error);
    else prom.resolve(token);
  });
  failedQueue = [];
};

// 2. Intercept 401s and Auto-Refresh
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // If 401 Unauthorized and we haven't retried yet
    if (error.response && error.response.status === 401 && !originalRequest._retry) {
      
      // Skip interceptor for login/refresh to avoid infinite loops
      if (originalRequest.url.includes('/auth/login') || originalRequest.url.includes('/auth/refresh')) {
        return Promise.reject(error);
      }

      if (isRefreshing) {
        // If already refreshing, wait in line (queue)
        return new Promise(function(resolve, reject) {
          failedQueue.push({ resolve, reject });
        }).then(token => {
          originalRequest.headers['Authorization'] = 'Bearer ' + token;
          return api(originalRequest);
        }).catch(err => Promise.reject(err));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        // 💡 FETCH NEW TOKEN
        const refreshResponse = await axios.post("/v2/iam/auth/refresh", {}, {
          headers: { "Authorization": `Bearer ${localStorage.getItem("token")}` }
        });

        const newToken = refreshResponse.data?.dataPayload?.data?.access_token;
        
        if (newToken) {
          // Save new token and retry the failed request
          localStorage.setItem("token", newToken);
          api.defaults.headers.common['Authorization'] = `Bearer ${newToken}`;
          originalRequest.headers['Authorization'] = `Bearer ${newToken}`;
          
          processQueue(null, newToken); 
          return api(originalRequest);  
        }
      } catch (refreshError) {
        processQueue(refreshError, null);
        
        // Refresh failed (Session fully dead). Log out!
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        localStorage.removeItem("username");
        if (router.currentRoute.value.name !== "auth-signin3") {
          router.push({ name: "auth-signin3" });
        }
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export default api;