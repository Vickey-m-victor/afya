import axiosInstance from "@/helpers/axiosInstance";

const groupService = {
  /**
   * Get all groups with pagination and search
   * @param {Object} params - Query parameters (page, per-page, _search)
   */
  getGroups(params = {}) {
    const queryString = new URLSearchParams(params).toString();
    return axiosInstance.get(`/iam/rbac/groups${queryString ? `?${queryString}` : ""}`);
  },

  /**
   * Get a single group by name
   * @param {string} name - Group name
   */
  getGroup(name) {
    return axiosInstance.get(`/iam/rbac/group/${name}`);
  },

  /**
   * Create a new group
   * @param {Object} groupData - Group data
   */
  createGroup(groupData) {
    return axiosInstance.post("/iam/rbac/group", groupData);
  },

  /**
   * Update an existing group
   * @param {string} name - Group name
   * @param {Object} groupData - Updated group data
   */
  updateGroup(name, groupData) {
    return axiosInstance.put(`/iam/rbac/group/${name}`, groupData);
  },

  /**
   * Delete a group
   * @param {string} name - Group name
   */
  deleteGroup(name) {
    return axiosInstance.delete(`/iam/rbac/group/${name}`);
  },

  /**
   * Get users in a group
   * @param {string} name - Group name
   */
  getGroupUsers(name) {
    return axiosInstance.get(`/iam/rbac/group/${name}/users`);
  },

  /**
   * Assign user to group
   * @param {string} name - Group name
   * @param {Object} data - User assignment data
   */
  assignUser(name, data) {
    return axiosInstance.post(`/iam/rbac/group/${name}/assign`, data);
  },

  /**
   * Remove user from group
   * @param {string} name - Group name
   * @param {Object} data - User removal data
   */
  removeUser(name, data) {
    return axiosInstance.post(`/iam/rbac/group/${name}/remove`, data);
  },
};

export default groupService;
