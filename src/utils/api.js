import axios from "axios";
import router from "@/router";

const api = axios.create({
  baseURL: "/v2", // This will be proxied to the backend in development
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

// Add a request interceptor to include the token in the headers
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token)
      config.headers["Authorization"] = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error)
);

// Add a response interceptor to handle errors globally
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      console.error("Unauthorized access - redirecting to login");
      
        // Clear token and user data on 401
        // localStorage.removeItem("token");
        // localStorage.removeItem("user");
        // localStorage.removeItem("username");

        // if (router.currentRoute.value.name !== "auth-signin3") {
        //   router.push({ name: "auth-signin3" });
        // }
      
    }
    return Promise.reject(error);
  }
);

export default api;
