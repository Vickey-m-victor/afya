import api from "@/utils/api";

const authService = {
  /**
   * Send login credentials to the backend
   * @param {Object} credentials { username, password }
   */

  login(credentials) {
    return api.post("/iam/auth/login", credentials, 
      // Include cookies in the request
    );
  },
  logout() {
    return api.post("/iam/auth/logout",{device:"current"});
  },

  refresh() {
    return api.post("/iam/auth/refresh");
  },
  changePassword(data) {
    return api.put("/iam/auth/change-password", data);
  },
  register(userData) {
    return api.post("/iam/auth/register", userData);
  },
  resetPassword(email) {
    return api.post("/iam/auth/reset-password", { email });
  },
  activateAccount() {
    return api.get("/iam/auth/activate");
  },
};

export default authService;
