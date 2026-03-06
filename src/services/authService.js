import axiosInstance from "@/helpers/axiosInstance";

const authService = {
  /**
   * Send login credentials to the backend
   * @param {Object} credentials { username, password }
   */
  login(credentials) {
    return axiosInstance.post("/iam/auth/login", credentials, {
      withCredentials: true,
    });
  },

  logout() {
    return axiosInstance.post("/iam/auth/logout", { device: "web" }, {
      withCredentials: true,
    });
  },

  refresh() {
    return axiosInstance.post("/iam/auth/refresh", null, {
      withCredentials: true,
    });
  },

  changePassword(data) {
    return axiosInstance.put("/iam/auth/change-password", data, {
      withCredentials: true,
    });
  },

  register(userData) {
    return axiosInstance.post("/iam/auth/register", userData, {
      withCredentials: true,
    });
  },

  requestPasswordReset(username) {
    return axiosInstance.post("/iam/auth/request-password-reset", { username }, {
      withCredentials: true,
    });
  },

  resetPassword({ token, password, confirmPassword }) {
    return axiosInstance.put(`/iam/auth/reset-password?token=${encodeURIComponent(token)}`, {
      password,
      confirmPassword,
    }, {
      withCredentials: true,
    });
  },

  // Fetch user data
  fetchUser() {
    return axiosInstance.get("/iam/auth/me", {
      withCredentials: true,
    });
  },
};

export default authService;
