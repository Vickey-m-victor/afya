import axios from "axios";
import router from "@/router";

const api = axios.create({
  baseURL: "/v2",
  headers: { "Content-Type": "application/json" },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) config.headers["Authorization"] = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      const currentRoute = router.currentRoute.value?.name;
      
      // Prevent infinite loops on auth pages
      if (currentRoute !== "auth-signin3" && currentRoute !== "auth-lock3") {
        localStorage.removeItem("token");
        // Keep username intact for the lock screen!
        router.push({ name: "auth-lock3" }); 
      }
    }
    return Promise.reject(error);
  }
);

export default api;