import { defineStore } from "pinia";
import { encrypt, decrypt, decodeJWT } from "~/omnicore/helpers/crypto";
import axiosInstance from "~/omnicore/helpers/axiosInstance";
import authService from "~/omnicore/services/authService";
import router from "~/omnicore/router";
import { useAlert } from "~/omnicore/composables/alerts";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: {
      isAuthenticated: false,
      username: null,
      token: null,
      ipAddr: null,
      menus: {},
      permissions: [],
    },
    config: {
      refresh: {
        enabled: true,
        enabledInBackground: true,
        bufferTime: 2 * 60 * 1000,
      },
      fetchData: {
        enabled: false,
        cache: true,
        enabledInBackground: true,
        endpoint: "/iam/auth/me",
      },
      autoLogout: {
        enabled: true,
        checkInterval: 60 * 1000,
      },
      rolesKey: "permissions",
      loginEndpoint: "/iam/auth/login",
      registerEndpoint: "/iam/auth/register",
      logoutEndpoint: "/iam/auth/logout",
      userEndpoint: "/iam/auth/me",
      refreshEndpoint: "/iam/auth/refresh",
    },
    refreshTimeout: null,
    autoLogoutTimer: null,
    loading: false,
  }),
  getters: {
    isAuthenticated: (state) => state.user.isAuthenticated,
    hasRole: (state) => (roleName) => {
      return state.user?.permissions?.includes(roleName);
    },
  },

  actions: {
    initStore(customConfig = {}) {
      this.config = { ...this.config, ...customConfig };

      const encryptedToken = localStorage.getItem("user.token");
      const storedUsername = localStorage.getItem("user.username");

      if (encryptedToken && storedUsername) {
        try {
          const token = decrypt(encryptedToken);
          this.setToken(token, storedUsername);
          console.log("Store initialized with decrypted token");
        } catch (e) {
          console.warn("Failed to decrypt token:", e);
          this.removeToken();
        }
      } else {
        console.log("No stored token or username found");
      }

      if (this.config.fetchData.cache) {
        this.loadCachedUserData();
      }

      if (this.config.refresh.enabled) {
        this.setupTokenRefresh();
      }

      if (this.config.autoLogout.enabled) {
        this.setupAutoLogout();
      }

      if (this.config.fetchData.enabled && !this.hasUserData()) {
        this.fetchUser({ background: this.config.fetchData.enabledInBackground });
      }
    },

    setToken(token, username) {
      const encryptedToken = encrypt(token);
      this.user.token = token;
      this.user.username = username;
      this.user.isAuthenticated = true;

      localStorage.setItem("user.token", encryptedToken);
      localStorage.setItem("user.username", username);
      localStorage.setItem("loggedIn", true);

      if (this.config.refresh.enabled) {
        this.setupTokenRefresh();
      }
    },

    setUserData(userData) {
      if (userData) {
        const { menus = {}, permissions = [] } = userData;
        this.user.menus = menus;
        this.user.permissions = permissions;

        if (this.config.fetchData.cache) {
          const encryptedMenus = encrypt(JSON.stringify(menus));
          const encryptedPermissions = encrypt(JSON.stringify(permissions));
          localStorage.setItem("user.menus", encryptedMenus);
          localStorage.setItem("user.permissions", encryptedPermissions);
        }
      } else {
        console.warn("User data is missing or invalid.");
      }
    },

    loadCachedUserData() {
      const encryptedMenus = localStorage.getItem("user.menus");
      const encryptedPermissions = localStorage.getItem("user.permissions");

      if (encryptedMenus) {
        try {
          this.user.menus = JSON.parse(decrypt(encryptedMenus));
        } catch (error) {
          console.error("Failed to decrypt menus:", error);
        }
      }

      if (encryptedPermissions) {
        try {
          this.user.permissions = JSON.parse(decrypt(encryptedPermissions));
        } catch (error) {
          console.error("Failed to decrypt permissions:", error);
        }
      }
    },

    getMenus() {
      const encryptedMenus = localStorage.getItem("user.menus");
      if (!encryptedMenus) return {};

      try {
        return JSON.parse(decrypt(encryptedMenus));
      } catch (error) {
        console.error("Failed to decrypt menus:", error);
        return {};
      }
    },

    getPermissions() {
      const encryptedPermissions = localStorage.getItem("user.permissions");
      if (!encryptedPermissions) return [];

      try {
        return JSON.parse(decrypt(encryptedPermissions));
      } catch (error) {
        console.error("Failed to decrypt permissions:", error);
        return [];
      }
    },

    removeToken() {
      this.user.token = null;
      this.user.username = null;
      this.user.isAuthenticated = false;
      this.user.menus = {};
      this.user.permissions = [];

      localStorage.removeItem("user.token");
      localStorage.removeItem("user.username");
      localStorage.removeItem("loggedIn");
      localStorage.removeItem("user.menus");
      localStorage.removeItem("user.permissions");

      if (this.refreshTimeout) clearTimeout(this.refreshTimeout);
      if (this.autoLogoutTimer) clearInterval(this.autoLogoutTimer);
    },

    setIp(ipAddr) {
      this.user.ipAddr = ipAddr;
      sessionStorage.setItem("ipA", ipAddr);
    },

    logOutRequest() {
      this.removeToken();
      localStorage.removeItem("user.menus");
      localStorage.removeItem("user.permissions");
    },

    async logOut(options = {}) {
      const { redirect = { name: "iam/auth/signin" }, callApi = true } = options;
      const { toastSuccess, toastError } = useAlert();

      if (callApi) {
        try {
          const response = await authService.logout();
          const successMessage =
            response?.data?.dataPayload?.alertify?.message ||
            response?.data?.alertifyPayload?.message ||
            response?.data?.message ||
            "Logged out successfully.";
          toastSuccess("Success", successMessage);
          console.log("Logout API call successful");
        } catch (e) {
          const errorMessage =
            e?.response?.data?.errorPayload?.message ||
            e?.response?.data?.alertifyPayload?.message ||
            e?.response?.data?.message ||
            e?.message ||
            "Logout failed.";
          toastError("Logout failed", errorMessage);
          console.error("Logout API failed:", e);
        }
      }

      this.removeToken();

      if (redirect) {
        router.push(redirect);
      }
    },

    setupTokenRefresh() {
      if (this.refreshTimeout) clearTimeout(this.refreshTimeout);

      if (!this.user.token) return;

      const decoded = decodeJWT(this.user.token);
      if (!decoded || !decoded.exp) return;

      const expiryTime = decoded.exp * 1000;
      const remainingTime = expiryTime - Date.now();
      if (remainingTime <= 0) return;

      const configuredBuffer = this.config.refresh.bufferTime;
      const minimumBuffer = 5000;
      const dynamicBuffer = Math.floor(remainingTime * 0.2);
      const effectiveBuffer = Math.max(
        minimumBuffer,
        Math.min(configuredBuffer, dynamicBuffer)
      );

      let refreshTime = remainingTime - effectiveBuffer;

      if (refreshTime < 1000) {
        refreshTime = Math.max(1000, Math.floor(remainingTime * 0.7));
      }

      this.refreshTimeout = setTimeout(async () => {
        try {
          const newToken = await this.refreshToken();
          if (newToken) {
            this.setToken(newToken, this.user.username);
            if (this.config.refresh.enabledInBackground) {
              console.log("Token refreshed in background");
            }
          }
        } catch (e) {
          console.error("Token refresh failed:", e);
          if (this.config.autoLogout.enabled) {
            await this.logOut();
          }
        }
      }, refreshTime);
    },

    async refreshToken() {
      try {
        const response = await axiosInstance.post(
          this.config.refreshEndpoint,
          null,
          { withCredentials: true }
        );
        return (
          response.data?.dataPayload?.data?.access_token ||
          response.data?.dataPayload?.token ||
          response.data?.token ||
          response.data?.access_token
        );
      } catch (err) {
        throw err;
      }
    },

    setupAutoLogout() {
      if (this.autoLogoutTimer) clearInterval(this.autoLogoutTimer);

      this.autoLogoutTimer = setInterval(() => {
        if (!this.user.token) return;

        const decoded = decodeJWT(this.user.token);
        if (!decoded || !decoded.exp) return;

        if (Date.now() >= decoded.exp * 1000) {
          this.logOutRequest();
          console.log("Auto-logout due to token expiry");
        }
      }, this.config.autoLogout.checkInterval);
    },

    async fetchUser(options = {}) {
      const { background = false, force = false } = options;

      if (!force && this.hasUserData()) return;

      try {
        const response = await axiosInstance.get(this.config.userEndpoint);
        this.setUserData(response.data?.dataPayload || response.data);
        if (background) {
          console.log("User data fetched in background");
        }
      } catch (e) {
        console.error("Failed to fetch user data:", e);
        if (this.config.autoLogout.enabled) {
          await this.logOutRequest();
        }
      }
    },

    hasUserData() {
      return (
        Object.keys(this.user?.menus ?? {}).length > 0 ||
        (this.user?.permissions?.length ?? 0) > 0
      );
    },

    // Legacy login method for backward compatibility - wraps authService
    async login(credentials) {
      this.loading = true;
      try {
        const response = await authService.login(credentials);

        const token =
          response.data?.dataPayload?.data?.access_token ||
          response.data?.token ||
          response.data?.dataPayload?.token ||
          response.data?.access_token;

        if (token) {
          const username = credentials.username || credentials.email || "User";
          this.setToken(token, username);
        } else {
          console.warn("No token found in login response!");
        }

        // Extract and set user data if available
        let userData =
          response.data?.dataPayload?.data ||
          response.data?.user ||
          response.data;

        if (userData && (userData.menus || userData.permissions)) {
          this.setUserData(userData);
        }

        // Auto-fetch user data if enabled and not already set
        if (this.config.fetchData.enabled && !this.hasUserData()) {
          try {
            await this.fetchUser({ background: false });
          } catch (e) {
            console.warn("Failed to auto-fetch user data after login:", e);
          }
        }

        return response.data;
      } catch (error) {
        throw error;
      } finally {
        this.loading = false;
      }
    },

    async logout() {
      await this.logOut({ callApi: true });
    },
  },
});
