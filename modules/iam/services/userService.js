import axiosInstance from "~/omnicore/helpers/axiosInstance";

const userService = {
  /**
   * Get all users with pagination and search
   * @param {Object} params - Query parameters (page, per-page, _search)
   */
  getUsers(params = {}) {
    const queryString = new URLSearchParams(params).toString();
    return axiosInstance.get(`/iam/users${queryString ? `?${queryString}` : ""}`);
  },

  /**
   * Get a single user by ID/username
   * @param {string|number} id - User ID or username
   */
  getUser(id) {
    return axiosInstance.get(`/iam/user/${id}`);
  },

  /**
   * Create a new user
   * @param {Object} userData - User data
   */
  createUser(userData) {
    return axiosInstance.post("/iam/user/create", userData);
  },

  /**
   * Update an existing user
   * @param {string|number} id - User ID or username
   * @param {Object} userData - Updated user data
   */
  updateUser(id, userData) {
    return axiosInstance.patch(`/iam/user/${id}`, userData);
  },

  /**
   * Delete a user
   * @param {string|number} id - User ID or username
   */
  deleteUser(id) {
    return axiosInstance.delete(`/iam/user/${id}`);
  },

  /**
   * Restore a deleted user
   * @param {string|number} id - User ID
   */
  restoreUser(id) {
    return axiosInstance.patch(`/iam/user/${id}`);
  },

  /**
   * Assign user to group
   * @param {string} username - Username
   * @param {string|number} groupId - Group ID
   */
  assignUserToGroup(username, groupId) {
    return axiosInstance.post(`/iam/user/assign/${username}/${groupId}`);
  },

  /**
   * Remove user from group
   * @param {string} username - Username
   * @param {string|number} groupId - Group ID
   */
  removeUserFromGroup(username, groupId) {
    return axiosInstance.post(`/iam/user/remove/${username}/${groupId}`);
  },

  /**
   * Toggle user status
   * @param {string} username - Username
   */
  toggleUserStatus(username) {
    return axiosInstance.patch(`/iam/user/status/${username}`);
  },

  /**
   * Ban user
   * @param {string} username - Username
   */
  banUser(username) {
    return axiosInstance.post(`/iam/user/ban/${username}`);
  },
};

export default userService;
