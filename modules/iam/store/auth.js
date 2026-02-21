import { defineStore } from "pinia";
import api from "@/utils/api";
import authService from "@/services/authService";
import router from "@/router";
export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: JSON.parse(localStorage.getItem("user")) || null,
    // don't save is authenticated to ,local storage since a user can edit it, instead we will check if user is auth by checking if there is a user object in the state
    isAuthenticated: !!localStorage.getItem("user"),
    loading: false,
  }),
  //checks is a user has a spefic role 
  getters: {
    hasRole: (state) => (roleName) => {
      return state.user?.roles?.includes(roleName);
    },
  },

  actions: {
    //user and token stored in local storage 
    setUser(userData) {
      this.user = userData;
      this.isAuthenticated = true;
      localStorage.setItem("user", JSON.stringify(userData));
    },
    // removes user and token from local storage
    clearUser() {
      this.user = null;
      this.isAuthenticated = false;
      localStorage.removeItem("user");
      localStorage.removeItem("username");
    },
    //check if user is auth
    async checkAuth() {
      this.loading = true;
      try {
        const response = await api.get("/iam/auth/refresh");
        const userData = response.data.dataPayload?.data || response.data.user;
        this.setUser(userData);
        return true;
      } catch (error) {
        this.clearUser();
        return false;
      } finally {
        this.loading = false;
      }
    },
    // will send the login request to the backend and handle the response, including saving the token and user data to local storage, and updating the store's state accordingly.
    async login(credentials) {
      this.loading = true;
      try {
        const response = await authService.login(credentials);


        // --- 1. SAVE THE TOKEN (NEW CODE) ---
        const token = response.data?.dataPayload?.data?.access_token || 
        response.data?.access_token || 
        response.data?.token;

        if (token) {
          localStorage.setItem("token", token);
          localStorage.getItem('token',token); //
          // Configure axios default header immediately for subsequent requests in this session
          api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        } else {
          console.warn("No token found in login response! Check console logs.", response.data);
        }
       

        // 2. Extract User Data 
        let userData =
          response.data?.dataPayload?.data ||
          response.data?.user ||
          response.data;

        if (!userData) userData = {};

        // Inject username if missing
        if (!userData.username && credentials.username) {
          userData.username = credentials.username;
        }

        // 3. Set User State
        this.setUser(userData);
        return response.data;
      } catch (error) {
        throw error;
      } finally {
        this.loading = false;
      }
    },
// removes user data from local storage, redirect to login page
    async logout() {
      try {
        await authService.logout();
      } catch (error) {
        console.error("Logout API error", error);
      } finally {
        this.clearUser();
       //redirect to login page after logout
       router.push({ name: 'auth-signin3' });
      }
    },
  },
});
