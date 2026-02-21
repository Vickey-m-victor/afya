import axiosInstance from "~/omnicore/helpers/axiosInstance";

const roleService = {
  /**
   * Get all roles with pagination and search
   * @param {Object} params - Query parameters (page, per-page, _search)
   */
  getRoles(params = {}) {
    const queryString = new URLSearchParams(params).toString();
    return axiosInstance.get(`/iam/rbac/roles${queryString ? `?${queryString}` : ""}`);
  },

  /**
   * Get a single role by name
   * @param {string} name - Role name
   */
  getRole(name) {
    return axiosInstance.get(`/iam/rbac/role/${name}`);
  },

  /**
   * Create a new role
   * @param {Object} roleData - Role data
   */
  createRole(roleData) {
    return axiosInstance.post("/iam/rbac/role", roleData);
  },

  /**
   * Update an existing role
   * @param {string} name - Role name
   * @param {Object} roleData - Updated role data
   */
  updateRole(name, roleData) {
    return axiosInstance.put(`/iam/rbac/role/${name}`, roleData);
  },

  /**
   * Delete a role
   * @param {string} name - Role name
   */
  deleteRole(name) {
    return axiosInstance.delete(`/iam/rbac/role/${name}`);
  },

  /**
   * Get permissions assigned to a role
   * @param {string} name - Role name
   */
  getRolePermissions(name) {
    return axiosInstance.get(`/iam/rbac/role/${name}/permissions`);
  },

  /**
   * Assign permission to role
   * @param {string} name - Role name
   * @param {Object} data - Permission assignment data
   */
  assignPermission(name, data) {
    return axiosInstance.post(`/iam/rbac/role/${name}/assign`, data);
  },

  /**
   * Remove permission from role
   * @param {string} name - Role name
   * @param {Object} data - Permission removal data
   */
  removePermission(name, data) {
    return axiosInstance.post(`/iam/rbac/role/${name}/remove`, data);
  },
};

export default roleService;
