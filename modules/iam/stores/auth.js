import { defineStore } from "pinia";
import api from "@/utils/api";
import authService from "~/iam/services/authService";
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
      localStorage.removeItem("token");
    },
    //check if user is auth
    async checkAuth() {
      const token = localStorage.getItem("token");
      if (!token) {
        this.clearUser();
        return false;
      }
      
      // Optional: You can call a "/me" endpoint here if you want fresh user data on reload
      this.isAuthenticated = true;
      return true;
    },
    // will send the login request to the backend and handle the response, including saving the token and user data to local storage, and updating the store's state accordingly.
    async login(credentials) {
      this.loading = true;
      try {
        const response = await authService.login(credentials);

        // Extract Token safely
        const token = response.data?.dataPayload?.data?.access_token;

        if (token) {
          // 💡 FIX 5: Removed the broken getItem typo you had here
          localStorage.setItem("token", token);
        }

        // Extract User Data safely
        let userData = response.data?.dataPayload?.data || {};
        if (!userData.username && credentials.username) {
          userData.username = credentials.username;
        }

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
        router.push({ name: "auth-signin3" });
      }
    },
  },
});
